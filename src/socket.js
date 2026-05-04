import { io } from "socket.io-client";
import { SOCKET_API } from "./constants";

const socket = io(SOCKET_API,{
    
});

export default socket;