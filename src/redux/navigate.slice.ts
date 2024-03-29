import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NavigateState {
  from: string;
  to: string;
}

const initialState: NavigateState = {
  from: '',
  to: ''
}

export const navigateSlice = createSlice({
  name: 'navigate',
  initialState,
  reducers: {
    setNavigate: (state, action: PayloadAction<NavigateState>) => {
        state.from = action.payload.from;
        state.to = action.payload.to;
    }
  },
});

export const { setNavigate } = navigateSlice.actions

export default navigateSlice.reducer