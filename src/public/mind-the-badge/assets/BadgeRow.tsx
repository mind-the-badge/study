import React from 'react';
import { Box } from '@mui/material';
import BinaryBadge from './badge-components/BinaryBadge';
import { BadgeData } from './BadgeInfoDrawer';
import { BiSolidInfoSquare } from "react-icons/bi";

interface BadgeRowProps {
  badges: BadgeData[];
  onBadgeClick: (badge: BadgeData) => void;
  selectedBadgeId: string | null;
}

const intentColorMap: Record<string, string> = {
  CONFIRMATION: 'success',
  INFORMATION: 'info',
  WARNING: 'warning',
};

const BadgeRow: React.FC<BadgeRowProps> = ({ badges, onBadgeClick, selectedBadgeId }) => (
  <Box
    sx={{
      mt: 2,
      display: 'flex',
      flexDirection: 'row',
      gap: '5px',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }}
  >
    {badges.map((badge, idx) => {
      const chipColor = intentColorMap[(badge.intent || '').toUpperCase()] || 'default';
      return (
      <Box
        key={badge.id || idx}
        onClick={() => onBadgeClick(badge)}
        sx={{
          cursor: 'pointer',
          border: badge.id === selectedBadgeId ? '2px solid #1976d2' : '2px solid transparent',
          borderRadius: 2,
          transition: 'border 0.2s',
        }}
      >
        <BinaryBadge
          badge={badge}
          size="medium"
          variant="filled"
            rightIconKey=''
            chipColor={chipColor}
        />
      </Box>
      );
    })}
  </Box>
);

export default BadgeRow;
