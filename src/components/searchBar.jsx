import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";

const handleSearch = (e) => {
  console.log(e.target.value);
};

const SearchBar = ({setSearchQuery}) => (
  <Paper
      component="form"
      sx={{ 
        width: '90%',
        alignSelf: 'center',
        margin: '10px',
        marginBottom: '5px',
        backgroundColor: 'primary.main', 
        height: '40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        outline: 'solid 2px background' 
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Templates"
        inputProps={{ 'aria-label': 'search templates' }}
        onChange={handleSearch}
      />
      </Paper>
);

export default SearchBar;