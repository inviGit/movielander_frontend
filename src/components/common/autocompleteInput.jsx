import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";

export default function AutocompleteInput({ data, label, onItemSelect }) {
  return (
    <Autocomplete
      id={label}
      options={data}
      fullWidth
      getOptionLabel={(option) => option[label]}
      onChange={onItemSelect}
      renderInput={(params) => (
        <TextField component={Paper} {...params} label="Search" variant="filled" color="primary"/>
      )}
    />
  );
}
