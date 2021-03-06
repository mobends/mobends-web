import React from 'react';
import './PackListEntry.scss';

import classNames from 'classnames';
import { StylableProps } from './shared/commonProps';

export interface PackListEntryProps extends StylableProps {
    name: string;
    createdOn: Date;
    likes: number;
}

export function PackListEntry({ name, createdOn, likes, ...props }: PackListEntryProps) {
    return (
        <div className={classNames('PackListEntry', props.className)} style={props.style}>
            <header>
                <h1>{ name }</h1>
                <p>{ likes } likes</p>
                <p>Created on { createdOn.toDateString() }</p>
            </header>
        </div>
    );
}