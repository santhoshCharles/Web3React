export const ProjectCardMap = {
  ADD_CARD_START: "ADD_CARD_START",
  ADD_CARD_SUCCESS: "ADD_CARD_SUCCESS",
  ADD_CARD_ERROR: "ADD_CARD_ERROR",
  GET_PROJECTBOARD_DETAILS_START: "GET_PROJECTBOARD_DETAILS_START",
  GET_PROJECTBOARD_DETAILS_SUCCESS: "GET_PROJECTBOARD_DETAILS_SUCCESS",
  GET_PROJECTBOARD_DETAILS_ERROR: "GET_PROJECTBOARD_DETAILS_ERROR",
  UPDATE_CARD_START: "UPDATE_CARD_START",
  UPDATE_CARD_SUCCESS: "UPDATE_CARD_SUCCESS",
  UPDATE_CARD_ERROR: "UPDATE_CARD_ERROR",
  RESET_STATE: "RESET_STATE",
  DELETE_CARD_START: "DELETE_CARD_START",
  DELETE_CARD_SUCCESS: "DELETE_CARD_SUCCESS",
  DELETE_CARD_ERROR: "DELETE_CARD_ERROR",
  DELETE_CARD_COMMENT_START: "DELETE_CARD_COMMENT_START",
  DELETE_CARD_COMMENT_SUCCESS: "DELETE_CARD_COMMENT_SUCCESS",
  DELETE_CARD_COMMENT_ERROR: "DELETE_CARD_COMMENT_ERROR",
  DELETE_CARD_COMMENT_ATTACHMENT_START: "DELETE_CARD_COMMENT_ATTACHMENT_START",
  DELETE_CARD_COMMENT_ATTACHMENT_SUCCESS:
    "DELETE_CARD_COMMENT_ATTACHMENT_SUCCESS",
  DELETE_CARD_COMMENT_ATTACHMENT_ERROR: "DELETE_CARD_COMMENT_ATTACHMENT_ERROR",
  HANDLE_CARD_DRAG_START: "HANDLE_CARD_DRAG_START",
  HANDLE_CARD_DRAG_SUCCESS: "HANDLE_CARD_DRAG_SUCCESS",
  HANDLE_CARD_DRAG_ERROR: "HANDLE_CARD_DRAG_ERROR",
  MARK_AS_COMPLETE_START: "MARK_AS_COMPLETE_START",
  MARK_AS_COMPLETE_SUCCESS: "  MARK_AS_COMPLETE_SUCCESS",
  MARK_AS_COMPLETE_ERROR: "MARK_AS_COMPLETE_ERROR",
  GET_CARD_DETAIL_START: "GET_CARD_DETAIL_START",
  GET_CARD_DETAIL_SUCCESS: "GET_CARD_DETAIL_SUCCESS",
  GET_CARD_DETAIL_ERROR: "GET_CARD_DETAIL_ERROR",
  RESET_CARD_DETAILS: "RESET_CARD_DETAILS",
  RESET_PROJECT_BOARD_DETAILS: "RESET_PROJECT_BOARD_DETAILS",
};

export const ProjectCardActions = {
  addCardStart: () => ({ type: ProjectCardMap.ADD_CARD_START }),
  addCardSuccess: (data) => ({
    type: ProjectCardMap.ADD_CARD_SUCCESS,
    payload: data,
  }),
  addCardError: (errors) => ({
    type: ProjectCardMap.ADD_CARD_ERROR,
    payload: errors,
  }),
  getProjectDetailsStart: () => ({
    type: ProjectCardMap.GET_PROJECTBOARD_DETAILS_START,
  }),
  getProjectDetailsSuccess: (data) => ({
    type: ProjectCardMap.GET_PROJECTBOARD_DETAILS_SUCCESS,
    payload: data,
  }),
  getProjectDetailsError: (errors) => ({
    type: ProjectCardMap.GET_PROJECTBOARD_DETAILS_ERROR,
    payload: errors,
  }),
  updateCardStart: () => ({
    type: ProjectCardMap.UPDATE_CARD_START,
  }),
  updateCardSuccess: (data) => ({
    type: ProjectCardMap.UPDATE_CARD_SUCCESS,
    payload: data,
  }),
  updateCardError: (errors) => ({
    type: ProjectCardMap.UPDATE_CARD_ERROR,
    payload: errors,
  }),
  resetState: (data) => ({
    type: ProjectCardMap.RESET_STATE,
  }),
  deleteCardStart: (data) => ({
    type: ProjectCardMap.DELETE_CARD_START,
    payload: data,
  }),
  deleteCardSucess: (data) => ({
    type: ProjectCardMap.DELETE_CARD_SUCCESS,
    payload: data,
  }),
  deleteCardError: (data) => ({
    type: ProjectCardMap.DELETE_CARD_ERROR,
    payload: data,
  }),
  deleteCardCommentStart: (data) => ({
    type: ProjectCardMap.DELETE_CARD_COMMENT_START,
    payload: data,
  }),
  deleteCardCommentSucess: (data) => ({
    type: ProjectCardMap.DELETE_CARD_COMMENT_SUCCESS,
    payload: data,
  }),
  deleteCardCommentError: (data) => ({
    type: ProjectCardMap.DELETE_CARD_COMMENT_ERROR,
    payload: data,
  }),
  deleteCardCommentAttachmentStart: (data) => ({
    type: ProjectCardMap.DELETE_CARD_COMMENT_ATTACHMENT_START,
    payload: data,
  }),
  deleteCardCommentAttachmentSucess: (data) => ({
    type: ProjectCardMap.DELETE_CARD_COMMENT_ATTACHMENT_SUCCESS,
    payload: data,
  }),
  deleteCardCommentAttachmentError: (data) => ({
    type: ProjectCardMap.DELETE_CARD_COMMENT_ATTACHMENT_ERROR,
    payload: data,
  }),

  handleCardDragStart: (data) => ({
    type: ProjectCardMap.HANDLE_CARD_DRAG_START,
    payload: data,
  }),
  handleCardDragSuccess: (data) => ({
    type: ProjectCardMap.HANDLE_CARD_DRAG_SUCCESS,
    payload: data,
  }),
  handleCardDragError: (data) => ({
    type: ProjectCardMap.HANDLE_CARD_DRAG_ERROR,
    payload: data,
  }),
  markAsCompleteStart: (data) => ({
    type: ProjectCardMap.MARK_AS_COMPLETE_START,
    payload: data,
  }),
  markAsCompleteSuccess: (data) => ({
    type: ProjectCardMap.MARK_AS_COMPLETE_SUCCESS,
    payload: data,
  }),
  markAsCompleteError: (data) => ({
    type: ProjectCardMap.MARK_AS_COMPLETE_ERROR,
    payload: data,
  }),

  getCardDetailStart: (data) => ({
    type: ProjectCardMap.GET_CARD_DETAIL_START,
    payload: data,
  }),
  getCardDetailSuccess: (data) => ({
    type: ProjectCardMap.GET_CARD_DETAIL_SUCCESS,
    payload: data,
  }),
  getCardDetailError: (data) => ({
    type: ProjectCardMap.GET_CARD_DETAIL_ERROR,
    payload: data,
  }),
  resetCardDetails: (data) => ({
    type: ProjectCardMap.RESET_CARD_DETAILS,
    payload: data,
  }),
  resetProjectBoardDetails: (data) => ({
    type: ProjectCardMap.RESET_PROJECT_BOARD_DETAILS,
    payload: data,
  }),
};
