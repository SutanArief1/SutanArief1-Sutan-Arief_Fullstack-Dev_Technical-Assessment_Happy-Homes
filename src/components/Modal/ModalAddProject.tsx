import * as React from 'react';
import { Box, Button, IconButton, InputLabel, Modal, TextField, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { createProject } from '@/lib/features/projects/projectsSlice';
import { IProject } from '@/types';

interface IModalAddProjectProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  borderRadius: "10px",
  p: 2,
};

const ModalAddProject: React.FC<IModalAddProjectProps> = ({ open, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [projectName, setProjectName] = React.useState('');
  const { status, error } = useSelector((state: RootState) => state.projects);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newProject: IProject = {
      project_name: projectName
    };

    try {
      const resultAction = dispatch(createProject(newProject));
      if (createProject.fulfilled.match(resultAction)) {
        handleClose();
      }
    } catch (error) {
      console.error('Failed to save the project: ', error);
    }
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between" alignItems="center" px={2} borderBottom="1px solid #c4c4c4">
            <Typography sx={{ fontWeight: 'bold' }}>
              Tambah Proyek Baru
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box p={2}>
              <InputLabel required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Nama Proyek</InputLabel>
              <TextField fullWidth sx={{ borderRadius: '10px' }} value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </Box>
            <Box display="flex" justifyContent="flex-end" p={2} gap={2}>
              <Button onClick={handleClose} variant="text" sx={{ padding: '12px', color: '#F15858' }}>Kembali</Button>
              <Button type='submit' variant="contained" sx={{ padding: '16px', borderRadius: '10px', bgcolor: '#F15858' }} disabled={status === 'loading'}>
                {status === 'loading' ? 'Loading...' : 'Simpan'}
              </Button>
            </Box>
            {status === 'failed' && <Typography color="error">{error}</Typography>}
          </form>
        </Box>
      </Modal>
    </Box>
  )
}

export default ModalAddProject