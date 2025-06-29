import React, { useState } from 'react';
import { Box, Drawer, Typography, Chip } from '@mui/material';
import { PREFIX } from '../../../utils/Prefix';

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
    description: "The methodology used in this visualization has been verified by experts.",
    type: "ANALYSIS",
    intent: "CONFIRMATION",
    topics: ["Methodology"],
    link: ""
  },
  {
    badgeType: "BINARY",
    id: "3",
    label: "Peer Reviewed",
    description: "This visualization has undergone peer review.",
    type: "ANALYSIS",
    intent: "CONFIRMATION",
    topics: ["Review"],
    link: ""
  },
  {
    badgeType: "BINARY",
    id: "4",
    label: "Interactive Features",
    description: "This visualization includes interactive features for exploration.",
    type: "INTERACTION",
    intent: "INFORMATION",
    topics: ["Interaction"],
    link: ""
  },
  {
    badgeType: "BINARY",
    id: "5",
    label: "Context Provided",
    description: "Additional context and background information is provided.",
    type: "CONTEXT",
    intent: "INFORMATION",
    topics: ["Context"],
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
        src={`${PREFIX}experiment-1-visualization-badges/assets/sample-stimuli.png`}
        alt="Sample visualization stimuli"
        style={{ 
          width: '100%', 
          height: 'auto',
          display: 'block'
        }}
      />
      
      {/* Multiple badges positioned at bottom right */}
      <Box sx={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        zIndex: 10,
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        justifyContent: 'flex-end'
      }}>
        {badgeData.map((badge, index) => (
          <Box key={badge.id} onClick={() => handleBadgeClick(badge)} sx={{ cursor: 'pointer' }}>
            <Chip
              label={badge.label}
              size="small"
              color="primary"
              variant="filled"
              sx={{
                fontSize: '10px',
                height: '24px',
                '& .MuiChip-label': {
                  px: 1,
                  fontSize: '10px'
                }
              }}
            />
          </Box>
        ))}
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