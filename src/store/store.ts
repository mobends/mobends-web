import { createStore } from 'redux';
import { RootState, CHANGE_PAGE } from './types';

const initialState: RootState = {
    page: null,
    packs: {
        '0': {
            id: '0',
            name: 'Roll!',
        },
    },
    packsList: ['0', '0', '0', '0'],
};

const reducer = (state: RootState = initialState, action: any) => {
    switch(action.type) {
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.page,
            };
        default:
            return state;
    }
};

export const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);