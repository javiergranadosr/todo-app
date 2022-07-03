export interface Task {
  name: string;
  userId: string;
  complete: boolean;
}

export interface Tasks {
  name: string;
  complete: boolean;
  status: boolean;
  userId: {
    _id: string;
    name: string;
  }
  createAt: string;
  updateAt: string;
  uid: string;
}

export interface ListTasks {
  code: number;
  total: number;
  tasks: Tasks[]
}
