import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../Back_end/ApiServecies';
import { BaseUrl, Complaints, Incoming } from '../../Back_end/Api';



export const incomingComplaints = createAsyncThunk(
  'program/incomingComplaints',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await getData(`${BaseUrl}${Complaints}${Incoming}?page=${page}`) 
       return { ...response, page };
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'incomingComplaints',
    initialState: {
       isloading:false,
       data:[],
       error:null,
        page: 1
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(incomingComplaints.pending, (state, action) => {
            state.isloading = true
          })
          .addCase(incomingComplaints.fulfilled, (state, action) => {
            state.isloading = false
            state.data = action.payload
             state.page = action.payload.page;
            
          })
       .addCase(incomingComplaints.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer