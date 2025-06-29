import React from 'react';
import { Box } from '@mui/material';
import BinaryBadge from './badge-components/BinaryBadge';

// Badge data for multiple badges
const badgeData = [
  {
    badgeType: "BINARY",
    id: "1",
    label: "Data Sources Disclosed",
    description: "Indicates that the data sources for this visualization are known and listed.",
    type: "DATA",
    intent: "CONFIRMATION",
    topics: ["Source"],
    link: ""
  },
  {
    badgeType: "BINARY",
    id: "2",
    label: "Methodology Verified",
    description: "The methodology used in this visualization has been verified.",
    type: "METHOD",
    intent: "CONFIRMATION",
    topics: ["Method"],
    link: ""
  },
  {
    badgeType: "BINARY",
    id: "3",
    label: "Peer Reviewed",
    description: "This visualization has undergone peer review.",
    type: "QUALITY",
    intent: "CONFIRMATION",
    topics: ["Quality"],
    link: ""
  },
  {
    badgeType: "BINARY",
    id: "4",
    label: "Updated Recently",
    description: "This visualization has been updated within the last 30 days.",
    type: "TIME",
    intent: "CONFIRMATION",
    topics: ["Time"],
    link: ""
  },
  {
    badgeType: "BINARY",
    id: "5",
    label: "Accessible Design",
    description: "This visualization follows accessibility guidelines.",
    type: "ACCESS",
    intent: "CONFIRMATION",
    topics: ["Accessibility"],
    link: ""
  }
];

const StimuliWithMultipleBadges: React.FC = () => {
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
      
      {/* Badge container in bottom right */}
      <Box sx={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
        alignItems: 'center'
      }}>
        {/* Badge 1 */}
        <BinaryBadge 
          badge={badgeData[0]}
          size="medium"
          variant="filled"
          chipColor="primary"
        />
        
        {/* Badge 2 */}
        <BinaryBadge 
          badge={badgeData[1]}
          size="medium"
          variant="filled"
          chipColor="secondary"
        />
        
        {/* Badge 3 */}
        <BinaryBadge 
          badge={badgeData[2]}
          size="medium"
          variant="filled"
          chipColor="success"
        />
        
        {/* Badge 4 */}
        <BinaryBadge 
          badge={badgeData[3]}
          size="medium"
          variant="filled"
          chipColor="warning"
        />
        
        {/* Badge 5 */}
        <BinaryBadge 
          badge={badgeData[4]}
          size="medium"
          variant="filled"
          chipColor="error"
        />
      </Box>
    </Box>
  );
};

export default StimuliWithMultipleBadges; 