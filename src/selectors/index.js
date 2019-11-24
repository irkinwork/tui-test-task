import { createSelector } from 'reselect';
import { handleFilter } from '../lib';

export const getHotels = state => state.hotels;
export const getCurrentFilter = state => state.filter;

export const filteredHotelsSelector = createSelector(
  [getHotels, getCurrentFilter],
  (hotels, currentFilter) => hotels.filter(handleFilter(currentFilter)),
);
