import React, { useState, useEffect } from 'react';
import { Box, Drawer, Typography } from '@mui/material';
import BinaryBadge from './badge-components/BinaryBadge';
import { PREFIX } from '../../../utils/Prefix';
import { StimulusParams } from '../../../store/types';
import ReactMarkdown from 'react-markdown';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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
  descriptionPath?: string; // Added for markdown path
}

interface BadgeStimulusParams {
  imageSrc?: string;
  imageAlt?: string;
  badgeDataPath?: string;
  badgeDescriptionPath?: string;
}

const DEFAULT_BADGE_DATA_PATH = `${PREFIX}experiment-1-visualization-badges/assets/badge-data.json`;

// Helper to load markdown from a path
const useMarkdown = (path?: string) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!path) {
      setContent('');
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load markdown');
        return res.text();
      })
      .then(setContent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [path]);

  return { content, loading, error };
};

const StimuliWithBadge: React.FC<StimulusParams<BadgeStimulusParams>> = ({ parameters }) => {
  const imageSrc = parameters?.imageSrc;
  const imageAlt = parameters?.imageAlt || 'Visualization stimuli';
  const badgeDataPath = parameters?.badgeDataPath || DEFAULT_BADGE_DATA_PATH;
  const badgeDescriptionPath = parameters?.badgeDescriptionPath;

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

  // Badge Info Drawer as a subcomponent
  const BadgeInfoDrawer: React.FC<{ badge: BadgeData | null; open: boolean; onClose: () => void }> = ({ badge, open, onClose }) => {
    const { content, loading, error } = useMarkdown(badge?.descriptionPath);
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 420,
            maxWidth: '90vw',
            padding: 0,
            marginTop: 0,
            zIndex: 9999,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
            boxShadow: 6,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          },
        }}
      >
        <Box sx={{ width: '100%', p: 4, position: 'relative', minHeight: '100vh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, right: 16 }} aria-label="Close">
            <CloseIcon fontSize="large" />
          </IconButton>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
            {badge && badge.label}
          </Typography>
          <Box sx={{ flex: 1, mb: 3, fontSize: '1.1rem', color: 'text.primary', lineHeight: 1.7, overflow: 'auto' }}>
            {badge?.descriptionPath ? (
              loading ? <Typography>Loading...</Typography> :
              error ? <Typography color="error">{error}</Typography> :
              <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {badge && badge.description}
              </Typography>
            )}
          </Box>
          {/* Metadata section visually de-emphasized */}
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e7ef', color: 'text.secondary', fontSize: '0.95rem', opacity: 0.7 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.disabled', letterSpacing: 1, textTransform: 'uppercase' }}>
              Metadata
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Intent</Typography>
                <Typography variant="caption">{badge && badge.intent}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Type</Typography>
                <Typography variant="caption">{badge && badge.type}</Typography>
              </Box>
            </Box>
            {badge && badge.topics && badge.topics.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 600, mr: 1 }}>Topics:</Typography>
                {badge.topics.map((topic: string, idx: number) => (
                  <Box
                    key={idx}
                    sx={{
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      px: 1,
                      py: 0.2,
                      borderRadius: 1,
                      fontSize: '0.8rem',
                      fontWeight: 400,
                      letterSpacing: 0.2,
                      display: 'inline-block',
                    }}
                  >
                    #{topic}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    );
  };

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
      <BadgeInfoDrawer badge={selectedBadge} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </Box>
  );
};

export default StimuliWithBadge;
