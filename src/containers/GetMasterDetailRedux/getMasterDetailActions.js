export const GetMasterDetailsMap = {
    GET_MASTER_DETAILS_START: 'GET_MASTER_DETAILS_START',
    GET_MASTER_DETAILS_SUCCESS: 'GET_MASTER_DETAILS_SUCCESS',
    GET_MASTER_DETAILS_ERROR: 'GET_MASTER_DETAILS_ERROR',
}

export const GetMasterDetailsActions = {
    getMasterDetailsStart: () => ({ type: GetMasterDetailsMap.GET_MASTER_DETAILS_START }),
    getMasterDetailsSuccess: (data, type) => ({ type: GetMasterDetailsMap.GET_MASTER_DETAILS_SUCCESS, payload: data, masterType: type }),
    getMasterDetailsError: () => ({ type: GetMasterDetailsMap.GET_MASTER_DETAILS_ERROR })
}