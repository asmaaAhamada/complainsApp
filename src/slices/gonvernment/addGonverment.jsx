import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import Cookies from 'universal-cookie';

import { BaseUrl, Creat, Employees, GONVERMENT_ENTITIES } from '../../Back_end/Api';
import { postData } from '../../Back_end/ApiServecies';

const initialState = {
  formInfo: {
    name:'',
   
  },
  isLoading: false,
  error: null,
   success: false,
  
};

export const Add_Gonverments = createAsyncThunk(
  'Log_in/Add_Gonverments',
  async (_,  { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const {name } = state.Add_Gonverments.formInfo;


      const response = await postData(
        `${BaseUrl}${GONVERMENT_ENTITIES}`,
        { name },
        {},
        true
      );
      console.log("📦 login response:", response);

      return response;

    } catch (error) {
      return rejectWithValue(error?.message || 'فشل التسجيل');
    }
  }
);


const formSlice = createSlice({
  name: 'Add_Gonverments',
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
      .addCase(Add_Gonverments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Add_Gonverments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; 
        state.success = true;
      })
      .addCase(Add_Gonverments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setformInfo, resetForm ,clearError } = formSlice.actions;
export default formSlice.reducer;
