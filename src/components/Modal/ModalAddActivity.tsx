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
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/id';
import ModalAddProject from './ModalAddProject';
dayjs.locale('id');

interface IFormData {
  startDate: Dayjs;
  endDate: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
  titleActivity: string;
  project: string;
}

interface IModalAddActivityProps {
  open: boolean;
  handleClose: () => void;
}

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

const ModalAddActivity: React.FC<IModalAddActivityProps> = ({ open, handleClose }) => {
  const [formData, setFormData] = React.useState({
    startDate: dayjs(),
    endDate: dayjs(),
    startTime: dayjs().startOf('day'),
    endTime: dayjs().startOf('day'),
    titleActivity: '',
    project: '',
  });

  const [openModalProject, setOpenModalProject] = React.useState(false);

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

  const handleSave = () => {
    console.log('Tanggal Mulai:', formData.startDate.format('DD MM YYYY'));
    console.log('Tanggal Berakhir:', formData.endDate.format('DD MM YYYY'));
    console.log('Jam Mulai:', formData.startDate.format('HH:mm'));
    console.log('Jam Berakhir:', formData.endDate.format('HH:mm'));
    console.log('Judul Kegiatan:', formData.titleActivity);
    console.log('Nama Proyek:', formData.project);
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
                names.map((project, index) => (
                  <MenuItem key={index} value={project}>
                    {project}
                  </MenuItem>
                ))
              }
            </Select>
          </Box>
          <Box display="flex" justifyContent="flex-end" p={2} gap={2}>
            <Button onClick={handleClose} variant="text" sx={{ padding: '12px', color: '#F15858' }}>Kembali</Button>
            <Button onClick={handleSave} variant="contained" sx={{ padding: '16px', borderRadius: '10px', bgcolor: '#F15858' }}>Simpan</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default ModalAddActivity