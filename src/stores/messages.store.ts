import create from "zustand";

interface Message {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  text: string;
}

interface Props {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  next: string;
  setNext: (next: string) => void;
  prev: string;
  setPrev: (prev: string) => void;
}

export const useMessage = create<Props>((set) => ({
  messages: [],
  prev: "",
  next: "",
  setMessages: (messages) => set((state) => ({ messages })),
  setNext: (next) => set((state) => ({ next })),
  setPrev: (prev) => set((state) => ({ prev })),
}));
