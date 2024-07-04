"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

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

const ModalAddActivity = () => {
  const [formData, setFormData] = React.useState({
    startDate: dayjs(),
    endDate: dayjs(),
    startTime: dayjs().startOf('day'),
    endTime: dayjs().startOf('day'),
    titleActivity: '',
    project: '',
  });
  
  console.log(formData);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      project: event.target.value,
    }));
  };

  const handleChangeTitleActivity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      titleActivity: event.target.value,
    }));
  };

  const handleAddProject = () => {
    alert('Tambah Proyek baru');
  };

  const handleSave = () => {
    console.log('Tanggal Mulai:', formData.startDate.format('DD MM YYYY'));
    console.log('Tanggal Berakhir:', formData.endDate.format('DD MM YYYY'));
    console.log('Jam Mulai:', formData.startTime.format('HH:mm'));
    console.log('Jam Berakhir:', formData.endTime.format('HH:mm'));
    console.log('Judul Kegiatan:', formData.titleActivity);
    console.log('Nama Proyek:', formData.project);
  };

  return (
    <Box>
      <Button onClick={handleOpen} variant="outlined" sx={{ bgcolor: "#F0F6FF", textTransform: "none", fontWeight: "bold" }} startIcon={<AddCircleOutlineRoundedIcon />}>Tambah Kegiatan</Button>
      <Modal
        open={open}
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
              <InputLabel id="outlined-basic" required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Tanggal Mulai</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='id'>
                <DatePicker
                  slots={{ textField: TextField }}
                  format="DD MMM YYYY"
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ width: "25%" }}>
              <InputLabel id="outlined-basic" required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Tanggal Berakhir</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='id'>
                <DatePicker
                  slots={{ textField: TextField }}
                  format="DD MMM YYYY"
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ width: "25%" }}>
              <InputLabel id="outlined-basic" required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Jam Mulai</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='id'>
                <TimePicker
                  slots={{ textField: TextField }}
                  ampm={false}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ width: "25%" }}>
              <InputLabel id="outlined-basic" required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Jam Berakhir</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='id'>
                <TimePicker
                  slots={{ textField: TextField }}
                  ampm={false}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box p={2}>
            <InputLabel required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Judul Kegiatan</InputLabel>
            <TextField name="titleActivity" fullWidth InputLabelProps={{ shrink: false }} onChange={handleChangeTitleActivity} />
          </Box>
          <Box p={2}>
            <InputLabel required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Nama Proyek</InputLabel>
            <Select
              fullWidth
              name='project'
              inputProps={{ 'aria-label': 'Without label' }}
              onChange={handleChange}
            >
              <MenuItem>
                <Button
                  onClick={handleAddProject}
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