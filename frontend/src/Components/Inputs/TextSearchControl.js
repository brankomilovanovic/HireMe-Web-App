import {Controller} from "react-hook-form";
import React from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { InputLabel } from "@mui/material";

const TextSearchControl = ({
        icon = '/images/search.svg',
        reverse = false,
        label,
        ...props
    }) => {
    return <Controller
        {...props}
        control={props.control}
        name={props.name}
        defaultValue={props.defaultValue}
        rules={props.rules}
        render={({ field }) =>
            <div id = 'searchfield-container'>
                <Paper style={{display: 'flex', flexDirection: reverse ? 'row-reverse' : 'row'}}>
                    <IconButton>
                        <img src={icon} />
                    </IconButton>
                    <InputBase
                        {...field}
                        placeholder = {props.placeholder}
                    />
                    { label && <InputLabel id="demo-search-input-label" className="label" error={props.error}>{label}</InputLabel>}
                </Paper>
            </div>
        }
    />
}

export default TextSearchControl;
