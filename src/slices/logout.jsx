import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import Cookies from 'universal-cookie';

import Cookies from 'universal-cookie';
import { postNoToken } from '../Back_end/ApiServecies';
import { BaseUrl, LOG_IN } from '../Back_end/Api';


const initialState = {
  formInfo: {
    
   
   
  },
  isLoading: false,
  error: null,
  
};

export const Log_out = createAsyncThunk(
  'Log_in/Log_out',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();

    

      const response = await postNoToken(`${BaseUrl}${LOG_IN}`,  {}, true);
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
  name: 'Log_out',
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
      .addCase(Log_out.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Log_out.fulfilled, (state, action) => {
        state.isLoading = false;
  state.user = action.payload;
      })
      .addCase(Log_out.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setformInfo, resetForm ,clearError } = formSlice.actions;
export default formSlice.reducer;
