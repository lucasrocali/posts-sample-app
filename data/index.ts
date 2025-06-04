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

export const fetchPosts = async (page = 0): Promise<Post[]> => {
  const { data } = await axiosInstance.get<Post[]>(`/posts?_page=${page}`);
  return data;
};

export const fetchPost = async (id: number): Promise<Post> => {
  const { data } = await axiosInstance.get<Post>(`/posts/${id}`);
  return data;
};
