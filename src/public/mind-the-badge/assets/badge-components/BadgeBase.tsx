import React from 'react';
import { Avatar, Box, Chip, Tooltip } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { getMuiIcon } from "./utils/getIcon";
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

    console.info('[BadgeBase] intent:', intent, 'type:', type, 'leftIconKey:', leftIconKey, 'rightIconKey:', rightIconKey);
    console.info('[BadgeBase] leftIcon:', leftIcon, 'rightIcon:', rightIcon);

    return (
        <Box>
            <Tooltip 
                title={description}
                arrow
                placement="top"
                sx={{
                    '& .MuiTooltip-tooltip': {
                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        lineHeight: 1.4,
                        padding: '8px 12px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                        maxWidth: '280px',
                        textAlign: 'center',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontFamily: '"Apfel Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        '& .MuiTooltip-arrow': {
                            color: 'rgba(0, 0, 0, 0.87)',
                        },
                    },
                }}
                componentsProps={{
                    tooltip: {
                        sx: {
                            animation: 'fadeIn 0.2s ease-out',
                            '@keyframes fadeIn': {
                                '0%': {
                                    opacity: 0,
                                    transform: 'translateY(4px)',
                                },
                                '100%': {
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                },
                            },
                        },
                    },
                }}
            >
                <Chip
                    label={displayLabel}
                    size={muiSize}
                    variant={variant}
                    icon={leftIconKey !== 'avatar' ? leftIcon || undefined : undefined}
                    deleteIcon={rightIcon || undefined}
                    onDelete={rightIcon ? (event) => {
                        event.stopPropagation();
                    } : undefined}
                    clickable
                    color={chipColor as any}
                    sx={{
                        ...chipSx,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        },
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
