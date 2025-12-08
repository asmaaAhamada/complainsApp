import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import Cookies from 'universal-cookie';

import { ADD_Notify, BaseUrl, Complaints, Creat, Employees, GONVERMENT_ENTITIES, Toggle_Status } from '../../Back_end/Api';
import { patchData, postData, putData } from '../../Back_end/ApiServecies';

const initialState = {
  formInfo: {
   
   
  },
  isLoading: false,
  error: null,
   success: false,
  
};

export const Toggle = createAsyncThunk(
  'Log_in/Toggle',
  async (Id,  {  rejectWithValue }) => {
    try {
      

      const response = await patchData(
        `${BaseUrl}${Complaints}${Toggle_Status}${Id}`,
       
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
  name: 'Toggle',
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
      .addCase(Toggle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Toggle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; 
        state.success = true;
      })
      .addCase(Toggle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setformInfo, resetForm ,clearError } = formSlice.actions;
export default formSlice.reducer;
