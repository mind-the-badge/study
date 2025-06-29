// BadgeBase.jsx
import React from 'react';
import { Avatar, Box, Chip, Tooltip } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { getMuiIcon } from "./utils/getIcon";
import { icon_intent_map, icon_scope_map } from "./utils/iconMappings";

function mapChipSize(customSize) {
    switch (customSize) {
        case 'small':
            return { muiSize: 'small', hideLabel: true };
        case 'medium':
            return { muiSize: 'small', hideLabel: false };
        case 'large':
            return { muiSize: 'medium', hideLabel: false };
        default:
            return { muiSize: 'medium', hideLabel: false };
    }
}

function getAvatarElement(avatar) {
    if (!avatar) return null;
    if (avatar.type === 'letter') return <Avatar>{avatar.value}</Avatar>;
    if (avatar.type === 'image') return <Avatar src={avatar.value} />;
    return null;
}

function resolveIcon(key, { intent, type }, size) {
    if (key !== 'none') {
        let iconValue = "";
        if (key === 'iconIntent') {
            iconValue = icon_intent_map[intent] || "";
        } else if (key === 'iconScope') {
            iconValue = icon_scope_map[type] || "";
        }
        return iconValue ? getMuiIcon(iconValue, size) : null;
    }
    return null;
}

export default function BadgeBase({
                                      label,
                                      description = '',
                                      avatar,
                                      intent, // now comes from badge.intent
                                      type,   // now comes from badge.type
                                      size = 'medium',
                                      variant = 'filled',
                                      leftIconKey = 'iconIntent',
                                      rightIconKey = 'iconIntent',
                                      chipColor = 'default',
                                      chipSx = {},
                                  }) {
    const { muiSize, hideLabel } = mapChipSize(size);
    const leftIcon = resolveIcon(leftIconKey, { intent, type }, size);
    const rightIcon = resolveIcon(rightIconKey, { intent, type }, size);
    // Instead of an empty string, use undefined when hideLabel is true.
    const displayLabel = hideLabel ? undefined : label;

    return (
        <Box>
            <Tooltip title={description}>
                <Chip
                    label={displayLabel}
                    size={muiSize}
                    variant={variant}
                    avatar={leftIconKey === 'avatar' ? getAvatarElement(avatar) : null}
                    icon={leftIconKey !== 'avatar' ? leftIcon : null}
                    deleteIcon={rightIcon}
                    onDelete={rightIcon ? () => {} : undefined}
                    clickable
                    color={chipColor}
                    sx={{
                        ...chipSx,
                        // IN CASE OF MINI: Remove extra padding and icon margins.
                        ...(hideLabel && {
                            pl: 0,
                            pr: 0,
                            minWidth: 26,
                            '& .MuiChip-label': { display: 'none' },
                            '& .MuiChip-icon': { marginLeft: 0, marginRight: 0 },
                        }),
                    }}
                />
            </Tooltip>
        </Box>
    );
} 