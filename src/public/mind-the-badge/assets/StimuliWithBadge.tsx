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
import { useBadgeTracking } from './hooks/useBadgeTracking';
import { BadgeTrackingDisplay } from './components/BadgeTrackingDisplay';

interface BadgeStimulusParams {
  imageSrc?: string;
  detailedInformation?: string;
  }

const StimuliWithBadge: React.FC<StimulusParams<BadgeStimulusParams>> = ({ parameters, setAnswer }) => {
  const imageSrc = parameters?.imageSrc;
  const imageAlt = 'Visualization stimuli';
  const detailedInformation = parameters?.detailedInformation;

  const [badges, setBadges] = useState<BadgeData[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showTrackingDebug, setShowTrackingDebug] = useState(false);

  // Initialize badge tracking
  const {
    trackBadgeClick,
    trackHoverStart,
    trackHoverEnd,
    trackDrawerOpen,
    trackDrawerClose,
    getTrackingData,
    getSimplifiedTrackingData,
    getComprehensiveTrackingData,
  } = useBadgeTracking();

  // Load badge data from JSON file
  useEffect(() => {
    if (!detailedInformation) {
      console.warn('[StimuliWithBadge] No detailedInformation path provided');
      return;
    }
    
    // Resolve the path for both local and deployed environments
    let resolvedPath = detailedInformation;
    if (!detailedInformation.startsWith('http')) {
      // Remove leading slash if present to avoid double slashes
      const cleanPath = detailedInformation.startsWith('/') ? detailedInformation.slice(1) : detailedInformation;
      resolvedPath = `${PREFIX}${cleanPath}`;
    }
    
    console.log('[StimuliWithBadge] Fetching badge data from:', resolvedPath);
    
    fetch(resolvedPath)
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
  }, [detailedInformation]);

  const handleBadgeClick = (badge: BadgeData, coordinates?: [number, number]) => {
    // Track the badge click
    trackBadgeClick(badge.id, badge.label, coordinates);
    
    setSelectedBadge(badge);
    setIsDrawerOpen(true);
    
    // Track drawer open
    trackDrawerOpen(badge.id, badge.label);
  };

  // Extract base path from detailedInformation for relative markdown links
  const getBasePath = () => {
    if (!detailedInformation) return undefined;
    // Remove the filename and get the directory path
    const lastSlashIndex = detailedInformation.lastIndexOf('/');
    if (lastSlashIndex === -1) return undefined;
    return detailedInformation.substring(0, lastSlashIndex);
  };

  // Compute the correct image path
  let resolvedImageSrc = '';
  if (imageSrc) {
    if (imageSrc.startsWith('http')) {
      resolvedImageSrc = imageSrc;
    } else {
      // Remove leading slash if present to avoid double slashes
      const cleanPath = imageSrc.startsWith('/') ? imageSrc.slice(1) : imageSrc;
      resolvedImageSrc = `${PREFIX}${cleanPath}`;
    }
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

  // Save tracking data to answers when component unmounts or when requested
  useEffect(() => {
    return () => {
      const simplifiedData = getSimplifiedTrackingData();
      const comprehensiveData = getComprehensiveTrackingData();
      
      // Always save tracking data, even if no interactions occurred
      setAnswer({
        status: true,
        answers: {
          badgeStats: JSON.stringify(simplifiedData.badgeStats),
          totalBadgeClicks: simplifiedData.totalClicks,
          totalBadgeTimeSpent: simplifiedData.totalTimeSpent,
          // Add comprehensive tracking data
          badgeTrackingData: JSON.stringify(comprehensiveData),
          badgeInteractions: JSON.stringify(comprehensiveData.interactions),
          badgeClickCounts: JSON.stringify(comprehensiveData.clickCounts),
          totalTimeOnBadges: comprehensiveData.summary.totalTimeOnBadges,
          // Add summary statistics
          badgeTrackingSummary: JSON.stringify(comprehensiveData.summary),
        },
      });
    };
  }, [getSimplifiedTrackingData, getComprehensiveTrackingData, setAnswer]);

  // Also save tracking data periodically to ensure we don't lose data
  useEffect(() => {
    const interval = setInterval(() => {
      const simplifiedData = getSimplifiedTrackingData();
      const comprehensiveData = getComprehensiveTrackingData();
      
      // Only save if there's actual tracking data
      if (simplifiedData.totalClicks > 0 || simplifiedData.totalTimeSpent > 0) {
        setAnswer({
          status: true,
          answers: {
            badgeStats: JSON.stringify(simplifiedData.badgeStats),
            totalBadgeClicks: simplifiedData.totalClicks,
            totalBadgeTimeSpent: simplifiedData.totalTimeSpent,
            // Add comprehensive tracking data
            badgeTrackingData: JSON.stringify(comprehensiveData),
            badgeInteractions: JSON.stringify(comprehensiveData.interactions),
            badgeClickCounts: JSON.stringify(comprehensiveData.clickCounts),
            totalTimeOnBadges: comprehensiveData.summary.totalTimeOnBadges,
            // Add summary statistics
            badgeTrackingSummary: JSON.stringify(comprehensiveData.summary),
          },
        });
      }
    }, 5000); // Save every 5 seconds

    return () => clearInterval(interval);
  }, [getSimplifiedTrackingData, getComprehensiveTrackingData, setAnswer]);

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
      <BadgeRow 
        badges={badges} 
        onBadgeClick={handleBadgeClick} 
        selectedBadgeId={selectedBadge?.id || null}
        onBadgeHoverStart={trackHoverStart}
        onBadgeHoverEnd={trackHoverEnd}
      />

      {/* Badge Information Panel */}
      <BadgeInfoDrawer
        badge={selectedBadge}
        open={isDrawerOpen}
        onClose={() => {
          if (selectedBadge) {
            trackDrawerClose(selectedBadge.id, selectedBadge.label);
          }
          setIsDrawerOpen(false);
        }}
        basePath={getBasePath()}
      />

      {/* Debug tracking display (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <Box sx={{ position: 'fixed', bottom: 10, left: 10, zIndex: 1000 }}>
          <button 
            onClick={() => setShowTrackingDebug(!showTrackingDebug)}
            style={{ 
              padding: '8px 12px', 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {showTrackingDebug ? 'Hide' : 'Show'} Tracking
          </button>
          {showTrackingDebug && (
            <BadgeTrackingDisplay 
              trackingData={getSimplifiedTrackingData()} 
              showDetails={true} 
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default StimuliWithBadge;
