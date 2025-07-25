import React, { useState, useEffect } from 'react';
import { Box, Drawer, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import BadgeInfoDrawer from './BadgeInfoDrawer';
import type { BadgeData } from './BadgeInfoDrawer';
import BadgeRow from './BadgeRow';
import { PREFIX } from '../../../utils/Prefix';
import { StimulusParams } from '../../../store/types';

interface BadgeStimulusParams {
  imageSrc?: string;
  imageAlt?: string;
  badgeDataPath?: string;
}

const StimuliWithBadge: React.FC<StimulusParams<BadgeStimulusParams>> = ({ parameters }) => {
  const imageSrc = parameters?.imageSrc;
  const imageAlt = parameters?.imageAlt || 'Visualization stimuli';
  const badgeDataPath = parameters?.badgeDataPath;

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
      console.log('[StimuliWithBadge] Rendering badges:', badges.map((b) => b.label));
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

      {/* Badges row below the image */}
      <BadgeRow badges={badges} onBadgeClick={handleBadgeClick} selectedBadgeId={selectedBadge?.id || null} />

      {/* Badge Information Panel */}
      <BadgeInfoDrawer badge={selectedBadge} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </Box>
  );
};

export default StimuliWithBadge;
