import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../entities/UserEntity'

export interface LoginUserState {
  user: User
}

const initialState: LoginUserState = {
  user: {} as User
}

export const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
    }
  },
});

export const { setUser } = loginUserSlice.actions

export default loginUserSlice.reducer