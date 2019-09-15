import { SET_PACKS, ChangePageAction, BendsPack, SetPacksAction, CHANGE_PAGE, SetErrorAction, SET_ERROR, StartLoadingAction, START_LOADING } from './types';

export function changePage(page: string | null): ChangePageAction {
    return { type: CHANGE_PAGE, page };
}

export function setPacks(packs: BendsPack[]): SetPacksAction {
    return { type: SET_PACKS, packs };
}

export function startLoading(): StartLoadingAction {
    return { type: START_LOADING };
}

export function setError(error: string): SetErrorAction {
    return { type: SET_ERROR, error };
}