import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    paidStatus: false,
    subClassList: [],
    editMode: 0,
    updateClassSerialStatus: 'idle',
    status: 'idle',
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setPaidStatus: (state, action) => {
            state.paidStatus = action.payload;
        },
    },
 
});
export const { setPaidStatus } = dashboardSlice.actions;
export default dashboardSlice.reducer;
