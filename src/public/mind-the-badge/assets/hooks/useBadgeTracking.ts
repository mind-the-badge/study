import { useRef, useCallback, useEffect } from 'react';
import { useWindowEvents } from '../../../../store/hooks/useWindowEvents';
import { EventType } from '../../../../store/types';

export interface BadgeInteraction {
  badgeId: string;
  badgeLabel: string;
  interactionType: 'click' | 'hover_start' | 'hover_end' | 'drawer_open' | 'drawer_close';
  timestamp: number;
  coordinates?: [number, number];
  duration?: number; // for hover events
}

export interface BadgeTrackingData {
  interactions: BadgeInteraction[];
  hoverStartTimes: Record<string, number>;
  totalTimeOnBadges: number;
  badgeClickCounts: Record<string, number>;
  drawerOpenTimes: Record<string, number>;
}

export function useBadgeTracking() {
  const windowEvents = useWindowEvents();
  const trackingData = useRef<BadgeTrackingData>({
    interactions: [],
    hoverStartTimes: {},
    totalTimeOnBadges: 0,
    badgeClickCounts: {},
    drawerOpenTimes: {},
  });

  // Track badge click
  const trackBadgeClick = useCallback((badgeId: string, badgeLabel: string, coordinates?: [number, number]) => {
    const interaction: BadgeInteraction = {
      badgeId,
      badgeLabel,
      interactionType: 'click',
      timestamp: Date.now(),
      coordinates,
    };

    trackingData.current.interactions.push(interaction);
    
    // Update click count
    trackingData.current.badgeClickCounts[badgeId] = 
      (trackingData.current.badgeClickCounts[badgeId] || 0) + 1;

    // Add to window events for existing tracking system
    if (windowEvents && 'current' in windowEvents && windowEvents.current) {
      windowEvents.current.push([Date.now(), 'mousedown', coordinates || [0, 0]]);
      windowEvents.current.push([Date.now(), 'mouseup', coordinates || [0, 0]]);
    }

    console.log(`[BadgeTracking] Badge clicked: ${badgeLabel} (${badgeId})`);
  }, [windowEvents]);

  // Track hover start
  const trackHoverStart = useCallback((badgeId: string, badgeLabel: string) => {
    const timestamp = Date.now();
    trackingData.current.hoverStartTimes[badgeId] = timestamp;

    const interaction: BadgeInteraction = {
      badgeId,
      badgeLabel,
      interactionType: 'hover_start',
      timestamp,
    };

    trackingData.current.interactions.push(interaction);
    console.log(`[BadgeTracking] Hover started on: ${badgeLabel} (${badgeId})`);
  }, []);

  // Track hover end
  const trackHoverEnd = useCallback((badgeId: string, badgeLabel: string) => {
    const startTime = trackingData.current.hoverStartTimes[badgeId];
    if (startTime) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const interaction: BadgeInteraction = {
        badgeId,
        badgeLabel,
        interactionType: 'hover_end',
        timestamp: endTime,
        duration,
      };

      trackingData.current.interactions.push(interaction);
      trackingData.current.totalTimeOnBadges += duration;
      
      // Clean up start time
      delete trackingData.current.hoverStartTimes[badgeId];
      
      console.log(`[BadgeTracking] Hover ended on: ${badgeLabel} (${badgeId}) - Duration: ${duration}ms`);
    }
  }, []);

  // Track drawer open
  const trackDrawerOpen = useCallback((badgeId: string, badgeLabel: string) => {
    const timestamp = Date.now();
    trackingData.current.drawerOpenTimes[badgeId] = timestamp;

    const interaction: BadgeInteraction = {
      badgeId,
      badgeLabel,
      interactionType: 'drawer_open',
      timestamp,
    };

    trackingData.current.interactions.push(interaction);
    console.log(`[BadgeTracking] Drawer opened for: ${badgeLabel} (${badgeId})`);
  }, []);

  // Track drawer close
  const trackDrawerClose = useCallback((badgeId: string, badgeLabel: string) => {
    const startTime = trackingData.current.drawerOpenTimes[badgeId];
    if (startTime) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const interaction: BadgeInteraction = {
        badgeId,
        badgeLabel,
        interactionType: 'drawer_close',
        timestamp: endTime,
        duration,
      };

      trackingData.current.interactions.push(interaction);
      trackingData.current.totalTimeOnBadges += duration;
      
      // Clean up start time
      delete trackingData.current.drawerOpenTimes[badgeId];
      
      console.log(`[BadgeTracking] Drawer closed for: ${badgeLabel} (${badgeId}) - Duration: ${duration}ms`);
    }
  }, []);

  // Get tracking data
  const getTrackingData = useCallback(() => {
    return {
      ...trackingData.current,
      interactions: [...trackingData.current.interactions],
      hoverStartTimes: { ...trackingData.current.hoverStartTimes },
      badgeClickCounts: { ...trackingData.current.badgeClickCounts },
      drawerOpenTimes: { ...trackingData.current.drawerOpenTimes },
    };
  }, []);

  // Reset tracking data
  const resetTracking = useCallback(() => {
    trackingData.current = {
      interactions: [],
      hoverStartTimes: {},
      totalTimeOnBadges: 0,
      badgeClickCounts: {},
      drawerOpenTimes: {},
    };
  }, []);

  // Clean up any lingering hover times when component unmounts
  useEffect(() => {
    return () => {
      // End any ongoing hovers
      Object.keys(trackingData.current.hoverStartTimes).forEach(badgeId => {
        const startTime = trackingData.current.hoverStartTimes[badgeId];
        if (startTime) {
          const duration = Date.now() - startTime;
          trackingData.current.totalTimeOnBadges += duration;
        }
      });
    };
  }, []);

  return {
    trackBadgeClick,
    trackHoverStart,
    trackHoverEnd,
    trackDrawerOpen,
    trackDrawerClose,
    getTrackingData,
    resetTracking,
  };
} 