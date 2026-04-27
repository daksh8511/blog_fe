import { create } from "zustand";
import { persist } from "zustand/middleware";

const UserInfo = create(
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