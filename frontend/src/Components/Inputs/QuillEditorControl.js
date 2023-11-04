import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import {Controller} from "react-hook-form";
import React, { Fragment, useState } from "react";
import { useEffect, useRef, useMemo } from 'react';
import AutoLinks from 'quill-auto-links';
import { FormControl, InputLabel, Tooltip } from '@mui/material';

ReactQuill.Quill.register('modules/autoLinks', AutoLinks);

const QuillEditorControl = ({
        value = '',
        onChange = ()=>{},
        defaultValue = '',
        disabled = false,
        theme = QuillThemes.snow,
        className = '',
        placeholder='',
        ...props
    }) => { 

    const editor = useRef(null);
    const parser = new DOMParser();

    const [parsedContent, setParsedContent] = useState('');

    useEffect(() => {
        handleChange(defaultValue)
    }, [defaultValue]);

    const handleChange = (value) => {
        const parsedValue = parser.parseFromString(value, 'text/html')?.body?.textContent;

        if (props?.maxLetters && parsedValue?.length > props?.maxLetters) {
            return;
        }

        setParsedContent(parsedValue);
        onChange(value)
      };

    const defaultModules = useMemo(() => ({
        autoLinks: true,
        history: {
            delay: 1000,
            maxStack: 100,
            userOnly: true
        },
        toolbar: {
            container: [
                [{ header: [false, 1, 2, 3, 4, 5, 6] }],
                ["bold", "italic", "underline", {color: []}],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ list:  "bullet" }, { list:  "ordered" }],
                ['undo', 'redo']
            ],
            handlers: {
                'undo': () => {
                    editor.current.getEditor().history.undo();
                },
                'redo': () => {
                    editor.current.getEditor().history.redo();
                }
            }
        }
    }),[]);

    return <div style={{marginTop: '20px', marginBottom: '10px'}}>
        <InputLabel id="demo-simple-select-label" className="quill-label" style={{display: 'flex', alignItems: 'center', gap: '10px'}} error={props.error}>
            {props.label}
            { props?.info && <Tooltip title={props.info} className='tooltip-info'>
                <img src = '/images/info.svg' width={20}/>
            </Tooltip> }
        </InputLabel>
        <FormControl className='quill-editor-control'>
            <Controller
                name={props.name}
                control={props.control}
                defaultValue={defaultValue}
                rules={props.rules}
                render={({field}) =>
                    <ReactQuill {...field}
                        className={className}
                        readOnly={disabled}
                        value={field.value}
                        onChange={(value) => handleChange(value)}
                        theme={theme}
                        modules={defaultModules}
                        placeholder={placeholder}
                        ref={editor}
                /> }
            />
        </FormControl>
        { props.maxLetters && <div>Preostalo karaktera: {props.maxLetters - parsedContent?.length}</div> }
        { props.error && <p className="error-message">{props.helperText}</p> }
    </div>
}

export default QuillEditorControl;

export const isEmpty = (value) =>{
    return !value || value === '<p><br></p>';
}

export const QuillThemes = {
    snow: 'snow',
    bubble: 'bubble',
}
