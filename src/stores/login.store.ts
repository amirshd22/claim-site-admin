import create from "zustand";
interface USER {
  access: string;
  setAccess: (access: string) => void;
  setIsLogIn: (data: boolean) => void;
  isLoggedIn: boolean;
}

export const useLogin = create<USER>((set) => ({
  access: "",
  isLoggedIn: false,
  setAccess: (access) => set((state) => ({ ...state, access })),
  setIsLogIn: (data) => set((state) => ({ ...state, isLoggedIn: data })),
}));
