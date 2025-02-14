const WebSocket = require('ws');

// Ensure compatibility with latest ws package
const wss = new WebSocket.Server({ port: 8080 });

wss.on('listening', () => {
    console.log('WebSocket server running on ws://localhost:8080');
});

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(message); // Echo message back
    });
    ws.on('close', () => console.log('Client disconnected'));
});
