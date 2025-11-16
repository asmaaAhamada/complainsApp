import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, Complaints, Incoming } from '../../Back_end/Api';
import { getData } from '../../Back_end/ApiServecies';



export const fetchComplaints = createAsyncThunk(
  'program/fetchComplaints',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(`${BaseUrl}${Complaints}${Incoming}`) 
      
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'fetchComplaints',
    initialState: {
       isloading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchComplaints.pending, (state, action) => {
            state.isloading = true
          })
          .addCase(fetchComplaints.fulfilled, (state, action) => {
            state.isloading = false
            state.data = action.payload
            
          })
       .addCase(fetchComplaints.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer