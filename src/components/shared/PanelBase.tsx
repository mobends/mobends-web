import classNames from 'classnames';
import React from 'react';
import { WrapperProps } from './commonProps';
import './PanelBase.scss';

export interface PanelBaseProps extends WrapperProps {
    header?: React.ReactElement;
}

export function PanelBase(props: PanelBaseProps) {
    return (
        <div className={classNames('PanelBase', props.className)} style={props.style}>
            <div className={classNames('PanelBase__header')}>
                {props.header}
            </div>
            {props.children}
        </div>
    );
}