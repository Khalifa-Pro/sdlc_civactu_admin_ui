export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: 'CITIZEN' | 'OFFICIAL' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: string;
}
