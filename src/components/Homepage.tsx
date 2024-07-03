"use client"

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab, Typography } from "@mui/material"
import React from "react";
import Setting from "./Setting";
import Activity from "./Activity";

const Homepage = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: "100%", padding: "20px", backgroundColor: "white", mt: "8px" }}>
      <Box>
        <Typography fontWeight={"bold"} fontSize={"28px"}>HH Timesheet</Typography>
      </Box>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Daftar Kegiatan" value="1" />
            <Tab label="Pengaturan" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{backgroundColor: "#F7F8FB", display: "flex"}}><Activity /></TabPanel>
        <TabPanel value="2" sx={{backgroundColor: "#F7F8FB", display: "flex", justifyContent: "center", alignItems: "center", height: "70vh"}}><Setting /></TabPanel>
      </TabContext>
    </Box>
    </Box>
  )
}

export default Homepage