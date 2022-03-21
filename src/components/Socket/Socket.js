import socketIOClient from "socket.io-client";

const socketUrl = process.env.REACT_APP_SOCKET_SERVER_URL;
let socket = socketIOClient(socketUrl, { transports: ['websocket'], rejectUnauthorized: false });
export default socket;
