import React from 'react';
import './PackListEntry.scss';

export interface PackListEntryProps {
    name: string
}

export function PackListEntry({ name }: PackListEntryProps) {
    return (
        <div className='PackListEntry'>
            <header>
                <h1>{ name }</h1>
            </header>
        </div>
    );
}