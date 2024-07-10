"use client"

import { Box, Button, Typography } from "@mui/material"
import { useAppDispatch } from "@/lib/hooks";
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IActivity, ICalculation, IUser } from "@/types";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import { calculateTotalDuration, calculateTotalEarnings } from "./helper";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { deleteActivity, fetchActivities } from "@/lib/features/activity/activitySlice";
dayjs.extend(duration)

const TableActivity = () => {
  const dispatch = useAppDispatch();
  const activities = useSelector((state: RootState) => state.activities.activities);
  const [formatData, setFormatData] = React.useState<ICalculation[]>([]);
  const [totalDuration, setTotalDuration] = React.useState<string>("");
  const [totalEarnings, setTotalEarnings] = React.useState<number>(0);  

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteActivity(id));
      dispatch(fetchActivities());
      console.log("Delete activity with id:", id);
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  };
  
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
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center", height: "100%" }}>
          <Button sx={{ color: "#F15858", padding: "0px", minWidth: "0px" }}>
            <DriveFileRenameOutlineOutlinedIcon />
          </Button>
          <Button sx={{ color: "#F15858", padding: "0px", minWidth: "0px" }} onClick={() => { handleDelete(params.row.id) }}>
            <DeleteOutlineIcon />
          </Button>
        </Box>
      ),
    },
  ];
  
  const formatDataForGrid = (data: IActivity[]) => {
    return data.map((item) => ({
      ...item,
      start_time: item.start_date,
      end_time: item.end_date,
      project_name: item.project ? item.project.project_name : 'Project tidak tersedia'
    }));
  };

  React.useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  React.useEffect(() => {
    if (activities.length > 0) {
      const formatted = formatDataForGrid(activities);
      setFormatData(formatted);
      setTotalDuration(calculateTotalDuration(activities));
      setTotalEarnings(calculateTotalEarnings(activities));
    }
  }, [activities]);

  return (
    <Box>
      <Box style={{ width: '100%' }}>
        <DataGrid
          rows={formatData}
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