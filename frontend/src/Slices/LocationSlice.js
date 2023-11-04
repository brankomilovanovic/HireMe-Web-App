import {createSlice} from "@reduxjs/toolkit";

export const locationSlice = createSlice({
    name: 'location',
    initialState: {
        cities: []
    },
    reducers: {
        setCities: (state, action) => {
            state.cities = action.payload
        }
    }
});

export const { setCities } = locationSlice.actions

export default locationSlice.reducer
