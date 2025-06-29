// BinaryBadge.jsx
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Box } from '@mui/material';
import BadgeBase from './BadgeBase';

const BinaryBadge = forwardRef(function BinaryBadge(
    { badge, leftIconKey, rightIconKey, ...otherProps },
    ref
) {
    const badgeRef = useRef(null);

    return (
        <div ref={badgeRef} style={{ display: 'inline-block' }}>
            <BadgeBase
                label={badge.label}
                description={badge.description}
                avatar={badge.avatar}
                intent={badge.intent}
                type={badge.type}
                leftIconKey={leftIconKey}
                rightIconKey={rightIconKey}
                {...otherProps}
            />
        </div>
    );
});

export default BinaryBadge; 