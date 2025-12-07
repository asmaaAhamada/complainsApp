import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import Cookies from 'universal-cookie';

import { BaseUrl, Creat, Employees } from '../../Back_end/Api';
import { postData } from '../../Back_end/ApiServecies';

const initialState = {
  formInfo: {
    name:'',
    email: '',
    password: '',
    password_confirmation:'',
   governmentEntityId:'',
   phone:''
  },
  isLoading: false,
  error: null,
   success: false,
  
};

export const Add_Employees = createAsyncThunk(
  'Log_in/Add_Employees',
  async (governmentEntityId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const {name, email, password, password_confirmation,phone } = state.Add_Employees.formInfo;


      const response = await postData(
        `${BaseUrl}${Employees}${Creat}${governmentEntityId}`,
        { name, email, password, password_confirmation,phone },
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
  name: 'Add_Employees',
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
      .addCase(Add_Employees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Add_Employees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; 
        state.success = true;
      })
      .addCase(Add_Employees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setformInfo, resetForm ,clearError } = formSlice.actions;
export default formSlice.reducer;
