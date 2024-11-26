//import WebSocket from 'ws';
//import { config } from '../config';

const ws_port = 8081;

const name = (document.querySelector("#name") as HTMLInputElement).value;

const socket = new WebSocket(`ws://localhost:${ws_port}`);


if (socket) {
    socket.onerror = () => {
        console.error;
    };

    socket.onopen = () => {
        socket.send(JSON.stringify({ 'type': 'join', name }));
    };
}