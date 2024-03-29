import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toast.slice'
import loginUserReducer from './login_user.slice'
import navigationReducer from './navigate.slice';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    loginUser: loginUserReducer,
    navigation: navigationReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch