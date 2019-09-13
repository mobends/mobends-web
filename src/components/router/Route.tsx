import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

export interface RouteProps {
    page: string
    component: JSX.Element
}

export function Route({page, component}: RouteProps) {
    const currentPage = useSelector((state: RootState) => state.page);

    const showRoute = page === currentPage;
    return showRoute ? component : null;
}