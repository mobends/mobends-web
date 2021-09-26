/* Styles */
import './AdminDashboard.scss';

import React, { useEffect, useState } from 'react';
import { Button } from '../../shared/Button';
import { StylableProps } from '../../shared/commonProps';
import { AssetDefinition, AssetManifest } from '../../../services/admin';
import { AssetPanel } from './AssetPanel';
import { PanelBase } from '../../shared/PanelBase';
import { InputField } from '../../shared/InputField';
import { SpacedRow } from '../../shared/SpacedRow';

export interface AdminDashboardProps extends StylableProps {
    assetManifest: AssetManifest;
    onAssetManifestChange(manifest: AssetManifest): void;
    onAddAsset(path: string): void;
    onDeleteAsset(assetId: number): void;
}

export function AdminDashboard(props: AdminDashboardProps) {
    const [localAssetManifest, setLocalAssetManifest] = useState<AssetManifest>(props.assetManifest);
    const [assetManifestDirty, setAssetManifestDirty] = useState(false);

    const [newAssetPath, setNewAssetPath] = useState('');

    useEffect(() => {
        setLocalAssetManifest(props.assetManifest);
    }, [props.assetManifest]);

    const handleManifestChange = (assetIndex: number, definition: AssetDefinition) => {
        const newArray = localAssetManifest.assets.slice();
        newArray[assetIndex] = definition;

        setLocalAssetManifest(old => ({
            ...old,
            assets: newArray,
        }));
        setAssetManifestDirty(true);
    };

    const saveAssetManifest = () => {
        props.onAssetManifestChange(localAssetManifest);
        setAssetManifestDirty(false);
    };

    const handleAddAsset = () => {
        props.onAddAsset(newAssetPath);
        setNewAssetPath('');
    };

    return (
        <div className="AdminDashboard">
            <h1>Welcome to the Admin Dashboard</h1>
            <h1>Assets</h1>
            {localAssetManifest.assets.map((asset, index) => (
                <AssetPanel
                    key={asset.id}
                    definition={asset}
                    onChange={(definition) => handleManifestChange(index, definition)}
                    onDelete={() => props.onDeleteAsset(asset.id)}
                />
            ))}
            <PanelBase header={
                <h1>Add asset</h1>
            }>
                <SpacedRow>
                    <InputField value={newAssetPath} onChange={(e) => {setNewAssetPath(e.target.value)}} />
                    <Button onClick={handleAddAsset}>Add</Button>
                </SpacedRow>
            </PanelBase>
            {assetManifestDirty && (<>
                <div>You have unsaved changes</div>
                <Button onClick={saveAssetManifest}>Save changes</Button>
            </>)}
        </div>
    );
}
