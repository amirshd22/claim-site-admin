import create from "zustand";

export interface FaQ {
  id: string;
  question: string;
  answer: string;
}

interface Props {
  faqs: FaQ[];
  setFaq: (faqs: FaQ[]) => void;
}

export const useFaq = create<Props>((set) => ({
  faqs: [],
  setFaq: (faqs) => set((state) => ({ faqs })),
}));
