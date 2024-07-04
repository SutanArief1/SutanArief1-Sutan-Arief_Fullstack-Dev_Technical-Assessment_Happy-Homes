import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ModalAddActivity from './Modal/ModalAddActivity';
import ModalFilter from './Modal/ModalFilter';
import React from 'react';

const HeaderActivity = () => {
  const [open, setOpen] = React.useState(false);  
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Box sx={{ display: 'flex', borderBottom: 1, borderColor: 'divider', width: "100%", p: "10px" }}>
        <Box sx={{ mr: "50px" }}>
          <Typography fontWeight={"bold"} fontSize={"small"}>Nama Karyawan</Typography>
          <Typography>Sutan Arief</Typography>
        </Box>
        <Box>
          <Typography fontWeight={"bold"} fontSize={"small"}>Rate</Typography>
          <Typography>Rp12.000/jam</Typography>
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