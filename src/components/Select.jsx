import React from 'react';
import PropsTypes from 'prop-types';
import { MenuItem, Select, Box } from '@material-ui/core/';
import { makeStyles, styled } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles(() => ({
  select: {
    minWidth: '200px',
    color: 'white',
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
  },
}));

const Selectbox = ({
  items, handleChange, label, defaultValue, filter,
}) => {
  const styledArrowDropDownIcon = styled(ArrowDropDownIcon)({
    color: 'white',
  });
  const classes = useStyles();
  return (
    <Box mr={2}>
      <Select
        value={filter}
        onChange={handleChange}
        className={classes.select}
        IconComponent={styledArrowDropDownIcon}
      >
        <MenuItem key={defaultValue} value={defaultValue}>
          {label}
        </MenuItem>
        {items.map(item => (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        ))}
      </Select>
    </Box>
  );
};

Selectbox.propsTypes = {
  items: PropsTypes.arrayOf(PropsTypes.string).isRequired,
  handleChange: PropsTypes.func.isRequired,
  label: PropsTypes.string.isRequired,
  defaultValue: PropsTypes.string.isRequired,
  filter: PropsTypes.string.isRequired,
};

export default React.memo(Selectbox);
