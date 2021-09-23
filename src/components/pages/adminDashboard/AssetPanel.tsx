/* Styles */
import './AssetPanel.scss';

import React, { useState } from 'react';
import classNames from 'classnames';
import { PanelBase } from '../../shared/PanelBase';
import { StylableProps } from '../../shared/commonProps';
import { AssetDefinition } from '../../../services/admin';
import { InputField } from '../../shared/InputField';
import { SpacedRow } from '../../shared/SpacedRow';
import { Button } from '../../shared/Button';
import { PopUp } from '../../shared/PopUp';

export interface AssetPanelProps extends StylableProps {
    definition: AssetDefinition;
    onChange(definition: AssetDefinition): void;
    onDelete(): void;
}

export function AssetPanel({definition, ...props}: AssetPanelProps) {

    const [deleting, setDeleting] = useState(false);

    const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange({
            ...definition,
            path: e.target.value,
        });
    };

    const handleTryDelete = (e: React.MouseEvent) => {
        setDeleting(true);
    };

    const handleCancelDelete = () => {
        setDeleting(false);
    };

    const handleConfirmDelete = () => {
        props.onDelete();
        setDeleting(false);
    };

    return (
        <PanelBase
            className={classNames('AssetPanel', props.className)}
            header={<h1>Id: {definition.id}</h1>}
            style={props.style}
        >
            <SpacedRow>
                <InputField value={definition.path} onChange={handlePathChange} />
                <Button onClick={handleTryDelete}>Delete</Button>
            </SpacedRow>
            {deleting ? (
                <PopUp>
                    <p>Are you sure you want to delete?</p>
                    <SpacedRow>
                        <Button onClick={handleCancelDelete}>Cancel</Button>
                        <Button onClick={handleConfirmDelete}>DELETE</Button>
                    </SpacedRow>
                </PopUp>
            ) : null}
        </PanelBase>
    );
}