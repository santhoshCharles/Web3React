export const CmsMap = {
    GET_CMS_DETAILS_START: 'GET_CMS_DETAILS_START',
    GET_CMS_DETAILS_SUCCESS: 'GET_CMS_DETAILS_SUCCESS',
    GET_CMS_DETAILS_ERROR: 'GET_CMS_DETAILS_ERROR',
}

export const CmsActions = {
    getCMSDetailsStart: (data) => ({ type: CmsMap.GET_CMS_DETAILS_START, payload: data }),
    getCMSDetailsSuccess: (data) => ({ type: CmsMap.GET_CMS_DETAILS_SUCCESS, payload: data }),
    getCMSDetailsError: (errors) => ({ type: CmsMap.GET_CMS_DETAILS_ERROR, payload: { errors } }),
}