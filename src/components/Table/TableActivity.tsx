"use client"

import { Box, Button, Typography } from "@mui/material"
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IActivity, ICalculation, IUser } from "@/types";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import { calculateTotalDuration, calculateTotalEarnings } from "./helper";
import { useAppDispatch } from "@/lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { getActivity } from "@/lib/features/activity/activitySlice";
dayjs.extend(duration)

// const deleteActivity = async (id: string) => {
//   try {
//     const res = await fetch(`http://localhost:3001/activities/${id}`, {
//       method: 'DELETE',
//     });

//     if (!res.ok) {
//       throw new Error('Failed to delete activity');
//     }

//     console.log('Activity deleted successfully');
//   } catch (error) {
//     console.error('Error deleting activity:', error);
//   }
// };

const columns: GridColDef[] = [
  { field: 'title_activity', headerName: 'Judul Kegiatan', width: 450 },
  { field: 'project_name', headerName: 'Nama Proyek', width: 200 },
  { field: 'start_date', headerName: 'Tanggal Mulai', width: 200, valueFormatter: (value) => dayjs(value).format('YYYY MMM DD') },
  { field: 'end_date', headerName: 'Tanggal Berakhir', width: 200, valueFormatter: (value) => dayjs(value).format('YYYY MMM DD') },
  { field: 'start_time', headerName: 'Waktu Mulai', width: 200, valueFormatter: (value) => dayjs(value).format('HH:mm') },
  { field: 'end_time', headerName: 'Waktu Berakhir', width: 200, valueFormatter: (value) => dayjs(value).format('HH:mm') },
  { field: 'duration', headerName: 'Durasi', width: 180 },
  {
    field: 'action',
    headerName: 'Aksi',
    width: 100,
    disableColumnMenu: true,
    hideSortIcons: true,
    renderCell: () => (
      <Box sx={{ display: "flex", gap: "10px", alignItems: "center", height: "100%" }}>
        <Button sx={{ color: "#F15858", padding: "0px", minWidth: "0px" }}>
          <DriveFileRenameOutlineOutlinedIcon />
        </Button>
        <Button sx={{ color: "#F15858", padding: "0px", minWidth: "0px" }}>
          <DeleteOutlineIcon />
        </Button>
      </Box>
    ),
  },
];

const formatDataForGrid = (data: ICalculation[]) => {
  return data.map((item) => ({
    ...item,
    start_time: item.start_date,
    end_time: item.end_date,
    project_name: item.project.project_name
  }));
};

const TableActivity = () => {
  // const dispatch = useAppDispatch();
  const activities = useSelector((state: RootState) => state.activities.activities);
  console.log(activities, 'ini actvitieswwwwwww');
  const [rows, setRows] = React.useState<ICalculation[]>([]);
  const [totalDuration, setTotalDuration] = React.useState<string>("");
  const [totalEarnings, setTotalEarnings] = React.useState<number>(0);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const formattedData = formatDataForGrid(activities);
        setRows(formattedData);
        setTotalDuration(calculateTotalDuration(activities));
        setTotalEarnings(calculateTotalEarnings(activities));
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [activities]);


  return (
    <Box>
      <Box style={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter={true}
          getRowId={(row) => row.id}
          autoHeight
        />
        <Box sx={{ backgroundColor: '#F7F8FB', px: 3, pb: 2 }}>
          <Box display="flex" justifyContent="space-between" >
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