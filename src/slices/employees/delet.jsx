import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { ALL, BaseUrl, Complaints, DELET, Employees, Incoming } from '../../Back_end/Api';
import { deleteData, getData } from '../../Back_end/ApiServecies';



export const deletEmployees = createAsyncThunk(
  'program/deletEmployees',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await deleteData(`${BaseUrl}${Employees}${DELET}${employeeId}`) 
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'deletEmployees',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(deletEmployees.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(deletEmployees.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(deletEmployees.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer