const current_theme = {
        palette: {
          background: {
            default: '#121212',
            dark: '#000000',
            light: '#FFFFFF',
          },
          primary: {
            main: '#1FB954',
          },
          secondary: {
            main: '#62D089',
            dark: '#457F59',
          },
          error: {
            main: '#F52735',
          },
          warning: {
            main: '#F52735',
          },
          info: {
            main: '#2C3A6C',
          },
          success: {
            main: '#09FE00',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#9FA0A1',
          },
        },
      };
      
      // Function to create a color legend element
      function createColorLegend(colorName, colorValue) {
        const legendContainer = document.createElement('div');
        legendContainer.classList.add('legend');
      
        // Create a color block element
        const colorBlock = document.createElement('div');
        colorBlock.style.backgroundColor = colorValue;
        colorBlock.style.width = '20px';
        colorBlock.style.height = '20px';
        colorBlock.classList.add('color-block');
      
        // Create a legend text element
        const legendText = document.createElement('span');
        legendText.textContent = `${colorName}: ${colorValue}`;
        legendText.classList.add('legend-text');
      
        // Append the color block and the legend text to the container
        legendContainer.appendChild(colorBlock);
        legendContainer.appendChild(legendText);
      
        return legendContainer;
      }
      
      // Get the container to display the legends
      const legendsContainer = document.getElementById('legends-container');
      
      // Iterate over each color in the palette and generate a legend
      Object.entries(current_theme.palette).forEach(([colorName, colorValue]) => {
        if (typeof colorValue === 'object') {
          Object.entries(colorValue).forEach(([shadeName, shadeValue]) => {
            const legend = createColorLegend(`${colorName}.${shadeName}`, shadeValue);
            legendsContainer.appendChild(legend);
          });
        } else {
          const legend = createColorLegend(colorName, colorValue);
          legendsContainer.appendChild(legend);
        }
      });