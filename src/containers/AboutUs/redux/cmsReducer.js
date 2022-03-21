import { CmsMap } from './cmsAction';

const initialState = {
    isLoading: false,
    CMS: {},
    refreshCMS: true
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CmsMap.GET_CMS_DETAILS_START: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case CmsMap.GET_CMS_DETAILS_SUCCESS: {
            return {
                ...state,
                CMS: action.payload,
                isLoading: false,
                refreshCMS: true
            }
        }
        case CmsMap.GET_CMS_DETAILS_ERROR: {
            return {
                ...state,
                isLoading: false,
                refreshCMS: true
            }
        }
        default: return { ...state }
    }
}