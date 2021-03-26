import http from "http";
import { server as Socket } from "websocket";
import { users } from "./ActiveUsers";
import User from "./User";

const httpServer = http.createServer();

httpServer.on("request", (_req, res) => {
  res.write(
    JSON.stringify({
      success: true,
      payload: { msg: "Welcome to the server!" },
    })
  );
  res.end();
});

httpServer.listen(4000, () => console.log("Server running on port 4000"));

// Creating a new socket server
const socket = new Socket({ httpServer: httpServer });

// Client trying to connect
socket.on("request", (req) => {
  // Accepting the client connection
  const conn = req.accept();
  users.push(new User(conn));
});
