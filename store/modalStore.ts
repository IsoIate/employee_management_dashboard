import { create } from "zustand";

interface ModalState {
  isModalOpen: boolean;
  employeeId: number;
  openModal: (id: number) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  employeeId: 0,
  openModal: (id) => set({ isModalOpen: true, employeeId: id }),
  closeModal: () => set({ isModalOpen: false }),
}));
