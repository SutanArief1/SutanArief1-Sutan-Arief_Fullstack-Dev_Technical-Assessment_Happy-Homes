import { IActivity, IAddActivity, ICalculation } from '@/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface ActivityState {
  activities: IActivity[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ActivityState = {
  activities: [],
  status: 'idle',
  error: null,
};

export const fetchActivities = createAsyncThunk(
  'activities/fetchActivities',
  async () => {
    const res = await fetch('http://localhost:3001/activity/');

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }
);

export const createActivity = createAsyncThunk(
  'activities/createActivity',
  async (newActivity: IAddActivity) => {
    const res = await fetch('http://localhost:3001/activity/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newActivity),
    });    

    if (!res.ok) {
      throw new Error('Failed to create activity');
    }

    return res.json();
  }
);

export const deleteActivity = createAsyncThunk(
  'activities/deleteActivity',
  async (activityId: string) => {
    const res = await fetch(`http://localhost:3001/activity/${activityId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete activity');
    }

    return res.json();
  }
);

const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.fulfilled, (state, action: PayloadAction<IActivity[]>) => {
        state.status = 'succeeded';
        state.activities = action.payload;
      })
      .addCase(createActivity.fulfilled, (state, action: PayloadAction<IActivity>) => {
        state.activities.push(action.payload);
      })
      .addCase(deleteActivity.fulfilled, (state, action: PayloadAction<string>) => {
        state.activities = state.activities.filter(activity => activity.id !== action.payload);
      })
  },
});

export default activitySlice.reducer;