import React, { useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { changePage } from '../../store/action';

export interface RouterProps {
    children?: ReactNode
}

interface RouteParams {
    page: string | null
}

export function constructUrlFromParams({ page }: RouteParams): string {
    let url = window.location.origin + window.location.pathname;
    if (page) {
        url += `?page=${page}`;
    }
    return url;
}

export function useRouteToPage() {
    const dispatch = useDispatch();

    return (pageName: string | null) => {
        let url = constructUrlFromParams({ page: pageName });

        window.history.pushState({
            url,
        }, '', url);

        dispatch(changePage(pageName));
    }
}

export function extractParamsFromUrl(url: string) {
    const urlObject = new URL(url);
    const searchParams = urlObject.searchParams;

    return {
        page: searchParams.get('page'),
    };
}

export function Router({ children }: RouterProps) {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const { page } = extractParamsFromUrl(window.location.href);
        dispatch(changePage(page));
    }, [ dispatch ]);

    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            if (e.state) {
                const { page } = extractParamsFromUrl(e.state.url);
                dispatch(changePage(page));
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [ dispatch ]);

    return <div>{ children }</div>;
}