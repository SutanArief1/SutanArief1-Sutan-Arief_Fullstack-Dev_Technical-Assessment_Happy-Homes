import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';

const HeaderActivity = () => {
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
          <Button variant="outlined" sx={{ bgcolor: "#F0F6FF", textTransform: "none", fontWeight: "bold" }} startIcon={<AddCircleOutlineRoundedIcon />}>Tambah Kegiatan</Button>
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
          <Button
            variant="outlined"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textTransform: 'none',
              fontWeight: 'bold',
              width: '50px',
              height: '50px',
              border: '1px solid #c4c4c4',
              borderRadius: "8px",
              minWidth: '0px',
            }}
          >
            <FilterListIcon sx={{ color: '#F15858' }} />
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default HeaderActivity