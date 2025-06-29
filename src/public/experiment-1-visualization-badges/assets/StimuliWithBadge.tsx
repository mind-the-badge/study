import React from 'react';
import { Box } from '@mui/material';
import BinaryBadge from './badge-components/BinaryBadge';

// Badge data for "Data Sources Disclosed"
const badgeData = {
  badgeType: "BINARY",
  id: "1",
  label: "Data Sources Disclosed",
  description: "Indicates that the data sources for this visualization are known and listed.",
  type: "DATA",
  intent: "CONFIRMATION",
  topics: ["Source"],
  link: ""
};

const StimuliWithBadge: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      {/* Main stimuli image */}
      <img 
        src="/experiment-1-visualization-badges/assets/sample-stimuli.png" 
        alt="Sample visualization stimuli"
        style={{ 
          width: '100%', 
          height: 'auto',
          display: 'block'
        }}
      />
      
      {/* Badge positioned at bottom right */}
      <Box sx={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        zIndex: 10
      }}>
        <BinaryBadge 
          badge={badgeData}
          size="medium"
          variant="filled"
          chipColor="primary"
        />
      </Box>
    </Box>
  );
};

export default StimuliWithBadge; 