import { createStore } from 'redux';
import { RootState, SET_PACKS, CHANGE_PAGE, BendsPack, Action, SET_ERROR, START_LOADING } from './types';

const initialState: RootState = {
    page: null,
    packs: {},
    packsList: [],
    loading: false,
    errorMessage: '',
};

const reducer = (state: RootState = initialState, action: Action) => {
    switch(action.type) {
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.page,
            };
        case SET_PACKS:
            const packsMap: {[key: string]: BendsPack} = {};
            action.packs.forEach(pack => packsMap[pack.id] = pack);

            return {
                ...state,
                packs: {
                    ...state.packs,
                    ...packsMap,
                },
                packsList: action.packs.map(pack => pack.id),
            };
        case START_LOADING:
            return {
                ...state,
                loading: true,
                errorMessage: '',
            };
        case SET_ERROR:
            return {
                ...state,
                loading: false,
                errorMessage: action.error,
            };
        default:
            return state;
    }
};

export const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);