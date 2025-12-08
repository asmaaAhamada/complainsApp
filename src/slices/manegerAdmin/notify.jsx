import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import Cookies from 'universal-cookie';

import { ADD_Notify, BaseUrl, Complaints, Creat, Employees, GONVERMENT_ENTITIES } from '../../Back_end/Api';
import { postData, putData } from '../../Back_end/ApiServecies';

const initialState = {
  formInfo: {
    note:'',
   
  },
  isLoading: false,
  error: null,
   success: false,
  
};

export const notify = createAsyncThunk(
  'Log_in/notify',
  async (Id,  { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const {note } = state.notify.formInfo;
console.log(name)

      const response = await putData(
        `${BaseUrl}${Complaints}${ADD_Notify}${Id}`,
        { note },
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
  name: 'notify',
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
      .addCase(notify.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(notify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; 
        state.success = true;
      })
      .addCase(notify.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setformInfo, resetForm ,clearError } = formSlice.actions;
export default formSlice.reducer;
