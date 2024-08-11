export interface IPostItem {
  id: number;
  title: string;
  content: string;
  userId: number;
  comments: {
    content: string;
    id: number;
    user: User;
  }[];
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
