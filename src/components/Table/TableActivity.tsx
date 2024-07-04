"use client"

import { Box, Button, Typography } from "@mui/material"
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Row {
  id: number;
  title: string;
  projectName: string;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  duration: string;
}

const calculateTotalDuration = (rows: Row[]): string => {
  let totalMinutes = 0;
  rows.forEach(row => {
    const [hours, minutes] = row.duration.split(' ').filter(part => part !== 'jam' && part !== 'menit');
    totalMinutes += parseInt(hours) * 60 + (parseInt(minutes) || 0);
  });
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} jam ${minutes} menit`;
}


const calculateTotalEarnings = (rows: Row[], rate: number) => {
  let totalMinutes = 0;
  rows.forEach(row => {
    const [hours, minutes] = row.duration.split(' ').filter(part => part !== 'jam' && part !== 'menit');
    totalMinutes += parseInt(hours) * 60 + (parseInt(minutes) || 0);
  });
  const totalHours = totalMinutes / 60;
  return totalHours * rate;
}


const columns: GridColDef[] = [
  { field: 'title', headerName: 'Judul Kegiatan', width: 500 },
  { field: 'projectName', headerName: 'Nama Proyek', width: 200 },
  { field: 'startDate', headerName: 'Tanggal Mulai', width: 200 },
  { field: 'endDate', headerName: 'Tanggal Berakhir', type: 'string', width: 200 },
  { field: 'startHour', headerName: 'Waktu Mulai', type: 'string', width: 200 },
  { field: 'endHour', headerName: 'Waktu Berakhir', type: 'string', width: 200 },
  { field: 'duration', headerName: 'Durasi', type: 'string', width: 150 },
  {
    field: 'action',
    headerName: 'Aksi',
    width: 100,
    disableColumnMenu: true,
    hideSortIcons: true,
    renderCell: () => (
      <Box sx={{display: "flex", gap:"10px", alignItems: "center", height: "100%"}}>
        <Button sx={{ color: "#F15858", padding: "0px", minWidth: "0px"}}>
          <DriveFileRenameOutlineOutlinedIcon />
        </Button>
        <Button sx={{ color: "#F15858", padding: "0px", minWidth: "0px"}}>
          <DeleteOutlineIcon />
        </Button>
      </Box>
    ),
  },
];

const rows = [
  { id: 1, title: 'Kegiatan 1', projectName: 'Proyek 1', startDate: '2022-01-01', endDate: '2022-01-01', startHour: '2022-01-01T08:00:00', endHour: '2022-01-01T09:00:00', duration: '1 jam' },
  { id: 2, title: 'Kegiatan 2', projectName: 'Proyek 2', startDate: '2022-01-01', endDate: '2022-01-01', startHour: '2022-01-01T10:00:00', endHour: '2022-01-01T11:00:00', duration: '1 jam' },
  { id: 3, title: 'Kegiatan 3', projectName: 'Proyek 3', startDate: '2022-01-01', endDate: '2022-01-01', startHour: '2022-01-01T12:00:00', endHour: '2022-01-01T13:00:00', duration: '1 jam' },
  { id: 4, title: 'Kegiatan 3', projectName: 'Proyek 3', startDate: '2022-01-01', endDate: '2022-01-01', startHour: '2022-01-01T12:00:00', endHour: '2022-01-01T13:00:00', duration: '1 jam' },
];

const ratePerHour = 12000;

const TableActivity = () => {
  const totalDuration = calculateTotalDuration(rows);
  const totalEarnings = calculateTotalEarnings(rows, ratePerHour);

  return (
    <Box>
      <Box style={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter={true}
        />
        <Box sx={{ backgroundColor: '#F7F8FB', px: 3, pb: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" sx={{ marginTop: '20px', color: "#2775EC", fontSize: 'medium' }}>
              Total Durasi:
            </Typography>
            <Typography variant="h6" sx={{ marginTop: '20px', color: "#2775EC", fontSize: 'medium' }}>
              {totalDuration ? totalDuration : '-'}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" sx={{ marginTop: '20px', color: "#2775EC", fontWeight: 'bold' }}>
              Total Pendapatan:
            </Typography>
            <Typography variant="h6" sx={{ marginTop: '20px', color: "#2775EC", fontWeight: 'bold' }}>
              Rp{totalEarnings ? totalEarnings.toLocaleString('id-ID') : '-'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TableActivity