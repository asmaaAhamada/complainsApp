import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import Cookies from 'universal-cookie';

import Cookies from 'universal-cookie';
import { postNoToken } from '../Back_end/ApiServecies';
import { BaseUrl, LOG_IN } from '../Back_end/Api';

const initialState = {
  formInfo: {
    
    email: '',
    password: '',
   
  },
  isLoading: false,
  error: null,
  
};

export const Log_in = createAsyncThunk(
  'Log_in/Log_in',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const {  email, password } = state.Log_in.formInfo;

    

      const response = await postNoToken(`${BaseUrl}${LOG_IN}`,  {  email, password }, {}, true);
      console.log("📦 login response:", response);
const data = response.data;
      const token = data.token;
      const user = data.user;
      const cookies = new Cookies();
      cookies.set('token', token, {
        path: '/',
        maxAge: 86400, // يوم واحد
      });
return user



     
    } catch (error) {
      return rejectWithValue(error?.message || 'فشل التسجيل');
    }
  }
);

const formSlice = createSlice({
  name: 'Log_in',
  initialState,
  reducers: {
    setformInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    resetForm: () => initialState,
    clearError: (state) => {
    state.error = null;
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Log_in.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Log_in.fulfilled, (state, action) => {
        state.isLoading = false;
  state.user = action.payload;
      })
      .addCase(Log_in.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setformInfo, resetForm ,clearError } = formSlice.actions;
export default formSlice.reducer;
