import React, { useEffect } from 'react';
import './PacksPage.scss';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/types';
import { PackListEntry } from './PackListEntry';
import { ApiService } from '../services/apiService';
import { setPacks, setError, startLoading } from '../store/action';

export function PacksPage() {
    const packs = useSelector((state: RootState) => state.packs);
    const packsList = useSelector((state: RootState) => state.packsList);
    const errorMessage = useSelector((state: RootState) => state.errorMessage);
    const dispatch = useDispatch();

    const packsElements = packsList.map(key => packs[key]).map(pack => {
        return <PackListEntry key={pack.id} name={pack.name} createdOn={pack.createdOn} likes={pack.likes} />;
    });

    useEffect(() => {
        dispatch(startLoading());

        ApiService.instance.getPacks().then(packs => {
            dispatch(setPacks(packs));
        }).catch(error => {
            dispatch(setError(`Couldn't establish a connection :(`));
        });
    }, [ dispatch ]);

    return (
        <div className="PacksPage">
            <div className="PackPage_error">{ errorMessage }</div>
            { packsElements }
        </div>
    );
}