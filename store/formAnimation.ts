import { create } from "zustand";

type Actions = {
  toggleAnimationForm: () => void;
};

type State = {
  isAnimation: boolean;
};

const useAnimationStore = create<State & Actions>((set) => ({
  isAnimation: false,

  toggleAnimationForm: () =>
    set((state) => ({ isAnimation: !state.isAnimation })),
}));

export default useAnimationStore;
