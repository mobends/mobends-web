export const CHANGE_PAGE = 'CHANGE_PAGE';
export interface ChangePageAction {
    type: typeof CHANGE_PAGE,
    page: string | null;
}

interface Pack {
    id: string
    name: string
}

type Dict<T> = {[key: string]: T};

export interface RootState {
    page: string | null
    packs: Dict<Pack>
    packsList: string[]
}