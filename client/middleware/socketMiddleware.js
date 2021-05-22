import io from "socket.io-client";
import { origin } from "../config/config";

export const socketMiddleware = (dispatch) => (next) => (action) => {
  //   const socket = io(origin, { withCredentials: true });
  console.log(action.type);
  return next(action);
};
