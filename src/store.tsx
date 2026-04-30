import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  create_at: string;
  email: string;
  id: number;
  name: string;
  password: string;
}

interface AuthStore {
  userInfo: User | null;
  token: string | null;
  setInfo: (value: { User: User; token: string }) => void;
  logout: () => void;
}

const UserInfo =  create<AuthStore>()(
  persist(
    (set) => ({
      userInfo: null,
      token: null,

      setInfo: (value) =>
        set({
          userInfo: value.User,
          token: value.token,
        }),

      logout: () =>
        set({
          userInfo: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);


export default UserInfo;