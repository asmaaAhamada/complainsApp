import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import Cookies from 'universal-cookie';

import { BaseUrl, Complaints, Creat, Employees, GONVERMENT_ENTITIES, Status } from '../../Back_end/Api';
import { patchData, postData, putData } from '../../Back_end/ApiServecies';

const initialState = {
  formInfo: {
    status:'',
   
  },
  Loading: false,
  Error: null,
   success: false,
  
};

export const Edit_Status = createAsyncThunk(
  'Log_in/Edit_Status',
  async (Id,  { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const {status } = state.Edit_Status.formInfo;
console.log(status)

      const response = await patchData(
        `${BaseUrl}${Complaints}${Status}${Id}`,
        { status },
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
  name: 'Edit_Status',
  initialState,
  reducers: {
    setformInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    resetForm: () => initialState,
    clearError: (state) => {
    state.Error = null;
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Edit_Status.pending, (state) => {
        state.Loading = true;
        state.Error = null;
      })
      .addCase(Edit_Status.fulfilled, (state, action) => {
        state.Loading = false;
        state.user = action.payload; 
        state.success = true;
      })
      .addCase(Edit_Status.rejected, (state, action) => {
        state.Loading = false;
        state.Error = action.payload;
      });
  },
});

export const { setformInfo, resetForm ,clearError } = formSlice.actions;
export default formSlice.reducer;
