import React, { useState, useEffect } from 'react';
import { Box, Drawer, Typography } from '@mui/material';
import BinaryBadge from './badge-components/BinaryBadge';
import { PREFIX } from '../../../utils/Prefix';
import { StimulusParams } from '../../../store/types';

// TypeScript types for badge data and props
interface BadgeData {
  badgeType: string;
  id: string;
  label: string;
  description: string;
  type: string;
  intent: string;
  topics: string[];
  link: string;
  avatar?: any;
  badgeName?: string;
}

interface BadgeStimulusParams {
  imageSrc?: string;
  imageAlt?: string;
  badgeDataPath?: string;
}

const DEFAULT_BADGE_DATA_PATH = `${PREFIX}experiment-1-visualization-badges/assets/badge-data.json`;

const StimuliWithBadge: React.FC<StimulusParams<BadgeStimulusParams>> = ({ parameters }) => {
  const imageSrc = parameters?.imageSrc;
  const imageAlt = parameters?.imageAlt || 'Visualization stimuli';
  const badgeDataPath = parameters?.badgeDataPath || DEFAULT_BADGE_DATA_PATH;

  const [badges, setBadges] = useState<BadgeData[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load badge data from JSON file
  useEffect(() => {
    fetch(badgeDataPath)
      .then((res) => res.json())
      .then((data) => {
        let loadedBadges: BadgeData[] = [];
        if (Array.isArray(data)) {
          loadedBadges = data;
        } else if (Array.isArray(data.badges)) {
          loadedBadges = data.badges;
        }
        setBadges(loadedBadges);
        console.log('[StimuliWithBadge] Loaded badges:', loadedBadges);
        if (loadedBadges.length === 0) {
          console.warn('[StimuliWithBadge] No badges found in badge data:', data);
        }
      })
      .catch((err) => {
        setBadges([]);
        console.error('[StimuliWithBadge] Error loading badge data:', err);
      });
  }, [badgeDataPath]);

  const handleBadgeClick = (badge: BadgeData) => {
    setSelectedBadge(badge);
    setIsDrawerOpen(true);
  };

  // Compute the correct image path
  let resolvedImageSrc = '';
  if (imageSrc) {
    resolvedImageSrc = imageSrc.startsWith('http') ? imageSrc : `${PREFIX}${imageSrc}`;
    console.log('[StimuliWithBadge] Resolved imageSrc:', resolvedImageSrc);
  } else {
    console.warn('[StimuliWithBadge] No imageSrc provided');
  }

  // Log when rendering badges
  useEffect(() => {
    if (badges.length > 0) {
      console.log('[StimuliWithBadge] Rendering badges:', badges.map(b => b.label));
    } else {
      console.warn('[StimuliWithBadge] Badge row is empty');
    }
  }, [badges]);

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      {/* Main stimuli image */}
      {resolvedImageSrc && (
        <img
          src={resolvedImageSrc}
          alt={imageAlt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      )}

      {/* Badges row at bottom right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'row',
          gap: '5px',
          alignItems: 'center',
        }}
      >
        {badges.map((badge, idx) => (
          <Box key={badge.id || idx} onClick={() => handleBadgeClick(badge)} sx={{ cursor: 'pointer' }}>
            <BinaryBadge
              badge={badge}
              size="medium"
              variant="filled"
              chipColor="primary"
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
            zIndex: 9999,
          },
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