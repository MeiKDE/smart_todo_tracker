interface Post {
  id: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  authorId?: string;
}

export const postApi = {
  create: async (data: Pick<Post, "title" | "content">) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getAll: async () => {
    const response = await fetch("/api/posts");
    return response.json();
  },

  update: async (id: string, data: Partial<Post>) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};
