import * as Icons from "@mui/icons-material";
import React from "react";

export function getMuiIcon(iconName, size) {
    if (!iconName) return null;

    if (iconName === 'Info') {
        return React.createElement(Icons.Info, { fontSize: "small" });
    }

    if (!Icons[iconName]) return null;
    const IconComponent = Icons[iconName];
    return React.createElement(IconComponent, { fontSize: "small" });
} 