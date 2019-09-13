import React, { ReactNode } from 'react';
import { useRouteToPage } from './Router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

export interface LinkProps {
    children?: ReactNode
    to: string | null
}

export function Link({ children, to }: LinkProps) {

    const routeToPage = useRouteToPage();
    const page = useSelector((state: RootState) => state.page);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        routeToPage(to);
    };

    return (
        <a href='#' onClick={handleClick} className={page === to ? 'active' : ''}>
            { children }
        </a>
    );
}