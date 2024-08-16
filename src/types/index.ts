export interface IPost {
  id: number;
  title: string;
  content: string;
  userId: number;
  comments: Comment[];
  user: IUser;
}

export interface IPostList {
  id: number;
  title: string;
  content: string;
  userId: number;
  _count: {
    comments: number;
  };
  user: IUser;
}

export interface IUser {
  id: number;
  email: string;
}

interface Comment {
  content: string;
  id: number;
  user: IUser;
}

export interface IUserInputs extends IUser {
  password: string;
}
