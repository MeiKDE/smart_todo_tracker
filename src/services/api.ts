import { Todo } from "@/types";

type CreateTodoInput = {
  text: string;
};

export const todoApi = {
  create: async (data: CreateTodoInput) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getAll: async () => {
    const response = await fetch("/api/todos");
    return response.json();
  },

  update: async (id: number, data: Partial<Todo>) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};
