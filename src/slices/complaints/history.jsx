import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { ALL, BaseUrl, Complaints, HISTORY, Incoming } from '../../Back_end/Api';
import { getData } from '../../Back_end/ApiServecies';



export const fetchComplaints_History = createAsyncThunk(
  'program/fetchComplaintsHistory',
  async (Complain_Id, { rejectWithValue }) => {
    try {
      const response = await getData(`${BaseUrl}${Complaints}${HISTORY}${Complain_Id}`) 
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'fetchComplaintsHistory',
    initialState: {
       isloading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchComplaints_History.pending, (state, action) => {
            state.isloading = true
          })
          .addCase(fetchComplaints_History.fulfilled, (state, action) => {
            state.isloading = false
            state.data = action.payload
            
          })
       .addCase(fetchComplaints_History.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer