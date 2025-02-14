import React, { useState, useEffect } from 'react';

const ChatApp = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setWs(socket);

        socket.onopen = () => console.log('WebSocket connected');

        socket.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        socket.onclose = () => {
            console.log('WebSocket disconnected');
            setWs(null);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => socket.close();
    }, []);

    const sendMessage = () => {
        if (message.trim() && ws?.readyState === WebSocket.OPEN) {
            ws.send(message);
            setMessage('');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
            <h2>Real-Time Chat</h2>
            <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{ margin: '5px', padding: '5px', background: '#eee' }}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: '80%', padding: '10px', margin: '10px 0' }}
            />
            <button onClick={sendMessage} style={{ padding: '10px 20px' }}>Send</button>
        </div>
    );
};

export default ChatApp;
