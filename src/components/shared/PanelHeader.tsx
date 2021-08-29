import React from 'react';
import classNames from 'classnames';
import { WrapperProps } from './commonProps';
import './PanelHeader.scss';

export interface PanelHeaderProps extends WrapperProps {}

export function PanelHeader(props: PanelHeaderProps) {
    return (
        <div className={classNames('PanelHeader', props.className)} style={props.style}>
            {props.children}
        </div>
    );
}