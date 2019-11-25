import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  CircularProgress, Container, Box, Typography, Toolbar, AppBar,
} from '@material-ui/core';
import * as actions from '../actions';
import { pluralize, getScrollHeight, pTHotels } from '../lib';
import { filteredHotelsSelector } from '../selectors';
import HotelCardList from './HotelCardList';
import Selectbox from './Select';

const App = ({
  hotels, filters, filter, isLoading, getHotelsRequest, setFilter,
}) => {
  const itemsToLoadCount = 8;
  const [shouldLoadMore, setShouldLoadMore] = useState(true);
  const loadedRowsCount = hotels.length;

  const fetchHotelsList = async (startIndex, length) => {
    await getHotelsRequest({ startIndex, length, filter });
    setShouldLoadMore(false);
  };

  const handleScroll = () => {
    const scrollHeight = getScrollHeight();
    if (window.pageYOffset + window.innerHeight === scrollHeight) {
      setShouldLoadMore(true);
    }
  };

  useEffect(() => {
    fetchHotelsList(loadedRowsCount, itemsToLoadCount);
  }, [shouldLoadMore]);

  useEffect(() => {
    const { scrollHeight } = document.body;
    if (scrollHeight < window.pageYOffset + window.innerHeight) {
      setShouldLoadMore(true);
    }
  }, [filter, hotels]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const renderSpinner = () => isLoading && <Box p={5} align="center"><CircularProgress /></Box>;

  return (
    <Container fixed>
      <AppBar>
        <Container fixed>
          <Box display="flex" alignItems="flex-end" py={2}>
            <Selectbox filter={filter} handleChange={handleChange} items={filters} label="Select region" defaultValue="none" />
            <Typography>{`We found: ${pluralize(loadedRowsCount, 'hotel')}`}</Typography>
          </Box>
        </Container>
      </AppBar>
      <Toolbar />
      <HotelCardList items={hotels} />
      {renderSpinner()}
    </Container>
  );
};

const mapStateToProps = state => ({
  hotels: filteredHotelsSelector(state),
  filters: state.filters,
  isLoading: state.hotelsFethingState === 'requested',
  filter: state.filter,
});
const mapDispatchToProps = {
  getHotelsRequest: actions.getHotelsRequest,
  setFilter: actions.setFilter,
};

App.defaultProps = {
  filter: 'none',
};

App.propTypes = {
  hotels: pTHotels.isRequired,
  filters: PropsTypes.arrayOf(PropsTypes.string).isRequired,
  filter: PropsTypes.string,
  isLoading: PropsTypes.bool.isRequired,
  getHotelsRequest: PropsTypes.func.isRequired,
  setFilter: PropsTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
