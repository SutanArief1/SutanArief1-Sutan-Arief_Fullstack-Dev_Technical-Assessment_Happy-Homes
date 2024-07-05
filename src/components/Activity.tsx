import TableActivity from "./Table/TableActivity";
import HeaderActivity from "./HeaderActivity";
import { Box } from "@mui/material";

const Activity = () => {
  return (
    <Box sx={{ width: "98%", backgroundColor: "white", display: "flex", flexDirection: "column", py: "20px", px: "20px", borderRadius: "10px" }}>
        <HeaderActivity />
        <TableActivity />
    </Box>
  )
}

export default Activity