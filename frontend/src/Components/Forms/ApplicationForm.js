import React from 'react';
import Button from '@mui/material/Button';
import {FormProvider} from "react-hook-form";
import strings from '../../localization';
import TextFieldControl from '../Inputs/TextFieldControl';

const ApplicationForm = ({
                      onSubmit,
                      data,
                      form,
                      errors,
                      formRules
                  }) => {

    return (
        <FormProvider {...form}>
            <form id='application-form' style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '30rem'}} action="#">

                <TextFieldControl
                    name='aboutYourself'
                    rules={formRules['aboutYourself']}
                    control={data}
                    multiline
                    maxRows={10}
                    rows={6}
                    error={Boolean(errors.aboutYourself)}
                    helperText={errors.aboutYourself && strings.forms.common.thisFieldIsRequired}
                    label={strings.forms.application.aboutYourself}
                />

                <TextFieldControl
                    name='motivationalLetter'
                    rules={formRules['motivationalLetter']}
                    control={data}
                    multiline
                    maxRows={10}
                    rows={6}
                    error={Boolean(errors.motivationalLetter)}
                    helperText={errors.motivationalLetter && strings.forms.common.thisFieldIsRequired}
                    label={strings.forms.application.motivationalLetter}
                />

                <Button variant="contained" style={{width: '100%'}} onClick={onSubmit} endIcon={<img style={{filter: 'invert(1)'}} src='/images/send.svg'/>}>
                    {strings.forms.common.login}
                </Button>
                
            </form>
        </FormProvider>
    );
}

export default ApplicationForm;