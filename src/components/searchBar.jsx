import { TextField } from '@mui/material';

const SearchBar = ({ searchTemplates }) => (
  <TextField
        placeholder="Search Templates"
        onChange={searchTemplates}
      />
);

export default SearchBar;