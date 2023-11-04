import {Autocomplete, Box, FormControl, TextField} from "@mui/material"
import {useCallback, useEffect, useState,} from "react";
import React from "react";
import {Controller} from "react-hook-form";
import {debounce} from 'lodash';
import strings from "../../localization";

const AutoCompleteControl = (props) => {
    const [value, setValue] = useState(null);

    const [data, setData] = useState({options: [], loading: !props.options || props.options.length === 0});

    useEffect(() => {
        setValue(props.value || null);
    }, [props.value])

    useEffect(() => {
        setData(value => ({...value, loading: true, options: []}));
        debouncedOptions(props.options);
    }, [props.options])

    const debouncedSave = useCallback(
        debounce((newValue) => {
            if (props.onChange) {
                props?.onChange(newValue)
            }
        }, 800),
        []);

    const debouncedOpen = useCallback(
        debounce((newValue) => {

            if (!newValue) {
                return
            }

            if (props?.onOpen) {
                setData(value => ({...value, loading: true}));
                Promise.resolve(props?.onOpen()).then();
            }
        }),
        []);

    const debouncedOptions = useCallback(
        debounce((newValue) => {
            setData(value => ({loading: false, options: newValue?.length >= 0 ? newValue : []}));
        }, 800),
    []);

    const updateValue = (newValue) => {
        debouncedSave(newValue);
    };

    const changeValue = (value) => {
        setValue(value);
        props.setValue(props.name, value)
    }

    const onOpen = () => {
        debouncedOpen()
    }

    return <Box sx={{ maxWidth: '40vw', width: '100%' }} className={'select-box ' + props.className}>
        <FormControl fullWidth>
            <Controller
                rules={props.rules}
                name={props.name}
                control={props.control}
                render={({field}) => AutocompleteComponent({
                    props,
                    field,
                    changeValue,
                    updateValue,
                    options: data.options,
                    value,
                    onOpen,
                    loading: data.loading
                })
                }
            />
        </FormControl>
    </Box>
}

export default AutoCompleteControl;

const AutocompleteComponent = ({props, field, changeValue, updateValue, options, value, onOpen, loading}) => {

    const onChange = (field, value) => {
        if (field?.onChange) {
            field.onChange(() => changeValue(value));
            return
        }
        changeValue(value);
    }

    return <div className={'autocomplete-wrapper'}>
        <Autocomplete {...field}
            loading={loading}
            className={'autocomplete'}
            disabled={props.disabled}
            openOnFocus={props.openOnFocus}
            size={props.size ? props.size : 'small'}
            options={loading ? [] : options}
            getOptionLabel={(option) => option[props.nameKey]}
            renderInput={params => <TextField
                {...params}
                error={props.error}
                label={props.label}
                onKeyDown={props?.onKeyDown}
                onChange={e => updateValue(e.target.value)}
                helperText={props.helperText}
                inputProps={{...params.inputProps}}
                placeholder={props.placeholder}
                InputLabelProps={props.placeholder ? {shrink: true} : {}}
                autoFocus={props.openOnFocus}
                className={props?.className ?? 'mui-shifted-label-input'}
            />}
            onChange={(event, value) => onChange(field, value)}
            onOpen={onOpen}
            value={value}
            clearIcon={props.showClear && <img src = '/images/close.svg'/>}
            isOptionEqualToValue={(option, value) =>
                option && value && option[props.valueKey || 'name'] === value[props.valueKey || 'name']
            }
            noOptionsText={strings.components.autocomplete.noResults}
            onClose={props.onClose}
        />
    </div>

}
