import React from 'react';
import classNames from 'classnames';
import { WrapperProps } from './commonProps';
import './SpacedRow.scss';

export interface SpacedRowProps extends WrapperProps {
    spacing?: string;
}

export function SpacedRow(props: SpacedRowProps) {
    return (
        <div className={classNames('SpacedRow', props.className)} style={{
            ['--SpacedRow-spacing' as any]: props.spacing || '0.5rem',
        }}>
            {props.children}
        </div>
    );
}