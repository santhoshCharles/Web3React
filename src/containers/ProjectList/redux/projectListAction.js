export const projectListConstant = {
    PROJECT_LIST_START: 'PROJECT_LIST_START',
    PROJECT_LIST_SUCCESS: 'PROJECT_LIST_SUCCESS',
    PROJECT_LIST_ERROR: 'PROJECT_LIST_ERROR',

    COLLABORATOR_LIST_START: 'COLLABORATOR_LIST_START',
    COLLABORATOR_LIST_SUCCESS: 'COLLABORATOR_LIST_SUCCESS',
    COLLABORATOR_LIST_ERROR: 'COLLABORATOR_LIST_ERROR',

    BUDGET_RANGE_START: 'BUDGET_RANGE_START',
    BUDGET_RANGE_SUCCESS: 'BUDGET_RANGE_SUCCESS',
    BUDGET_RANGE_ERROR: 'BUDGET_RANGE_ERROR',

    SET_PROJECT_BATCH_NUMBER: 'SET_PROJECT_BATCH_NUMBER',
    CLEAN_UP_PROJECT_LIST: 'CLEAN_UP_PROJECT_LIST',
    RESET_BATCH_NUMBER: 'RESET_BATCH_NUMBER',

    RESET_FILTERS: 'RESET_FILTERS'
}

export const projectListActions = {
    projectListStart: (data) => ({ type: projectListConstant.PROJECT_LIST_START, payload: data }),
    projectListSuccess: (data) => ({ type: projectListConstant.PROJECT_LIST_SUCCESS, payload: data }),
    projectListError: (errors) => ({ type: projectListConstant.PROJECT_LIST_ERROR, payload: { errors } }),

    collaboratorListStart: (data) => ({ type: projectListConstant.COLLABORATOR_LIST_START, payload: data }),
    collaboratorListSuccess: (data) => ({ type: projectListConstant.COLLABORATOR_LIST_SUCCESS, payload: data }),
    collaboratorListError: (errors) => ({ type: projectListConstant.COLLABORATOR_LIST_ERROR, payload: { errors } }),

    budgetRangeStart: (data) => ({ type: projectListConstant.BUDGET_RANGE_START, payload: data }),
    budgetRangeSuccess: (data) => ({ type: projectListConstant.BUDGET_RANGE_SUCCESS, payload: data }),
    budgetRangeError: (errors) => ({ type: projectListConstant.BUDGET_RANGE_ERROR, payload: { errors } }),

    setProjectBatchNumber: (data) => ({ type: projectListConstant.SET_PROJECT_BATCH_NUMBER, payload: data }),
    cleanUpProjectList: (data) => ({ type: projectListConstant.CLEAN_UP_PROJECT_LIST }),
    resetBatchNumber: (data) => ({ type: projectListConstant.RESET_BATCH_NUMBER, payload: data }),
}