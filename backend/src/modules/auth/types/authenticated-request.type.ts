import { Request } from 'express';
import { User } from '@prisma/client';

export type AuthenticatedRequest = Request & {
  user: User;
  requestId?: string;
};
