import React, { useState } from 'react';
import { ThemeProvider } from "@mui/material";
import { SketchPicker } from 'react-color';
import defaultTheme from "./defaultTheme";
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
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
    handleColorPickerClose();
  };

  return (
        <ThemeProvider theme={theme || defaultTheme}>
                <div>
                <Typography component="subtitle1" variant="subtitle1" color="textSecondary" className="centerAligned" gutterBottom>
                        {label}
                </Typography>
                <div
                        style={{
                        backgroundColor: color,
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        }}
                        onClick={handleColorPickerOpen}
                />
                <Modal open={isColorPickerOpen} onClose={handleColorPickerClose}>
                        <div>
                        <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
                        </div>
                </Modal>
                </div>
        </ThemeProvider>
  );
};

export default ColorPicker;