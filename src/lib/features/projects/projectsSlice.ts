import { IProject } from '@/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
  projects: IProject[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  status: 'idle',
  error: null,
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const res = await fetch('http://localhost:3001/project/');

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (newProject: IProject, thunkAPI) => {
    try {
      const res = await fetch('http://localhost:3001/project/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) {
        throw new Error('Failed to create project');
      }

      return res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error || 'Failed to create project');
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<IProject[]>) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch projects';
      })
      .addCase(createProject.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action: PayloadAction<IProject>) => {
        state.status = 'succeeded';
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create project';
      });
  },
});

export default projectsSlice.reducer;