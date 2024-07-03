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
    <Box sx={{ width: "100%", backgroundColor: "white", mt: "8px", height: "90vh" }}>
      <Box sx={{ ml: "30px"}}>
        <Typography fontWeight={"bold"} fontSize={"28px"}>HH Timesheet</Typography>
      </Box>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', pl: "50px" }}>
            <TabList onChange={handleChange} >
              <Tab label="Daftar Kegiatan" value="1" sx={{ textTransform: "none" }} />
              <Tab label="Pengaturan" value="2" sx={{ textTransform: "none" }} />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ backgroundColor: "#F7F8FB" }}>
            <Box>
              <Activity />
            </Box>
          </TabPanel>
          <TabPanel value="2" sx={{ backgroundColor: "#F7F8FB" }}>
            <Box display="flex" justifyContent="center" alignItems="center" py={15}>
              <Setting />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}

export default Homepage