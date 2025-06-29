import React from 'react';
import { Avatar, Box, Chip, Tooltip } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { getMuiIcon } from "./utils/getIcon.js";
import { icon_intent_map, icon_scope_map } from "./utils/iconMappings.js";

interface BadgeBaseProps {
    label: string;
    description?: string;
    avatar?: any;
    intent?: string;
    type?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'filled' | 'outlined';
    leftIconKey?: string;
    rightIconKey?: string;
    chipColor?: string;
    chipSx?: any;
}

function mapChipSize(customSize: string) {
    switch (customSize) {
        case 'small':
            return { muiSize: 'small' as const, hideLabel: true };
        case 'medium':
            return { muiSize: 'small' as const, hideLabel: false };
        case 'large':
            return { muiSize: 'medium' as const, hideLabel: false };
        default:
            return { muiSize: 'medium' as const, hideLabel: false };
    }
}

function getAvatarElement(avatar: any): React.ReactElement | undefined {
    if (!avatar) return undefined;
    if (avatar.type === 'letter') return <Avatar>{avatar.value}</Avatar>;
    if (avatar.type === 'image') return <Avatar src={avatar.value} />;
    return undefined;
}

function resolveIcon(key: string, { intent, type }: { intent?: string; type?: string }, size: string) {
    if (key !== 'none') {
        let iconValue = "";
        if (key === 'iconIntent') {
            iconValue = icon_intent_map[intent || ''] || "";
        } else if (key === 'iconScope') {
            iconValue = icon_scope_map[type || ''] || "";
        }
        return iconValue ? getMuiIcon(iconValue, size) : null;
    }
    return null;
}

const BadgeBase: React.FC<BadgeBaseProps> = ({
    label,
    description = '',
    avatar,
    intent,
    type,
    size = 'medium',
    variant = 'filled',
    leftIconKey = 'iconIntent',
    rightIconKey = 'iconIntent',
    chipColor = 'default',
    chipSx = {},
}) => {
    const { muiSize, hideLabel } = mapChipSize(size);
    const leftIcon = resolveIcon(leftIconKey, { intent, type }, size);
    const rightIcon = resolveIcon(rightIconKey, { intent, type }, size);
    const displayLabel = hideLabel ? undefined : label;

    return (
        <Box>
            <Tooltip title={description}>
                <Chip
                    label={displayLabel}
                    size={muiSize}
                    variant={variant}
                    avatar={leftIconKey === 'avatar' ? getAvatarElement(avatar) : undefined}
                    icon={leftIconKey !== 'avatar' ? leftIcon || undefined : undefined}
                    deleteIcon={rightIcon || undefined}
                    onDelete={rightIcon ? (event) => {
                        // Prevent the default delete behavior
                        event.stopPropagation();
                        // You can add custom click handler here if needed
                    } : undefined}
                    clickable
                    color={chipColor as any}
                    sx={{
                        ...chipSx,
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
};

export default BadgeBase; 