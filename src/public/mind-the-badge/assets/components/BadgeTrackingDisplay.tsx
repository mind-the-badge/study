import React from 'react';
import { Box, Typography, Chip, Paper } from '@mui/material';
import { BadgeTrackingData } from '../hooks/useBadgeTracking';

interface BadgeTrackingDisplayProps {
  trackingData: BadgeTrackingData;
  showDetails?: boolean;
}

export function BadgeTrackingDisplay({ trackingData, showDetails = false }: BadgeTrackingDisplayProps) {
  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const totalInteractions = trackingData.interactions.length;
  const totalClicks = Object.values(trackingData.badgeClickCounts).reduce((sum, count) => sum + count, 0);
  const totalHoverTime = trackingData.totalTimeOnBadges;

  return (
    <Paper elevation={2} sx={{ p: 2, m: 2, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Badge Tracking Summary
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Chip 
          label={`${totalInteractions} interactions`} 
          color="primary" 
          size="small" 
        />
        <Chip 
          label={`${totalClicks} clicks`} 
          color="secondary" 
          size="small" 
        />
        <Chip 
          label={`${formatDuration(totalHoverTime)} hover time`} 
          color="info" 
          size="small" 
        />
      </Box>

      {showDetails && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Click Counts by Badge:
          </Typography>
          {Object.entries(trackingData.badgeClickCounts).map(([badgeId, count]) => (
            <Chip 
              key={badgeId}
              label={`${badgeId}: ${count}`} 
              size="small" 
              sx={{ mr: 1, mb: 1 }}
            />
          ))}

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
            Recent Interactions:
          </Typography>
          <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
            {trackingData.interactions.slice(-10).map((interaction, index) => (
              <Box key={index} sx={{ mb: 1, fontSize: '0.8rem' }}>
                <Typography variant="caption" color="textSecondary">
                  {new Date(interaction.timestamp).toLocaleTimeString()}
                </Typography>
                <Typography variant="body2">
                  {interaction.badgeLabel} - {interaction.interactionType}
                  {interaction.duration && ` (${formatDuration(interaction.duration)})`}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
} 