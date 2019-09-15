export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SET_PACKS = 'SET_PACKS';
export const START_LOADING = 'START_LOADING';
export const SET_ERROR = 'SET_ERROR';

export interface ChangePageAction {
    type: typeof CHANGE_PAGE
    page: string | null
}

export interface SetPacksAction {
    type: typeof SET_PACKS
    packs: BendsPack[]
}

export interface StartLoadingAction {
    type: typeof START_LOADING
}

export interface SetErrorAction {
    type: typeof SET_ERROR
    error: string
}

export type Action = ChangePageAction | SetPacksAction | StartLoadingAction | SetErrorAction;

export interface BendsPack {
    id: string
    name: string
    likes: number
    createdOn: Date
}

export type Dict<T> = {[key: string]: T};

export interface RootState {
    page: string | null
    packs: Dict<BendsPack>
    packsList: string[]
    loading: boolean
    errorMessage: string
}