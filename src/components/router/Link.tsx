import React, { ReactNode } from 'react';
import { useRouteToPage, constructUrlFromParams } from './Router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { combineClasses } from '../../helpers/classNameHelper';

export interface LinkProps {
    children?: ReactNode
    className?: string
    to: string | null
}

export function Link({ className, children, to }: LinkProps) {
    const routeToPage = useRouteToPage();
    const page = useSelector((state: RootState) => state.page);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        routeToPage(to);
    };

    const classes = combineClasses({
        active: page === to,
    });

    return (
        <a href={constructUrlFromParams({ page: to })} onClick={handleClick} className={[className, classes].join(' ')}>
            { children }
        </a>
    );
}