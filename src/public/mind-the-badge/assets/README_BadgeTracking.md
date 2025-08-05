# Badge Tracking Integration

This document explains how the custom badge tracking system integrates with the Revisit framework's data collection workflow.

## Overview

The badge tracking system automatically integrates with the framework's data collection system, ensuring that all badge interaction data is properly stored in the participant JSON files.

## Data Structure

When a participant interacts with badges, the following data is automatically stored in the JSON:

```json
{
  "answers": {
    "1_badges-global-warming-by-gas-and-source_2": {
      "answer": {
        "badgeStats": "{\"badge1\":{\"badgeName\":\"badge1\",\"clicks\":2,\"timeSpent\":1500}}",
        "totalBadgeClicks": 5,
        "totalBadgeTimeSpent": 3000,
        "badgeTrackingData": "{\"summary\":{\"totalInteractions\":10,\"totalClicks\":5,\"totalTimeSpent\":3000,\"totalTimeOnBadges\":3000,\"uniqueBadgesInteracted\":3},\"badgeStats\":{...},\"interactions\":[...],\"clickCounts\":{...},\"hoverStartTimes\":{...},\"drawerOpenTimes\":{...},\"sessionStartTime\":1754401470204,\"sessionEndTime\":1754401474133}",
        "badgeInteractions": "[{\"badgeId\":\"badge1\",\"badgeLabel\":\"badge1\",\"interactionType\":\"click\",\"timestamp\":1754401470204,\"coordinates\":[100,200]}]",
        "badgeClickCounts": "{\"badge1\":2,\"badge2\":3}",
        "totalTimeOnBadges": 3000,
        "badgeTrackingSummary": "{\"totalInteractions\":10,\"totalClicks\":5,\"totalTimeSpent\":3000,\"totalTimeOnBadges\":3000,\"uniqueBadgesInteracted\":3}"
      },
      "startTime": 1754401470204,
      "endTime": 1754401474133,
      "provenanceGraph": {...},
      "windowEvents": [...]
    }
  }
}
```

## Integration Points

### 1. Automatic Data Collection
- **setAnswer Integration**: The `StimuliWithBadge` component automatically calls `setAnswer` with tracking data
- **Periodic Saving**: Data is saved every 5 seconds to prevent data loss
- **Component Unmount**: Final data is saved when the component unmounts

### 2. Window Events Integration
- Badge clicks are automatically added to the framework's window events system
- This ensures compatibility with existing analysis tools

### 3. Provenance Integration
- The framework automatically handles provenance graphs
- All badge interactions are tracked in the provenance system

## Data Fields

### Basic Statistics
- `badgeStats`: JSON string of per-badge statistics (clicks, time spent)
- `totalBadgeClicks`: Total number of badge clicks
- `totalBadgeTimeSpent`: Total time spent on badges (milliseconds)

### Comprehensive Data
- `badgeTrackingData`: Complete tracking data including summary and detailed interactions
- `badgeInteractions`: Array of all badge interactions with timestamps
- `badgeClickCounts`: Click counts per badge
- `totalTimeOnBadges`: Total time spent on badges
- `badgeTrackingSummary`: Summary statistics for analysis

## Usage

The integration is automatic - no additional code changes are needed outside of the badge tracking components. The framework will:

1. **Collect Data**: Automatically collect all badge interactions
2. **Store Data**: Save data to Firebase/your storage backend
3. **Export Data**: Include badge tracking data in JSON exports
4. **Analyze Data**: Make data available in the analysis interface

## Analysis

The badge tracking data will appear in:
- **JSON Downloads**: All tracking data included in participant JSON files
- **CSV Exports**: Badge statistics included in tidy CSV exports
- **Analysis Interface**: Data available in the study analysis tabs

## Framework Compatibility

This integration works with all existing framework features:
- ✅ Data collection and storage
- ✅ JSON/CSV export
- ✅ Analysis tools
- ✅ Provenance tracking
- ✅ Window events
- ✅ Study configuration
- ✅ Participant management

No changes to the core framework are required - the badge tracking system is designed to work seamlessly with the existing data collection workflow. 