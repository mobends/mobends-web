import { CHANGE_PAGE, ChangePageAction } from './types';

export function changePage(page: string | null): ChangePageAction {
    return { type: CHANGE_PAGE, page };
}