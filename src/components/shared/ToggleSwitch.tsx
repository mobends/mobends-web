import classNames from 'classnames';
import React from 'react';
import './ToggleSwitch.scss';

export interface ToggleSwitchProps {
    checked: boolean;
    onClick?: React.MouseEventHandler;
}

export function ToggleSwitch({ checked, onClick }: ToggleSwitchProps) {
    return (
        <label className={classNames('ToggleSwitch', {
            'ToggleSwitch--checked': checked,
        })}>
            <div className='ToggleSwitch__inner' />
            <div className='ToggleSwitch__labels'>
                <span>OFF</span>
                <span>ON</span>
            </div>
            <input
                hidden
                type='checkbox'
                checked={checked}
                onClick={onClick}
            />
        </label>
    );
}