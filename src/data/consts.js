export const server_url =
  process.env.NODE_ENV === "production"
    ? "https://sixteen.up.railway.app"
    : "https://sixteen.up.railway.app";
export const peerConnectionConfig = {
  iceServers: [
    // { 'urls': 'stun:stun.services.mozilla.com' },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};
