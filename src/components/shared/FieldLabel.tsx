import './FieldLabel.scss';

import React from 'react';
import classNames from 'classnames';
import { WrapperProps } from './commonProps';

export interface FieldLabelProps extends WrapperProps {
    label: string;
}

export function FieldLabel(props: FieldLabelProps) {
    return (
        <label
            className={classNames('FieldLabel', props.className)}
            style={props.style}
        >
            <p className="FieldLabel__label">{props.label}</p>
            {props.children}
        </label>
    );
}