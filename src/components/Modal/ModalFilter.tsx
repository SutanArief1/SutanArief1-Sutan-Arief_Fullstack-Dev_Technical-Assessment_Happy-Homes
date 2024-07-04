import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { Chip, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Theme, useTheme } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  borderRadius: "10px",
  p: 2,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'React Js',
  'Next Js',
  'Laravel',
  'Node Js',
  'Vue Js',
];

function getStyles(name: string, projectName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      projectName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function customChipLabel(label: string, labelOnClick: () => void) {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <IconButton size="small" onClick={(e) => {e.stopPropagation(); labelOnClick(); console.log('test')}}>
        
        <CloseIcon fontSize='small' />
      </IconButton>
      <Typography>{label}</Typography>
    </Stack>
  )
}

const ModalFilter = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [projectName, setProjectName] = React.useState<string[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent<typeof projectName>) => {
    const {
      target: { value },
    } = event;
    setProjectName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleClearFilter = () => {
    setProjectName([]);
  };

  const handleRemoveItem = (itemToRemove: string) => {
    const updatedProjects = projectName.filter((item) => item !== itemToRemove);
    console.log(updatedProjects, 'ini updated project');
    
    setProjectName(updatedProjects);
  };

  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textTransform: 'none',
          fontWeight: 'bold',
          width: '50px',
          height: '50px',
          border: '1px solid #c4c4c4',
          borderRadius: "8px",
          minWidth: '0px',
        }}
      >
        <FilterListIcon sx={{ color: '#F15858' }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between" alignItems="center" px={2} borderBottom="1px solid #c4c4c4">
            <Typography sx={{ fontWeight: 'bold' }}>
              Filter
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box p={2}>
            <InputLabel required sx={{ mb: 1, fontSize: 'small', '& .MuiFormLabel-asterisk': { color: '#F15858' } }}>Proyek</InputLabel>
            <Select
              multiple
              fullWidth
              value={projectName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={customChipLabel(value, () => handleRemoveItem(value))}
                      onClick={() => console.log('chip')}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, projectName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box display="flex" justifyContent="flex-end" p={2} gap={2}>
            <Button onClick={handleClearFilter} variant="text" sx={{ padding: '12px', color: '#F15858' }}>Hapus Filter</Button>
            <Button variant="contained" sx={{ padding: '16px', borderRadius: '10px', bgcolor: '#F15858' }}>Terapkan</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default ModalFilter