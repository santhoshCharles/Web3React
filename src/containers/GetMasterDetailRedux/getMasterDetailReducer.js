import { GetMasterDetailsMap } from './getMasterDetailActions';

const initialState = {
    isLoading: false,
    masterDetails: [],
    refreshMasterDetails: true
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GetMasterDetailsMap.GET_MASTER_DETAILS_START: {
            return {
                ...state,
                isLoading: true,
                refreshMasterDetails: false
            }
        }
        case GetMasterDetailsMap.GET_MASTER_DETAILS_SUCCESS: {

            return {
                ...state,
                isLoading: false,
                masterDetails: action.payload,
                refreshMasterDetails: false
            }
        }
        case GetMasterDetailsMap.GET_MASTER_DETAILS_ERROR: {
            return {
                ...state,
                isLoading: false,
                refreshMasterDetails: false,
            }
        }
        default: return { ...state }
    }
}