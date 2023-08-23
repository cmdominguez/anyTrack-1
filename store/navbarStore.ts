import { create } from "zustand";

type Actions = {
  toggleMenu: () => void;
};

type State = {
  isOpenMenu: boolean;
};

const useNavbarStore = create<State & Actions>((set) => ({
  isOpenMenu: false,

  toggleMenu: () => set((state) => ({ isOpenMenu: !state.isOpenMenu })),
}));

export default useNavbarStore;
