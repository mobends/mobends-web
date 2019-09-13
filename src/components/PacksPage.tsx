import React from 'react';
import './PacksPage.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { PackListEntry } from './PackListEntry';

export function PacksPage() {
    const packs = useSelector((state: RootState) => state.packs);
    const packsList = useSelector((state: RootState) => state.packsList);

    const packsElements = packsList.map(key => packs[key]).map(pack => {
        return <PackListEntry name={pack.name} />;
    });

    return (
        <div className='PacksPage'>
            { packsElements }
        </div>
    );
}