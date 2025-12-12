import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import Cookies from 'universal-cookie';

import { BaseUrl, Creat, EDITE, Employees } from '../../Back_end/Api';
import { postData, putData } from '../../Back_end/ApiServecies';

const initialState = {
  formInfo: {
    name:'',
    email: '',
        originalEmail: "",   // ← تضيفي هذا

    password: '',
    password_confirmation:'',
  
   phone:'',
   government_entity_id:''
  },
  isLoading: false,
  error: null,
   success: false,
  
};

export const Edit_Employees = createAsyncThunk(
  'Edit_Employees/Edit',
  async (employeeId, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { name, email, originalEmail, password, password_confirmation, phone, government_entity_id } 
  = state.Edit_Employees.formInfo;

  const body = {};

if (name) body.name = name;
if (email && email !== originalEmail) {
  body.email = email;
}
if (phone) body.phone = phone;

if (government_entity_id) {
  body.government_entity_id = Number(government_entity_id);
}

if (password && password_confirmation) {
  body.password = password;
  body.password_confirmation = password_confirmation;
}



      console.log("🚀 Sending Data:", body);

      const response = await putData(
        `${BaseUrl}${Employees}${EDITE}${employeeId}`,
        body,
        {},
        true
      );
console.log(  `${BaseUrl}${Employees}${EDITE}${employeeId}`)
      return response;

    } catch (error) {
  console.log("🔥 FULL ERROR:", error);
  return rejectWithValue(
    error?.response?.data?.message || 'فشل التعديل'
  );
}

  }
);



const formSlice = createSlice({
  name: 'Edit_Employees',
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
      .addCase(Edit_Employees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Edit_Employees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; 
        state.success = true;
      })
      .addCase(Edit_Employees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setformInfo, resetForm ,clearError } = formSlice.actions;
export default formSlice.reducer;
