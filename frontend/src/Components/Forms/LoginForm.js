import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {FormProvider} from "react-hook-form";
import strings from '../../localization';
import TextFieldControl from '../Inputs/TextFieldControl';
import { InputAdornment } from '@mui/material';

const LoginForm = ({
                      onSubmit,
                      data,
                      form,
                      errors,
                      formRules
                  }) => {

    const [passwordShown, setPasswordShown] = useState(false);

    const adornment = {
        endAdornment: (
          <InputAdornment position="end" onClick={()=>setPasswordShown(prevValue=>!prevValue)}>
            {passwordShown? <img src={'/images/eye-off.svg'} loading={'lazy'} /> : <img src={'/images/eye.svg'} loading={'lazy'} />}
          </InputAdornment>
        )
    }

    return (
        <FormProvider {...form}>
            <form id='login-form' className='login-form-inputs' action="#">

                <TextFieldControl
                    name='username'
                    rules={formRules['username']}
                    control={data}
                    error={Boolean(errors.username)}
                    helperText={errors.username && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.username}
                />

                <div className='mui-adornment'>
                    <TextFieldControl
                        name='password'
                        rules={formRules['password']}
                        type={passwordShown ? "text":"password"}
                        control={data}
                        inputProps={adornment}
                        error={Boolean(errors.password)}
                        helperText={errors.password && strings.forms.common.thisFieldIsRequired}
                        label={strings.base.profile.password}
                    />
                </div>

                <Button variant="contained" className="button-primary" style={{width: '100%'}} onClick={onSubmit}>
                    {strings.forms.common.login}
                </Button>
                
            </form>
        </FormProvider>
    );
}

export default LoginForm;