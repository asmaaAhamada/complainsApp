import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { ALL, BaseUrl, Complaints, HISTORY, Incoming } from '../../Back_end/Api';
import { getData } from '../../Back_end/ApiServecies';



export const fetchComplaintsincoming = createAsyncThunk(
  'program/fetchComplaintsincoming',
  async (Complain_Id, { rejectWithValue }) => {
    try {
      const response = await getData(`${BaseUrl}${Complaints}${Incoming}/${Complain_Id}`) 
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'fetchComplaintsincoming',
    initialState: {
       isloading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchComplaintsincoming.pending, (state, action) => {
            state.isloading = true
          })
          .addCase(fetchComplaintsincoming.fulfilled, (state, action) => {
            state.isloading = false
            state.data = action.payload
            
          })
       .addCase(fetchComplaintsincoming.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer