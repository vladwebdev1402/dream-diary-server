import { Request } from 'express';

export type JwtUser = {
  id: number;
};

export type ReqJwtUser = { user: JwtUser } & Request;
