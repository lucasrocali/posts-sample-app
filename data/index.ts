import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export const fetchPosts = async (page = 0): Promise<Post[]> => {
  const { data } = await axiosInstance.get<Post[]>(`/posts?_page=${page}`);
  return data;
};

export const fetchPost = async (id: number): Promise<Post> => {
  const { data } = await axiosInstance.get<Post>(`/posts/${id}`);
  return data;
};

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const { data } = await axiosInstance.get<Comment[]>(
    `posts/${postId}/comments`
  );
  return data;
};
