import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../Back_end/ApiServecies';
import { BaseUrl, Gonverment } from '../Back_end/Api';



export const fetchGonverment = createAsyncThunk(
  'program/fetchGonverment',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(`${BaseUrl}${Gonverment}`) 
      
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'fetchGonverment',
    initialState: {
       isloading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchGonverment.pending, (state, action) => {
            state.isloading = true
          })
          .addCase(fetchGonverment.fulfilled, (state, action) => {
            state.isloading = false
            state.data = action.payload
            
          })
       .addCase(fetchGonverment.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer