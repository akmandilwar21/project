import {createSlice, configureStore} from '@reduxjs/toolkit';

const initialAuthState={isAuthenticated:false, data:{}}
const authSlice= createSlice({
    name:'authentication',
    initialState: initialAuthState,
    reducers:{
        login(state) {
            state.isAuthenticated=true;
        },
        logout(state) {
            state.isAuthenticated=false;
        },
        userData(state,action) {
            console.log(action.payload)
            state.data=  action.payload;
        },
    }
});
const store= configureStore({
    reducer:{auth:authSlice.reducer}
} )

export const authActions = authSlice.actions;
export default store;
