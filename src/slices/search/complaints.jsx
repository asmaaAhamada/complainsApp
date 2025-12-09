import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, Complaints, SEARCH } from '../../Back_end/Api';

export const SearchComplaints = createAsyncThunk(
  'program/search',
  async (reference_number, { rejectWithValue }) => {
    try {
    


      const response = await getData(`${BaseUrl}${Complaints}${SEARCH}?reference_number=${reference_number}`);
                        // console.log(response.data) 
    
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'SearchComplaints',
    initialState: {
       isloading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(SearchComplaints.pending, (state, action) => {
            state.isloading = true
          })
          .addCase(SearchComplaints.fulfilled, (state, action) => {
            state.isloading = false
            state.data = action.payload
            
          })
       .addCase(SearchComplaints.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload; 
          })
        }
  })
  

  export default counterSlice.reducer