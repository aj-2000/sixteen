import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  socketId: null,
  havePermissions: false,
  isChatBoxOpen: false,
  isParticipantDetailsBoxOpen: false,
  isMeetingDetailsBoxOpen: false,
  isAudioAvailable: false,
  isVideoAvailable: false,
  isScreenAvailable: false,
  participants: null,
  users: null,
  messages: [],
  newMessages: 0,
  participants: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    default: (state) => {
      return {
        ...state,
      };
    },
    setUsername: (state, userName) => {
      state.userName = userName.payload;
    },
    setHavePermissions: (state, havePermissions) => {
      state.havePermissions = havePermissions.payload;
    },
    toggleChatBox: (state) => {
      state.isParticipantDetailsBoxOpen = false;
      state.isMeetingDetailsBoxOpen = false;
      state.isChatBoxOpen = !state.isChatBoxOpen;
    },
    toggleParticipantDetailsBox: (state) => {
      state.isChatBoxOpen = false;
      state.isMeetingDetailsBoxOpen = false;
      state.isParticipantDetailsBoxOpen = !state.isParticipantDetailsBoxOpen;
    },
    toggleMeetingDetailsBox: (state) => {
      state.isChatBoxOpen = false;
      state.isParticipantDetailsBoxOpen = false;
      state.isMeetingDetailsBoxOpen = !state.isMeetingDetailsBoxOpen;
    },

    setIsAudioAvailable: (state, isAudioAvailable) => {
      state.isAudioAvailable = isAudioAvailable.payload;
    },
    setIsVideoAvailable: (state, isVideoAvailable) => {
      state.isVideoAvailable = isVideoAvailable.payload;
    },
    setIsScreenAvailable: (state, isScreenAvailable) => {
      state.isScreenAvailable = isScreenAvailable.payload;
    },
    addNewMessage: (state, message) => {
      state.messages.push(message.payload);
    },
    incNewMessages: (state) => {
      state.newMessages = state.newMessages + 1;
    },
    resetNewMessages: (state) => {
      state.newMessages = 0;
    },
    setSocketId: (state, socketId) => {
      state.socketId = socketId.payload;
    },
    setParticipants: (state, participants) => {
      state.participants = participants.payload;
    },
    removePaticipant: (state, socketId) => {
      const index = state.participants.indexOf(socketId.payload);
      if (index !== -1) {
        state.participants.splice(index, 1);
      }
    },

    setUsers: (state, users) => {
      state.users = users.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUsername,
  setHavePermissions,
  toggleChatBox,
  toggleParticipantDetailsBox,
  toggleMeetingDetailsBox,
  setIsAudioAvailable,
  setIsVideoAvailable,
  setIsScreenAvailable,
  addNewMessage,
  incNewMessages,
  resetNewMessages,
  setSocketId,
  setParticipants,
  setUsers,
  removePaticipant,
} = appSlice.actions;

export default appSlice.reducer;
