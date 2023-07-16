export const server_url =
  process.env.NODE_ENV === "production"
    ? "https://sixteenbackend-production.up.railway.app"
    : "http://localhost:5000";
export const peerConnectionConfig = {
  iceServers: [
    // { 'urls': 'stun:stun.services.mozilla.com' },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};
