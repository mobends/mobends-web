import React from 'react';

export interface StylableProps {
    className?: string;
    style?: React.CSSProperties;
}

export interface WrapperProps extends StylableProps {
    children?: React.ReactNode|React.ReactNode[];
}