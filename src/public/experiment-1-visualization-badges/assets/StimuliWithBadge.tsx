import React, { useState } from 'react';
import { Box, Drawer, Typography } from '@mui/material';
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
      
      {/* Badge positioned at bottom right */}
      <Box sx={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        zIndex: 10
      }}>
        <Box onClick={() => handleBadgeClick(badgeData)} sx={{ cursor: 'pointer' }}>
          <BinaryBadge 
            badge={badgeData}
            size="medium"
            variant="filled"
            chipColor="primary"
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

export default StimuliWithBadge; 