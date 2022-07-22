import create from "zustand";

interface Withdraw {
  id: string;
  createAt: string;
  isPaid: boolean;
  user: any;
  profile: any;
}

interface Withdraws {
  withdraws: Withdraw[];
  setWithdraws: (withdraws: Withdraw[]) => void;
  next: string;
  setNext: (next: string) => void;
  prev: string;
  setPrev: (prev: string) => void;
  last: string;
  setLast: (last: string) => void;
}

export const useWithdraw = create<Withdraws>((set) => ({
  withdraws: [],
  next: "",
  prev: "",
  last: "",

  setWithdraws: (withdraws) => set((state) => ({ withdraws })),
  setNext: (next) => set((state) => ({ next })),
  setPrev: (prev) => set((state) => ({ prev })),
  setLast: (last) => set((state) => ({ last })),
}));
