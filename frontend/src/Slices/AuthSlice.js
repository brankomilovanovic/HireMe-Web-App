import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authUser: {},
        isUserLoading: true,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        isUserLoading: (state, action) => {
            state.isUserLoading = action.payload
        },
        userLogout: (state) => {
            state.user = {}
        }
    }
});

export const { setUser } = authSlice.actions
export const { isUserLoading } = authSlice.actions
export const { userLogout } = authSlice.actions

export default authSlice.reducer
