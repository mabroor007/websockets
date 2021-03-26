import { v4 } from "uuid";
import { connection, IMessage } from "websocket";
import { createSocketResponse } from "./SocketResponse";
import SocketRequestValidator from "./Validator";
import { getAllActiveUsersIdList } from "./ActiveUsers";

export default class User extends SocketRequestValidator {
  public id: string;
  constructor(public readonly conn: connection) {
    super(conn);

    // Creating the userId
    this.id = v4();

    // Sending the credentials
    conn.send(createSocketResponse(true, { userId: this.id }));

    // Handling The for requests
    conn.on("message", (message) => this.handleMessage(message));
  }

  private handleMessage(message: IMessage) {
    // If request has came
    const request = this.handleRequestValidation(message);
    if (!request) return;

    // Then identify the request
    switch (request.action) {
      case "GET_INFO": {
        this.conn.send(
          createSocketResponse(true, {
            info:
              "This is a chatting application.You can get all the users and chat with them in real time!",
          })
        );
        break;
      }

      case "GET_ALL_ACTIVE_USERS": {
        this.conn.send(
          createSocketResponse(true, {
            msg: "RETURNING ALL USERS!",
            users: getAllActiveUsersIdList(),
          })
        );
        break;
      }

      default: {
        this.conn.send(
          createSocketResponse(false, {
            msg: "INVALID REQUEST!",
            error: "ACTION NOT FOUND!",
          })
        );
      }
    }
  }
}
