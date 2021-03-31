import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function AutocompleteInput({ data, label, onItemSelect }) {
  
  return (
    <Autocomplete
      id={label}
      options={data}
      fullWidth
      getOptionLabel={(option) => option[label]}
      style={{ marginBottom: "10px" }}
      onChange={onItemSelect}
      renderInput={(params) => (
        <TextField {...params} label="Search" variant="outlined" />
      )}
    />
  );
}
