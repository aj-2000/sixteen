import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import {
  addNewMessage,
  incNewMessages,
  removePaticipant,
  setParticipants,
  setSocketId,
  setUsers,
} from "../app/features/appSlice";
import io from "socket.io-client";
import MessagesBox from "./MessagesBox";
import MeetControlBar from "./MeetControlBar";
import ComposeMessageBox from "./ComposeMessageBox";
import { useParams } from "react-router-dom";
import { peerConnectionConfig, server_url } from "../data/consts";
import moment from "moment";
import ParticipantDetails from "./ParticipantDetails";
import MeetingDetails from "./MeetingDetails";

let socket = null;
let socketId = null;
let connections = {};
const MeetingScreen = () => {
  // app variable to read app object from redux store
  const app = useSelector((state) => state.app);
  // getting url or path or meeting id or room id from URL
  const { url } = useParams();
  // used to insert local video stream to local video box
  const localVideoRef = useRef();
  const [isVideoOn, setIsVideoOn] = useStateWithCallbackLazy(
    app.isVideoAvailable
  );
  const [isAudioOn, setIsAudioOn] = useStateWithCallbackLazy(
    app.isVideoAvailable
  );
  const [isScreenOn, setIsScreenOn] = useStateWithCallbackLazy(false);
  // redux dispatcher for executing functions that modify redux states
  const dispatch = useDispatch();
  //adding event listeners with callback
  const connectToSocketServer = () => {
    try {
      socket = io.connect(server_url, { secure: true });
      // adding signal event listener
      socket.on("signal", gotMessageFromServer);

      socket.on("connect", () => {
        // sends userInformation to server then server sends the new user info to all other participants
        socket.emit("join-call", { path: url, userName: app.userName });
        // setting socketId to global variable
        socketId = socket.id;
        // setting socketId to redux variable
        dispatch(setSocketId(socket.id));
        // adding chat-message event listener
        socket.on("chat-message", addMessage);
        // adding user-left event listener
        socket.on("user-left", (id) => {
          let videobox = document.getElementById(id);
          let main = document.getElementById("main");
          // remove left user video box from DIV element with id "main" element
          main.removeChild(videobox);
          // delete participant from participants arary
          dispatch(removePaticipant(id));
        });
        socket.on("user-joined", (id, clients, users) => {
          // setting socketID to userName map (users object)
          dispatch(setUsers(users));
          // setting array of socketID of participants
          dispatch(setParticipants(clients));
          if (app.users && app.users[id]) showToast(`${app.users[id]} joined`);
          clients.forEach((socketListId) => {
            connections[socketListId] = new RTCPeerConnection(
              peerConnectionConfig
            );
            //create new webRTC connection whenever a new user joins the call
            connections[socketListId].onicecandidate = (event) => {
              if (event.candidate !== null) {
                socket.emit(
                  "signal",
                  socketListId,
                  JSON.stringify({ ice: event.candidate })
                );
              }
            };
            // create video box to show video stream of new participant of call
            connections[socketListId].onaddstream = (event) => {
              var searchVideo = document.querySelector(
                `[data-socket="${socketListId}"]`
              );

              if (searchVideo !== null) {
                // if video box already exists just insert the stream
                searchVideo.srcObject = event.stream;
              } else {
                //creating video box and stream to it
                let main = document.getElementById("main");
                let video = document.createElement("video");
                let div = document.createElement("div");
                div.id = socketListId;
                div.classList.add("videobox");
                let p = document.createElement("p");
                p.innerHTML = users[socketListId];
                p.classList.add("username");
                div.appendChild(p);
                div.appendChild(video);
                video.setAttribute("data-socket", socketListId);
                video.srcObject = event.stream;
                video.autoplay = true;
                video.playsinline = true;
                main.appendChild(div);
              }
            };

            // Add the local video stream
            if (
              window.localStream !== undefined &&
              window.localStream !== null
            ) {
              //if stream is not null send the stream
              connections[socketListId].addStream(window.localStream);
            } else {
              //if stream is null create a new blank stream and send it
              let blackSilence = (...args) =>
                new MediaStream([this.black(...args), this.silence()]);
              window.localStream = blackSilence();
            }
          });
          if (id === socketId) {
            for (let id2 in connections) {
              if (id2 === socketId) continue;

              try {
                connections[id2].addStream(window.localStream);
              } catch (e) {}
              // creating webRTC connection
              connections[id2].createOffer().then((description) => {
                connections[id2]
                  .setLocalDescription(description)
                  .then(() => {
                    socket.emit(
                      "signal",
                      id2,
                      JSON.stringify({ sdp: connections[id2].localDescription })
                    );
                  })
                  .catch((e) => console.log(e));
              });
            }
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  };
  const handleEndCall = () => {
    try {
      // turn off local video
      let tracks = this.localVideoref.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }
    // move to home screen
    window.location.href = "/";
  };
  useEffect(() => {
    // get User Media (webcam video and microphone)
    getMedia(isVideoOn, isAudioOn);
    // connect to server and initialize the socket object
    connectToSocketServer();
  }, []);
  const getMedia = (isVideoOn, isAudioOn) => {
    // atleast video or audio should be true to ask browser for streams
    if (isAudioOn || isVideoOn) {
      navigator.mediaDevices
        .getUserMedia({
          video: isVideoOn,
          audio: isAudioOn,
        })
        .then(getUserMediaSuccess)
        .catch((e) => console.log(e));
    }
  };
  // this function called on "signal" event to exchange webRTC offers information
  const gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);
    if (fromId !== app.socketId) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  };
  // this function called on "chat-message" event and add new messages to messages array and increase newMessages counter
  const addMessage = (data, sender, socketIdSender) => {
    dispatch(addNewMessage({ sender, data, socketIdSender, date: moment() }));
    if (socketIdSender !== socketId) {
      dispatch(incNewMessages());
    }
  };

  // this function sends to all client using webRTC, whatever stream is available.
  const getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);
      // creating offer for webRTC connection
      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          this.setState(
            {
              video: false,
              audio: false,
            },
            () => {
              try {
                let tracks = this.localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
              } catch (e) {
                console.log(e);
              }
              // if some stream is ended (i.e. when we turn off camera and audio) - creates a dummy blank stream
              let blackSilence = (...args) =>
                new MediaStream([black(...args), silence()]);
              window.localStream = blackSilence();
              localVideoRef.current.srcObject = window.localStream;

              for (let id in connections) {
                connections[id].addStream(window.localStream);

                connections[id].createOffer().then((description) => {
                  connections[id]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        id,
                        JSON.stringify({
                          sdp: connections[id].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                });
              }
            }
          );
        })
    );
  };

  // screen sharing
  const getDislayMedia = (isScreenOn) => {
    // if browser supports screen sharing
    if (navigator.mediaDevices.getDisplayMedia) {
      if (isScreenOn) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(getDislayMediaSuccess)
          .catch((e) => {
            setIsScreenOn(false);
          });
      } else {
        getDislayMediaSuccess(null);
      }
    }
  };

  const getDislayMediaSuccess = (stream) => {
    if (stream) {
      // if we get display stream turn off webcam video and microphoe audio as we supports only one stream sharing
      setIsAudioOn(false);
      setIsVideoOn(false);
    }
    try {
      window.localStream &&
        window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoRef.current.srcObject = stream;
    // sends screen share stream to all clients using webRTC
    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream &&
      stream.getTracks().forEach(
        (track) =>
          (track.onended = () => {
            this.setState(
              {
                screen: false,
              },
              () => {
                try {
                  let tracks = this.localVideoref.current.srcObject.getTracks();
                  tracks.forEach((track) => track.stop());
                } catch (e) {
                  console.log(e);
                }
                // if screen stream is ended, creates a dummy blank stream
                let blackSilence = (...args) =>
                  new MediaStream([this.black(...args), this.silence()]);
                window.localStream = blackSilence();
                this.localVideoref.current.srcObject = window.localStream;

                this.getUserMedia();
              }
            );
          })
      );
  };
  // mutes the audio
  const silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };
  // disable video
  const black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };
  // toggle video
  const handleVideo = () => {
    setIsVideoOn(!isVideoOn, () => {
      getMedia(!isVideoOn, isAudioOn);
    });
  };
  // toggle audio
  const handleAudio = () => {
    setIsAudioOn(!isAudioOn, () => {
      getMedia(isVideoOn, !isAudioOn);
    });
  };
  // toggle screen share
  const handleScreen = () => {
    setIsScreenOn(!isScreenOn, () => {
      getDislayMedia(!isScreenOn);
    });
  };
  // send message to server using socket.io and then server sends message to all clients connected to same room
  const sendMessage = (message) => {
    socket.emit("chat-message", message, app.userName);
  };

  return (
    <div className="flex flex-col h-[100vh] w-[100vw] bg-black">
      <div className="flex">
        <div
          id="main"
          className={`w-full h-[calc(100vh-60px)] flex flex-wrap justify-center items-center gap-8 overflow-auto p-8 md:inline-flex`}
        >
          <div className="videobox">
            <p className="username">{`${app.userName} (You)`}</p>
            <video autoPlay muted ref={localVideoRef}></video>
          </div>
        </div>
        <div
          className={`min-w-[350px] flex flex-col bg-black h-[calc(100vh-60px)] px-8 md:px-4 pt-4 ${
            !app.isChatBoxOpen && "hidden"
          }`}
        >
          <MessagesBox />
          <ComposeMessageBox sendMessage={sendMessage} />
        </div>
        <div
          className={`min-w-[350px] flex flex-col bg-black h-[calc(100vh-60px)] px-8 md:px-4 pt-4 ${
            !app.isParticipantDetailsBoxOpen && "hidden"
          }`}
        >
          <ParticipantDetails />
        </div>
        <div
          className={`min-w-[350px] flex flex-col bg-black h-[calc(100vh-60px)] px-8 md:px-4 pt-4 ${
            !app.isMeetingDetailsBoxOpen && "hidden"
          }`}
        >
          <MeetingDetails />
        </div>
      </div>

      <div className="mt-auto">
        <MeetControlBar
          handleEndCall={handleEndCall}
          handleVideo={handleVideo}
          isVideoOn={isVideoOn}
          handleAudio={handleAudio}
          isAudioOn={isAudioOn}
          handleScreen={handleScreen}
          isScreenOn={isScreenOn}
        />
      </div>
    </div>
  );
};

export default MeetingScreen;
