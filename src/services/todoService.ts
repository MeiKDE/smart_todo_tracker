import axios from "axios";

export const todoService = {
  async getAllTodos() {
    const response = await axios.get("/api/todos");
    return response.data.data;
  },

  async createTodo(text: string) {
    const response = await axios.post("/api/todos", { text });
    return response.data.data;
  },

  async updateTodo(id: string, data: { text?: string; completed?: boolean }) {
    const response = await axios.put(`/api/todos/${id}`, data);
    return response.data.data;
  },

  async deleteTodo(id: string) {
    const response = await axios.delete(`/api/todos/${id}`);
    return response.data.data;
  },
};
