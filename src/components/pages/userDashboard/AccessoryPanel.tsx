import React from 'react';
import classNames from 'classnames';
import { AccessorySettings } from '../../../services/dashboard';
import { PanelBase } from '../../shared/PanelBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { StylableProps } from '../../shared/commonProps';
import { ColorProperty } from './ColorProperty';
import { AccessoryDetails } from '../../../services/apiService';
import { ToggleSwitch } from '../../shared/ToggleSwitch';

/* Styles */
import './AccessoryPanel.scss';

export interface AccessoryPanelProps extends StylableProps {
    accessoryKey: string;
    details: AccessoryDetails;
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

export function AccessoryPanel({accessoryKey, details, settings, ...props}: AccessoryPanelProps) {
    const handleColorChange = (color: number) => {
        props.onChange({
            ...settings,
            color: color,
        });
    };

    const handleVisibleToggle = () => {
        props.onChange({
            ...settings,
            hidden: !settings.hidden,
        })
    };

    return (
        <PanelBase
            className={classNames('AccessoryPanel', props.className, {
                'AccessoryPanel--locked': !settings.unlocked,
            })}
            header={(<>
                <FontAwesomeIcon className="AccessoryPanel__lockIcon" icon={settings.unlocked ? faLockOpen : faLock}></FontAwesomeIcon>
                <h1>{details.displayName}</h1>
                <ToggleSwitch checked={!settings.hidden} onClick={handleVisibleToggle}></ToggleSwitch>
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