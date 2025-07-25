import React from 'react';
import { Box, Drawer, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import useMarkdown from './useMarkdown';

export interface BadgeData {
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
  descriptionPath?: string;
}

interface BadgeInfoDrawerProps {
  badge: BadgeData | null;
  open: boolean;
  onClose: () => void;
}

const BadgeInfoDrawer: React.FC<BadgeInfoDrawerProps> = ({ badge, open, onClose }) => {
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

export default BadgeInfoDrawer; 