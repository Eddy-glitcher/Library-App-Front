import { User } from "./user";

export interface LoginErrorResponse {
  message : string;
  ok : boolean;
  path : string;
  statusCode : number;
  timestamp : Date
}
