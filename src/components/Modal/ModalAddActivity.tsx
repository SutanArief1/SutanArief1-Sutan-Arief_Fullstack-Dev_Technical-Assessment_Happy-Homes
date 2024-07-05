"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/id';
import ModalAddProject from './ModalAddProject';
import { IActivity, IFormData, IModalAddActivityProps, IProject } from '@/types';
dayjs.locale('id');
dayjs.extend(duration);

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  borderRadius: "10px",
  p: 2,
};

const names = [
  'React Js',
  'Next Js',
  'Laravel',
  'Node Js',
  'Vue Js',
];

async function createData(newActivity: IActivity) {
  try {
    const res = await fetch('http://localhost:3001/activity/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newActivity),
    })

    console.log(res);

    if (!res.ok) {
      throw new Error('Failed to post data')
    }

    return res.json()
  } catch (error) {
    console.error(error)
  }
}

async function fetchProjects() {
  const res = await fetch('http://localhost:3001/project/')

  if (!res.ok) {
    throw new Error('Failed to fetch projects')
  }

  return res.json()
}

const ModalAddActivity: React.FC<IModalAddActivityProps> = ({ open, handleClose }) => {
  const [rows, setRows] = React.useState<IActivity[]>([]);
  const [projects, setProjects] = React.useState<IProject[]>([]);
  const [userId, setUserId] = React.useState('');

  async function fetchData() {
    try {
      const res = await fetch('http://localhost:3001/users/user');

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setUserId(data.id);
    } catch (error) {
      console.error('Error fetching latest user:', error);
    }
  }

  const [formData, setFormData] = React.useState({
    startDate: dayjs(),
    endDate: dayjs(),
    startTime: dayjs().startOf('day'),
    endTime: dayjs().startOf('day'),
    titleActivity: '',
    project: '',
  });

  const [openModalProject, setOpenModalProject] = React.useState(false);

  React.useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    getProjects();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      project: event.target.value,
    }));
  };

  const handleDateChange = (field: string) => (date: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleTimeChange = <T extends keyof IFormData>(field: T) => (time: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof prev[field] === 'string' ? dayjs() : prev[field].hour(time.hour()).minute(time.minute()),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedProject = projects.find(project => project.id === Number(formData.project));

    const newActivity: IActivity = {
      start_date: formData.startDate.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      end_date: formData.endDate.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      title_activity: formData.titleActivity,
      projectId: selectedProject ? selectedProject.id : 0,
      userId: userId,
    };

    try {
      const data = await createData(newActivity);
      setRows([...rows, data]);
      setFormData({
        startDate: dayjs(),
        endDate: dayjs(),
        startTime: dayjs().startOf('day'),
        endTime: dayjs().startOf('day'),
        titleActivity: '',
        project: '',
      });
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <Box>
      <ModalAddProject open={openModalProject} handleClose={() => setOpenModalProject(false)} />
      <Modal
        open={!openModalProject && open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between" alignItems="center" px={2} borderBottom="1px solid #c4c4c4">
            <Typography sx={{ fontWeight: 'bold' }}>
              Tambah Kegiatan Baru
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box p={2} display="flex" gap={2}>
              <Box sx={{ width: "25%" }}>
                <InputLabel required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Tanggal Mulai</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='id'>
                  <DatePicker
                    value={formData.startDate}
                    onChange={handleDateChange('startDate')}
                    slots={{ textField: TextField }}
                    format="DD MMM YYYY"
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ width: "25%" }}>
                <InputLabel required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Tanggal Berakhir</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='id'>
                  <DatePicker
                    value={formData.endDate}
                    onChange={handleDateChange('endDate')}
                    slots={{ textField: TextField }}
                    format="DD MMM YYYY"
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ width: "25%" }}>
                <InputLabel required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Jam Mulai</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='id'>
                  <TimePicker
                    value={formData.startTime}
                    onChange={handleTimeChange('startDate')}
                    slots={{ textField: TextField }}
                    ampm={false}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ width: "25%" }}>
                <InputLabel required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Jam Berakhir</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='id'>
                  <TimePicker
                    value={formData.endTime}
                    onChange={handleTimeChange('endDate')}
                    slots={{ textField: TextField }}
                    ampm={false}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box p={2}>
              <InputLabel required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Judul Kegiatan</InputLabel>
              <TextField name="titleActivity" fullWidth InputLabelProps={{ shrink: false }} onChange={(e) => setFormData(prev => ({ ...prev, titleActivity: e.target.value }))} />
            </Box>
            <Box p={2}>
              <InputLabel required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Nama Proyek</InputLabel>
              <Select
                fullWidth
                name='project'
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={handleChange}
                value={formData.project}
              >
                <MenuItem>
                  <Button
                    onClick={() => setOpenModalProject(true)}
                    fullWidth
                    sx={{ justifyContent: 'left', p: 0 }}
                  >
                    <Typography sx={{ color: '#F15858', textTransform: 'none' }}>
                      + Tambah Proyek
                    </Typography>
                  </Button>
                </MenuItem>
                {
                  projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.project_name}
                    </MenuItem>
                  ))
                }
              </Select>
            </Box>
            <Box display="flex" justifyContent="flex-end" p={2} gap={2}>
              <Button onClick={handleClose} variant="text" sx={{ padding: '12px', color: '#F15858' }}>Kembali</Button>
              <Button type='submit' variant="contained" sx={{ padding: '16px', borderRadius: '10px', bgcolor: '#F15858' }}>Simpan</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  )
}

export default ModalAddActivity