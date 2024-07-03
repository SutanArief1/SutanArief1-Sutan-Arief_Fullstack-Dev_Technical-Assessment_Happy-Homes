import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'

const Setting = () => {
  return (
    <Box sx={{ width: "40%", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", py: "50px", borderRadius: "10px" }}>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={5} sx={{ width: "80%" }}>
        <Box sx={{ width: "70%" }}>
          <Typography fontWeight={"bold"} mb={2}>Nama Karyawan</Typography>
          <TextField id="outlined-basic" label="Nama Karyawan" variant="outlined" InputLabelProps={{ shrink: false }} sx={{ width: "100%" }} />
        </Box>
        <Box sx={{ width: "70%" }}>
          <Typography fontWeight={"bold"} mb={2}>Rate</Typography>
          <TextField id="rate" InputLabelProps={{ shrink: false }} sx={{ width: "100%" }}
            InputProps={{ startAdornment: <InputAdornment position="start">Rp</InputAdornment>, endAdornment: <InputAdornment position="end">/Jam</InputAdornment>, inputProps: { min: 0 } }}
          />
        </Box>
        <Box display={'flex'} justifyContent={'space-between'} sx={{width: "70%"}}>
        <Button variant="outlined" sx={{width: "48%"}}>Batalkan</Button>
        <Button variant="contained" sx={{width: "48%"}}>Simpan</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Setting