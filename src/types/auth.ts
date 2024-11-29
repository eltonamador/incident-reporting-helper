export type UserRole = 'solicitante' | 'despachante' | 'respondedor';

export interface User {
  id: string;
  role: UserRole;
}