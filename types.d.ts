interface Post {
  content: string;
  User: {
    id: number;
    avatar: string | null;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  id: 4;
  createdAt: string;
  postImg: string | null;
  postVideo: string | null;
  updatedAt: string;
  userId: number;
}

interface FetchedUser {
  id: number;
  avatar: string | null;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
