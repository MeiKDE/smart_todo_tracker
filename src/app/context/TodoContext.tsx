"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { todoService } from "@/services/todoService";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  selected: boolean;
};

type TodoContextType = {
  input: string;
  setInput: (input: string) => void;
  todos: Todo[];
  addTodo: () => void;
  deleteTodo: (id: string) => void;
  selectedTodo: (id: string) => void;
  completedTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to load todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async () => {
    if (input.trim()) {
      try {
        const newTodo = await todoService.createTodo(input.trim());
        setTodos((prevTodos) => [newTodo, ...prevTodos]);
        setInput("");
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const selectedTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, selected: !todo.selected }
          : { ...todo, selected: false }
      )
    );

    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setInput(todo.text);
    }
  };

  const completedTodo = async (id: string) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = await todoService.updateTodo(id, {
        completed: !todoToUpdate.completed,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const editTodo = async (id: string, newText: string) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, { text: newText });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, text: updatedTodo.text } : todo
        )
      );
    } catch (error) {
      console.error("Failed to edit todo:", error);
    }
  };

  const value = {
    input,
    setInput,
    todos,
    addTodo,
    deleteTodo,
    selectedTodo,
    completedTodo,
    editTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
}
