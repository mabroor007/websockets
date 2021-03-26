import { connection, IMessage } from "websocket";
import { createSocketResponse } from "./SocketResponse";

export interface SocketRequest {
  action: string;
  reciverId: number;
  msg: string;
}

export default class SockerRequestValidator {
  constructor(public conn: connection) {}
  handleRequestValidation(message: IMessage): SocketRequest {
    // Checking if the request data exists
    if (!message.utf8Data) {
      this.conn.send(
        createSocketResponse(false, {
          msg: "INVALID REQUEST!",
          error: { utf8: "utf8Data must be included" },
        })
      );
    }

    const request: SocketRequest = JSON.parse(message.utf8Data!);

    if (!request) {
      this.conn.send(
        createSocketResponse(false, {
          msg: "INVALID REQUEST!",
          error: "NO REQUEST FOUND!",
        })
      );
    }

    if (!request.action) {
      this.conn.send(
        createSocketResponse(false, {
          msg: "INVALID ACTION!",
          err: "NO REQUEST ACTION FOUND!",
        })
      );
    }

    //if (!request.senderId) {
    //this.conn.send(
    //createSocketResponse(false, { msg: "INVALID SENDER ID!" })
    //);
    //}

    return request;
  }
}
