export interface Login {
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
  code: number,
  user: User;
  token: string
}
