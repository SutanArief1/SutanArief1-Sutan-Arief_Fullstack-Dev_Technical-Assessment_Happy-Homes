import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModalAddActivity from './Modal/ModalAddActivity';
import ModalFilter from './Modal/ModalFilter';
import React, { useEffect, useState } from 'react';

const HeaderActivity = () => {
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [rate, setRate] = useState(0);
  const handleOpen = () => setOpen(true);

  async function fetchData() {
    try {
      const res = await fetch('http://localhost:3001/users/user');

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setUserId(data.id);
      setEmployeeName(data.name);
      setRate(data.rate);
    } catch (error) {
      console.error('Error fetching latest user:', error);
    }
  }

  async function deleteUser(userId: string) {
    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete user');
      }

      setEmployeeName('');
      setRate(0);
      setUserId('');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [employeeName]);

  return (
    <>
      <Box sx={{ display: 'flex', borderBottom: 1, borderColor: 'divider', width: "100%", p: "10px" }}>
        <Box sx={{ mr: "50px" }}>
          <Typography fontWeight={"bold"} fontSize={"small"}>Nama Karyawan</Typography>
          <Typography>{employeeName}
            {employeeName && (
              <IconButton onClick={() => deleteUser(userId)}>
                <HighlightOffIcon />
              </IconButton>
            )}
          </Typography>
        </Box>
        <Box>
          <Typography fontWeight={"bold"} fontSize={"small"}>Rate</Typography>
          <Typography>{`Rp ${rate} /jam`}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", p: "10px", mt: "20px" }}>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
          <Typography fontWeight={"bold"}>Daftar Kegiatan</Typography>
          <Button onClick={handleOpen} variant="outlined" sx={{ bgcolor: "#F0F6FF", textTransform: "none", fontWeight: "bold" }} startIcon={<AddCircleOutlineRoundedIcon />}>
            Tambah Kegiatan
          </Button>
          <ModalAddActivity open={open} handleClose={() => setOpen(false)} />
        </Box>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
          <TextField
            id="search"
            placeholder={`Search`}
            variant="outlined"
            sx={{
              width: "300px", '& .MuiOutlinedInput-root': {
                height: '50px',
                borderRadius: '8px',
              }
            }}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <ModalFilter />
        </Box>
      </Box>
    </>
  )
}

export default HeaderActivity