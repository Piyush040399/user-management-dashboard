import { api } from "../api/axios";
import type { User } from "../types/user";

export const getUsers = async () => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

export const createUser = async (
  data: Omit<User, "id">
) => {
  const response = await api.post("/users", data);
  return response.data;
};

export const updateUser = async (
  id: string,
  data: Partial<User>
) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  await api.delete(`/users/${id}`);
};