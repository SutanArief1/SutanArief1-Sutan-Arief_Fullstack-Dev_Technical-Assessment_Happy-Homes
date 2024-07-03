import { Box, Typography } from "@mui/material"

const Navbar = () => {
  return (
    <Box sx={{ width: "100%", height: "75px", px: "20px", display: "flex", alignItems: "center", backgroundColor: "white"}}>
      <Box sx={{ width: "8%"}}>
        <Typography textAlign={"center"} color={"#F15858"} fontWeight={"bold"}>Timesheet Management</Typography>
      </Box>
    </Box>
  )
}

export default Navbar