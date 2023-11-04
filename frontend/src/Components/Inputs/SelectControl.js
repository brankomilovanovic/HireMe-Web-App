import { Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Box, FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import { getDropdownOptions } from "../../Util/DropdownUtil";

const SelectControl = (props) => {
  const [value, setValue] = useState([]);

  const changeValue = (newValues) => {
    props.setValue(props.name, newValues);
    setValue(newValues);
  };

  useEffect(() => {
    if(props?.value || (Array.isArray(props?.value) && props?.value?.length > 0)) {
      setValue(props?.value)
    }
  }, [props.value]);

  return (
    <Box sx={{ maxWidth: '40vw', width: '100%' }} className={"select-box " + props.className} style={props.style}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-mutiple-checkbox-label"
          className="select-label"
          error={props.error}
        >
          {props.label}
        </InputLabel>
        {(props?.placeholder && !value.length) && (
          <InputLabel
            id="demo-mutiple-checkbox-placeholder"
            className="select-placeholder"
          >
            {props.placeholder}
          </InputLabel>
        )}
        <Controller
          name={props.name}
          control={props.data}
          rules={props.rules}
          render={({ field }) => (
            <Select
              {...field}
              multiple={props.multiple}
              disabled={props.disabled}
              defaultOpen={props.defaultOpen}
              value={value}
              size={props.size ? props.size : "small"}
              label={props.label}
              error={props.error}
              onClose={props.onClose}
              onChange={(e) => {
                if (field?.onChange) {
                  field.onChange(() => changeValue(e.target.value));
                  return;
                }
                changeValue(e.target.value);
              }}
            >
            { getDropdownOptions(props.options, props.nameKey, props.valueKey) }
            </Select>
          )}
        />

        {props.error && <FormHelperText>{props.helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default SelectControl;
