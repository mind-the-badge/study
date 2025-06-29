import React, { useState } from 'react';
import { Box, Drawer, Typography } from '@mui/material';
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
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleBadgeClick = (badge: any) => {
    setSelectedBadge(badge);
    setIsDrawerOpen(true);
  };

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
        <Box onClick={() => handleBadgeClick(badgeData[0])} sx={{ cursor: 'pointer' }}>
          <BinaryBadge 
            badge={badgeData[0]}
            size="medium"
            variant="filled"
            chipColor="primary"
          />
        </Box>
        
        {/* Badge 2 */}
        <Box onClick={() => handleBadgeClick(badgeData[1])} sx={{ cursor: 'pointer' }}>
          <BinaryBadge 
            badge={badgeData[1]}
            size="medium"
            variant="filled"
            chipColor="secondary"
          />
        </Box>
        
        {/* Badge 3 */}
        <Box onClick={() => handleBadgeClick(badgeData[2])} sx={{ cursor: 'pointer' }}>
          <BinaryBadge 
            badge={badgeData[2]}
            size="medium"
            variant="filled"
            chipColor="success"
          />
        </Box>
        
        {/* Badge 4 */}
        <Box onClick={() => handleBadgeClick(badgeData[3])} sx={{ cursor: 'pointer' }}>
          <BinaryBadge 
            badge={badgeData[3]}
            size="medium"
            variant="filled"
            chipColor="warning"
          />
        </Box>
        
        {/* Badge 5 */}
        <Box onClick={() => handleBadgeClick(badgeData[4])} sx={{ cursor: 'pointer' }}>
          <BinaryBadge 
            badge={badgeData[4]}
            size="medium"
            variant="filled"
            chipColor="error"
          />
        </Box>
      </Box>

      {/* Badge Information Panel */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            padding: 2,
            marginTop: 8,
            zIndex: 9999
          }
        }}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {selectedBadge && selectedBadge.label}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {selectedBadge && selectedBadge.description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Intent
            </Typography>
            <Typography variant="body1">
              {selectedBadge && selectedBadge.intent}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Type
            </Typography>
            <Typography variant="body1">
              {selectedBadge && selectedBadge.type}
            </Typography>
          </Box>
          {selectedBadge && selectedBadge.topics && selectedBadge.topics.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Topics
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedBadge.topics.map((topic: string, idx: number) => (
                  <Box
                    key={idx}
                    sx={{
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                    }}
                  >
                    #{topic}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default StimuliWithMultipleBadges; 