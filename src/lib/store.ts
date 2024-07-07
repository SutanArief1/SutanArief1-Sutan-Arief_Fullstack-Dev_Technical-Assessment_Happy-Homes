import { configureStore } from '@reduxjs/toolkit'
import activityReducer from '@/lib/features/activity/activitySlice'
import projectsReducer from '@/lib/features/projects/projectsSlice'
import usersReducer from '@/lib/features/users/usersSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      activities: activityReducer,
      projects: projectsReducer,
      users: usersReducer
    }
  })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']