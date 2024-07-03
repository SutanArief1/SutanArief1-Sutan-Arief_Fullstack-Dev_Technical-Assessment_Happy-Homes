import { Box, Button, TextField, Typography } from "@mui/material"
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';

const Activity = () => {
  return (
    <Box sx={{ width: "98%", backgroundColor: "white", display: "flex", flexDirection: "column", py: "20px", px: "20px", borderRadius: "10px" }}>
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
          <Box>Daftar Kegiatan</Box>
          <Button variant="outlined" startIcon={<AddCircleOutlinedIcon />}>Tambah Kegiatan</Button>
        </Box>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
          <TextField />
          <Button startIcon={<FilterListIcon sx={{ color: "#F15858" }} />} />
        </Box>
      </Box>
    </Box>
  )
}

export default Activity