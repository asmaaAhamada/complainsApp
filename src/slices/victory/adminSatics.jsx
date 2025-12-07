import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { ADMIN, ALL, BaseUrl, Complaints, Employees, Incoming, STatistics } from '../../Back_end/Api';
import { getData } from '../../Back_end/ApiServecies';



export const Statistics = createAsyncThunk(
  'program/Statistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(`${BaseUrl}${STatistics}${ADMIN}`) 
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'Statistics',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(Statistics.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(Statistics.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            
          })
       .addCase(Statistics.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer