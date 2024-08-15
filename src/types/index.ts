export interface IPost {
  id: number;
  title: string;
  content: string;
  userId: number;
  comments: Comment[];
  user: User;
}

export interface IPostList {
  id: number;
  title: string;
  content: string;
  userId: number;
  _count: {
    comments: number;
  };
  user: User;
}

interface User {
  id: number;
  email: string;
}

interface Comment {
  content: string;
  id: number;
  user: User;
}
