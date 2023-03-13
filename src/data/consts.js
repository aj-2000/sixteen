export const server_url =
  process.env.NODE_ENV === "production"
    ? "https://sixmeent-backend.onrender.com"
    : "https://sixmeent-backend.onrender.com";
export const peerConnectionConfig = {
  iceServers: [
    // { 'urls': 'stun:stun.services.mozilla.com' },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};
