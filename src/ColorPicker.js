import React, { useState } from 'react';
import { ThemeProvider } from "@mui/material";
import { SketchPicker } from 'react-color';
import defaultTheme from "./defaultTheme";
import { Typography, Button } from '@mui/material';
import { Modal } from '@mui/material';

const ColorPicker = ({ label, color, theme, onChange }) => {
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);

  const handleColorPickerOpen = () => {
    setColorPickerOpen(true);
  };

  const handleColorPickerClose = () => {
    setColorPickerOpen(false);
  };

  const handleChangeComplete = (selectedColor) => {
    onChange(selectedColor);
    // handleColorPickerClose(); // Uncomment this line if you want the color picker to close automatically
  };

  return (
    <ThemeProvider theme={theme || defaultTheme}>
      <div className='customDiv'>
        <Typography component="body1" variant="body1" color="textSecondary" className="centerAligned" gutterBottom>
          {label}:
        </Typography>
        <div
          style={{
            backgroundColor: color,
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            borderStyle: "solid",
            borderWidth: "5px",
            borderColor: "white",
          }}
          onClick={(e) => {
            e.stopPropagation(); // Stop the event from propagating to parent elements
            handleColorPickerOpen();
          }}
        />
        <Modal open={isColorPickerOpen} onClose={handleColorPickerClose}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
            <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
            <Button onClick={handleColorPickerClose}>Close</Button>
          </div>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default ColorPicker;