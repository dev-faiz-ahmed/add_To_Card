import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../features/cartSlice';

export default function SearchBox() {


  const dispatch = useDispatch();

  const items = useSelector((state) => state.allCart.filteredItems);
  console.log("Hello....", items);
  
  const uniqueItems = Array.from(new Set(items.map(item => item.category)))
    .map(category => {
      return items.find(item => item.category === category);
    });

    const handleSearch = (event, value) => {
      dispatch(setSearchQuery(value));
    };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={uniqueItems}
      getOptionLabel={(option) => option.category}
      onInputChange={handleSearch}
      sx={{ width: 300}}
      renderInput={(params) => <TextField {...params} label="search"  />}
    />
  );
}