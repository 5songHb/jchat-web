import { indexAction } from '../actions';
interface IndexStore {
    actionType: string;
    errorApiTip: object;
    tipModal: object;
}
let indexInit = {
    actionType: '',
    errorApiTip: {},
    tipModal: {}
};
export const indexReducer = (state: IndexStore = indexInit, {type, payload}) => {
    state.actionType = type;
    switch (type) {
        case indexAction.errorApiTip:
            state.errorApiTip = payload;
            break;
        case indexAction.tipModal:
            state.tipModal = payload;
            break;
        default:
    }
    return state;
};
