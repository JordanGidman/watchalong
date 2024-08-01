import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const rooms = {};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const { roomId, type, state, time } = JSON.parse(message);

    if (!rooms[roomId]) {
      rooms[roomId] = { clients: [], state: { state: "PAUSED", time: 0 } };
    }

    if (type === "JOIN") {
      rooms[roomId].clients.push(ws);
      const roomState = rooms[roomId].state;
      ws.send(JSON.stringify({ type: "SYNC", ...roomState }));
    } else if (type === "STATE_CHANGE") {
      rooms[roomId].state = { state, time };
      rooms[roomId].clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "SYNC", state, time }));
        }
      });
    }
  });

  ws.on("close", () => {
    for (const roomId in rooms) {
      rooms[roomId].clients = rooms[roomId].clients.filter(
        (client) => client !== ws
      );
    }
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
