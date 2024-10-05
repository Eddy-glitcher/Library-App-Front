export interface ApiErrorResponse {
  message     : string;
  ok          : boolean;
  path        : string;
  statusCode  : number;
  timestamp   : Date;
}
