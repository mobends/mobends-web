import React from 'react';
import './EditorPage.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { ActiveUserCount } from '../services/apiService';
import { createTask, useResources } from '../services/resource';


const editorPageTask = createTask('EDITOR_PAGE_TASK', {
    activeUserCount: ActiveUserCount
});

export function EditorPage() {
    const errorMessage = useSelector((state: RootState) => state.errorMessage);

    const resources = useResources(editorPageTask);

    return (
        <div className="EditorPage">
            <div className="EditorPage__error">{ errorMessage }</div>
        </div>
    );
}
