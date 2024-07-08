import { Dayjs } from "dayjs";

export interface IFormData {
  startDate: Dayjs;
  endDate: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
  titleActivity: string;
  project: string;
}

export interface IActivity {
  id: string;
  start_date: string;
  end_date: string;
  title_activity: string;
  duration: string;
  project: IProject;
  user: IUser;
  projectId: number;
  userId: string;
}

export interface IProject {
  id: number;
  project_name: string;
}

export interface IUser {
  id: string;
  name: string;
  rate: number;
}

export interface ICalculation {
  start_date: string;
  end_date: string;
  title_activity: string;
  project: {
    project_name: string;
  }
  user: {
    rate: number;
  };
  duration: string;
}

export interface IModalAddActivityProps {
  open: boolean;
  handleClose: () => void;
}