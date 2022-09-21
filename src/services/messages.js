import { API_URL } from "../config";
import io from "socket.io-client";

const socket = io(API_URL, {
  transports: ["websocket"],
});

export default socket;
