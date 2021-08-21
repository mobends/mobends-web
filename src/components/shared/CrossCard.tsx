import React from 'react';
import { WrapperProps } from './commonProps';
import classNames from 'classnames';

/* Styles */
import './CrossCard.scss';

export interface CrossCardTheme {
    contentColor: string;
    shadowColor: string;
    bgColor: string;
}

export interface CrossCardProps extends WrapperProps {
    theme?: CrossCardTheme;
}

export function CrossCard(props: CrossCardProps) {
    return (
        <div
            className={classNames('CrossCard', props.className)}
            style={{
                ...props.style,
                ['--CrossCard-color' as any]: props.theme?.contentColor,
                ['--CrossCard-shadow' as any]: props.theme?.shadowColor,
                ['--CrossCard-bg' as any]: props.theme?.bgColor,
            }}
        >
            {props.children}
        </div>
    );
}
