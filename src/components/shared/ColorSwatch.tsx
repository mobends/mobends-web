import React from 'react';
import classNames from 'classnames';
import { StylableProps } from './commonProps';

/* Styles */
import './ColorSwatch.scss';

export interface ColorSwatchProps extends StylableProps {
    color: string;
    onClick?: React.MouseEventHandler;
}

export function ColorSwatch(props: ColorSwatchProps) {
    return (
        <div
            className={classNames('ColorSwatch', props.className)}
            onClick={props.onClick}
        >
            <div className="ColorSwatch__inner" style={{
                backgroundColor: props.color,
            }} />
        </div>
    );
}