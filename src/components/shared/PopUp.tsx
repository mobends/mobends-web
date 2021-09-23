import './PopUp.scss';

import React from 'react';
import classNames from 'classnames';
import { WrapperProps } from './commonProps';
import { PanelBase } from './PanelBase';

interface PopUpProps extends WrapperProps {}

export function PopUp(props: PopUpProps) {
    return (
        <div className="PopUp">
            <PanelBase
                className={classNames('PopUp__window', props.className)}
                style={props.style}
            >
                {props.children}
            </PanelBase>
        </div>
    );
}