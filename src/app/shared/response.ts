export interface ErrorResponse {
  value: string;
  msg: string;
  param: string;
  location: string;
}


export interface TaskResponse {
  code: number;
  message: string;
  task?: {
    name: string;
    complete: boolean;
    status: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
    uid: string;
  }
}

