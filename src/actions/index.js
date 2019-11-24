import { createAction } from 'redux-actions';

export const getHotelsRequest = createAction('HOTELS_GET_REQUEST');
export const getHotelsSuccess = createAction('HOTELS_GET_SUCCESS');
export const getHotelsFailure = createAction('HOTELS_GET_FAILURE');

export const setFilter = createAction('FILTER_SET');
