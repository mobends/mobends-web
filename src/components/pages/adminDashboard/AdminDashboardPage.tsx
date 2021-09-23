import React, { useEffect, useMemo } from 'react';
import { useUpdatableResource } from '../../../networking/updatableResource';
import { CrossCard } from '../../shared/CrossCard';
import { Button } from '../../shared/Button';
import { Loader } from '../../shared/Loader';

/* Styles */
import './AdminDashboardPage.scss';
import { ADD_ASSET, AssetManifest, ASSET_MANIFEST, DELETE_ASSET, SET_ASSET_MANIFEST } from '../../../services/admin';
import { API_ENDPOINT } from '../../../services/apiService';
import { AdminDashboard } from './AdminDashboard';
import { useLoadingState, useTask } from '../../../networking/tasks';

export function AdminDashboardPage() {
    const assetLoadingState = useLoadingState();
    const addAssetTaskAction = useTask(assetLoadingState, ADD_ASSET);
    const deleteAssetTaskAction = useTask(assetLoadingState, DELETE_ASSET);

    const [assetManifest, updateAssetManifest, assetManifestLoading] = useUpdatableResource(ASSET_MANIFEST, SET_ASSET_MANIFEST);

    const loading = useMemo(() => {
        return assetManifestLoading || assetLoadingState.loading;
    }, [assetManifestLoading, assetLoadingState.loading]);

    const submitAssetManifest = (manifest: AssetManifest) => {
        updateAssetManifest(manifest);
    };

    const submitNewAsset = async (path: string) => {
        await addAssetTaskAction(path);
        ASSET_MANIFEST.markDirty();
        await ASSET_MANIFEST.get();
    };

    const deleteAsset = async (assetId: number) => {
        await deleteAssetTaskAction(assetId);
        ASSET_MANIFEST.markDirty();
        await ASSET_MANIFEST.get();
    };

    let contents;
    if (assetManifest === undefined) {
        contents = null;
    }
    else if (assetManifest.authenticated) {
        contents = (<AdminDashboard
            assetManifest={assetManifest.manifest}
            onAssetManifestChange={submitAssetManifest}
            onAddAsset={submitNewAsset}
            onDeleteAsset={deleteAsset}
        />);
    }
    else {
        contents = (
            <CrossCard className="AdminDashboardPage__loginCard" theme={{
                contentColor: '#fff',
                shadowColor: '#0467a0',
                bgColor: '#169cb4',
            }}>
                <h1>DASHBOARD</h1>
            <p>
                    Log in through <b>Discord</b> to configure your accessories!
                </p>
                <Button link={`${API_ENDPOINT}/auth/discord`}>Login</Button>
            </CrossCard>
        );
    }

    return (
        <div className="AdminDashboardPage">
            {contents}
            {loading && (
                <div className="AdminDashboardPage__loader">
                    <Loader />
                </div>
            )}
        </div>
    );
}
