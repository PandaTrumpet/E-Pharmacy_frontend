import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType: "login" | "register" | null;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalWindow: (
      state,
      action: PayloadAction<{
        modalType: ModalState["modalType"];
      }>
    ) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
    },
    closeModalWindow: (state) => {
      state.isOpen = false;
      state.modalType = null;
    },
  },
});

export const { openModalWindow, closeModalWindow } = modalSlice.actions;
export default modalSlice.reducer;
