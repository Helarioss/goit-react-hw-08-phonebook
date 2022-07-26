import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter, updateFilter } from 'redux/contacts/filterSlice';

const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const onFilterChange = event => {
    dispatch(updateFilter(event.target.value));
  };

  return (
    <TextField
      fullWidth
      id="standard-search"
      label="Search"
      type="search"
      variant="standard"
      name="filter"
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      value={value}
      onChange={onFilterChange}
    />
  );
};

export default Filter;
