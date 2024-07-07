import { IUser } from '@/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  users: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: '',
  status: 'idle',
  error: null,
};

export const fetchUsersById = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const res = await fetch('http://localhost:3001/users/user');

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.id;
      })
  },
});

export default usersSlice.reducer;