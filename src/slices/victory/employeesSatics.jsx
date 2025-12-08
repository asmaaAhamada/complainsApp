import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { ADMIN, ALL, BaseUrl, Complaints, Employees, Gonverment, Gonverments, Incoming, STatistics } from '../../Back_end/Api';
import { getData } from '../../Back_end/ApiServecies';



export const Employees_Statistics = createAsyncThunk(
  'program/Employees_Statistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(`${BaseUrl}${STatistics}${Gonverments}`) 
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'Employees_Statistics',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(Employees_Statistics.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(Employees_Statistics.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(Employees_Statistics.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer