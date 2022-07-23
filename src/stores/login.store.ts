import create from "zustand";
interface USER {
  access: string;
  setAccess: (access: string) => void;
  setIsLogIn: (data: boolean) => void;
  isLoggedIn: boolean;
  userCount: number;
  setUserCount: (count: number) => void;
}

export const useLogin = create<USER>((set) => ({
  access: "",
  isLoggedIn: false,
  userCount: 0,
  setAccess: (access) => set((state) => ({ ...state, access })),
  setIsLogIn: (data) => set((state) => ({ ...state, isLoggedIn: data })),
  setUserCount: (userCount) => set((state) => ({ ...state, userCount })),
}));
