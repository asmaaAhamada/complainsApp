import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { ALL, BaseUrl, Complaints, Employees, Incoming } from '../../Back_end/Api';
import { getData } from '../../Back_end/ApiServecies';



export const fetchEmployees = createAsyncThunk(
  'program/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(`${BaseUrl}${Employees}${ALL}`) 
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'fetchEmployees',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchEmployees.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchEmployees.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(fetchEmployees.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer