import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'

const Setting = () => {
  return (
    <Box sx={{ width: "30%", padding: "50px", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={3} sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Typography mb={2}>Nama Karyawan</Typography>
          <TextField id="outlined-basic" placeholder="Nama Karyawan" variant="outlined" InputLabelProps={{ shrink: false }} sx={{ width: "100%" }} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography mb={2}>Rate</Typography>
          <TextField id="rate" InputLabelProps={{ shrink: false }} sx={{ width: "100%" }}
            InputProps={{ startAdornment: <InputAdornment position="start">Rp</InputAdornment>, endAdornment: <InputAdornment position="end">/Jam</InputAdornment>, inputProps: { min: 0 } }}
          />
        </Box>
        <Box display={'flex'} justifyContent={'space-between'} sx={{width: "100%"}}>
          <Button variant="outlined" sx={{width: "48%", height: "45px", textTransform: "none", borderRadius: "8px"}}>Batalkan</Button>
          <Button variant="contained" sx={{width: "48%", textTransform: "none", borderRadius: "8px"}}>Simpan</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Setting