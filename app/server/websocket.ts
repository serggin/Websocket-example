import { WebSocket } from 'ws';

export default function init(port: number) {
    const wss = new WebSocket.Server({ port });
    const connections: { [name: string]: WebSocket } = {};

    wss.on('connection', (ws) => {

        ws.on('message', (message) => {
            const data = JSON.parse(message.toString());
            let outbound: string;

            switch (data.type) {
                case 'join':
                    connections[data.name] = ws;
                    outbound = JSON.stringify({
                        type: 'join',
                        names: Object.keys(connections),
                    });
                    break;
                case 'msg':
                    outbound = JSON.stringify({
                        type: 'msg',
                        name: data.name,
                        msg: data.msg
                    });
            }

            Object.values(connections).forEach((connection) => {
                connection.send(outbound);
            });
        });

        ws.on('close', () => {
            const name = Object.keys(connections).find(key => connections[key] === ws);
            if (name) {
                delete connections[name];
                const outbound = JSON.stringify({
                    type: 'join',
                    names: Object.keys(connections),
                });
                Object.values(connections).forEach((connection) => {
                    connection.send(outbound);
                });
            }
        });
    });

}