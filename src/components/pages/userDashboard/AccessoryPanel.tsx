import React from 'react';
import { AccessorySettings } from '../../../services/dashboard';
import { PanelBase } from '../../shared/PanelBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

/* Styles */
import './AccessoryPanel.scss';
import { StylableProps } from '../../shared/commonProps';
import classNames from 'classnames';
import { ColorProperty } from './ColorProperty';

export interface AccessoryPanelProps extends StylableProps {
    accessoryKey: string;
    settings: AccessorySettings;
    onChange(settings: AccessorySettings): void;
}

export function PropertyWrapper({ label, children }: { label: string, children?: React.ReactElement }) {
    return (
        <div className="AccessoryPanel__property">
            <div className="AccessoryPanel__property__label">
                {label}
            </div>
            <div className="AccessoryPanel__property__contents">
                {children}
            </div>
        </div>
    );
}

export function AccessoryPanel({accessoryKey, settings, ...props}: AccessoryPanelProps) {
    const handleColorChange = (color: number) => {
        props.onChange({
            ...settings,
            color: color,
        });
    };

    return (
        <PanelBase
            className={classNames('AccessoryPanel', props.className, {
                'AccessoryPanel--locked': !settings.unlocked,
            })}
            header={(<>
                <h1>{settings.displayName}</h1>
                <FontAwesomeIcon className="AccessoryPanel__lockIcon" icon={settings.unlocked ? faLockOpen : faLock}></FontAwesomeIcon>
            </>)}
            style={{
                ...props.style,
                minWidth: '20rem',
            }}
        >
            <PropertyWrapper label="Color">
                <ColorProperty color={settings.color} onChange={handleColorChange} />
            </PropertyWrapper>
        </PanelBase>
    );
}