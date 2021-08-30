import React, { ReactNode } from 'react';
import { useRouteToPage, constructUrlFromParams } from './Router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import classNames from 'classnames';

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

    return (
        <a href={constructUrlFromParams({ page: to })} onClick={handleClick} className={classNames(className, {
            active: page === to,
        })}>
            { children }
        </a>
    );
}