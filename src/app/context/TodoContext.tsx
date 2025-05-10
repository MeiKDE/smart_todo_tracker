"use client";
import React, { createContext, useContext, useState } from "react";

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

  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: input.trim(),
          completed: false,
          selected: false,
        },
      ]);
      setInput("");
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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

  const completedTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
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
