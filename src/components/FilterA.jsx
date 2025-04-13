'use client'; // Necesario para componentes que usan hooks y interactividad

import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const FilterA = () => {
  // Generar años del 2000 al 2050
  const years = Array.from({ length: 51 }, (_, i) => ({
    value: 2000 + i,
    label: String(2000 + i)
  }));

  return (
    <Autocomplete
      sx={{ width: 300 }}
      options={years}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} label="Selecciona un año" margin="normal" />
      )}
      renderOption={(props, option, { inputValue }) => {
        const { key, ...optionProps } = props;
        const matches = match(option.label, inputValue, { insideWords: true });
        const parts = parse(option.label, matches);

        return (
          <li key={key} {...optionProps}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
};

export default FilterA;