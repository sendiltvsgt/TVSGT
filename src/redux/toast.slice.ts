import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ToastMessageType } from 'primereact/toast'

export interface ToastState {
  value: ToastMessageType
}

const initialState: ToastState = {
  value: {}
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<ToastMessageType>) => {
        state.value = action.payload; 
    }
  },
});

export const { setToast } = toastSlice.actions

export default toastSlice.reducer