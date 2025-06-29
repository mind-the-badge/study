import React from "react";
import { CheckCircle, Info, Warning, DatasetOutlined, AnalyticsOutlined, BubbleChartOutlined, TouchAppOutlined, QueryStatsOutlined } from "@mui/icons-material";

export function getMuiIcon(iconName: string, size: string): React.ReactElement | null {
    if (!iconName) return null;

    const iconMap: { [key: string]: React.ComponentType<any> } = {
        'CheckCircle': CheckCircle,
        'Info': Info,
        'Warning': Warning,
        'DatasetOutlined': DatasetOutlined,
        'AnalyticsOutlined': AnalyticsOutlined,
        'BubbleChartOutlined': BubbleChartOutlined,
        'TouchAppOutlined': TouchAppOutlined,
        'QueryStatsOutlined': QueryStatsOutlined
    };

    const IconComponent = iconMap[iconName];
    if (!IconComponent) return null;

    return React.createElement(IconComponent, { fontSize: "small" });
} 