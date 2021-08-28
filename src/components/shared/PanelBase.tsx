import classNames from 'classnames';
import React from 'react';
import { WrapperProps } from './commonProps';
import './PanelBase.scss';

export interface PanelBaseProps extends WrapperProps {}

export function PanelBase(props: PanelBaseProps) {
    return (
        <div className={classNames('PanelBase', props.className)} style={props.style}>
            {props.children}
        </div>
    );
}