import React from 'react';
import './PackListEntry.scss';

export interface PackListEntryProps {
    name: string
    createdOn: Date
    likes: number
}

export function PackListEntry({ name, createdOn, likes }: PackListEntryProps) {
    return (
        <div className='PackListEntry'>
            <header>
                <h1>{ name }</h1>
                <p>{ likes } likes</p>
                <p>Created on { createdOn.toDateString() }</p>
            </header>
        </div>
    );
}