import React, { FormEvent, useState } from 'react';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';

interface SettingProps {
  setValue: (value: string) => void;
}

const Setting: React.FC<SettingProps> = ({ setValue }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    rate: '',
  });

  async function createData() {
    try {
      const rateNumber = Number(formData.rate);
      const res = await fetch('http://localhost:3001/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, rate: rateNumber }),
      })

      console.log(res);

      if (!res.ok) {
        throw new Error('Failed to post data')
      }

      return res.json()
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await createData();
      if (data) {
        setValue('1');
      }

      return data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ width: "30%", padding: "50px", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={3} sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Typography mb={2}>Nama Karyawan</Typography>
            <TextField id="outlined-basic"
              placeholder="Nama Karyawan"
              variant="outlined"
              InputLabelProps={{ shrink: false }}
              sx={{ width: "100%" }}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography mb={2}>Rate</Typography>
            <TextField id="rate" InputLabelProps={{ shrink: false }} sx={{ width: "100%" }}
              InputProps={{
                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                endAdornment: <InputAdornment position="end">/Jam</InputAdornment>,
                inputProps: { min: 0 }
              }}
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
            />
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} sx={{ width: "100%" }}>
            <Button variant="outlined" sx={{ width: "48%", height: "45px", textTransform: "none", borderRadius: "8px" }}>Batalkan</Button>
            <Button variant="contained" type='submit' sx={{ width: "48%", textTransform: "none", borderRadius: "8px" }}>Simpan</Button>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default Setting