export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}

export interface User {
  name: string;
  email:string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  uid: string;
}

export interface AuthReponse {
  code: number;
  message?: string;
  user: User;
  token: string;
}

export interface tokenResponse {
  code: number;
  message: string;
  ok: boolean;
}
