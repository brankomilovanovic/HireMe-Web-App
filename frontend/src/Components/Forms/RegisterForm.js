import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import {FormProvider} from "react-hook-form";
import strings from '../../localization';
import TextFieldControl from '../Inputs/TextFieldControl';
import { InputAdornment } from '@mui/material';
import { UserType, getUserTypes } from '../../Constants/UserType';
import SelectControl from '../Inputs/SelectControl';

const RegisterForm = ({
                      onSubmit,
                      data,
                      form,
                      errors,
                      setValue,
                      formRules,
                      values,
                      watch
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
                    name='name'
                    rules={formRules['name']}
                    control={data}
                    error={Boolean(errors.name)}
                    helperText={errors.name && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.name}
                />

                <TextFieldControl
                    name='surname'
                    rules={formRules['surname']}
                    control={data}
                    error={Boolean(errors.surname)}
                    helperText={errors.surname && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.surname}
                />

                <TextFieldControl
                    name='email'
                    control={data}
                    rules={formRules['email']}
                    type={'email'}
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                    label={strings.base.profile.email}
                />

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
                        control={data}
                        inputProps={adornment}
                        type={passwordShown ? "text":"password"}
                        error={Boolean(errors.password)}
                        helperText={errors.password && strings.forms.common.thisFieldIsRequired}
                        label={strings.base.profile.password}
                    />
                </div>

                <SelectControl
                    value={values['userType']}
                    rules={formRules['userType']}
                    setValue={setValue}
                    name='userType'
                    control={data}
                    style={{marginTop: '23px'}}
                    error={Boolean(errors.userType)}
                    helperText={errors.userType && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.userType}
                    options={getUserTypes()}
                    nameKey={'name'}
                    valueKey={'id'}
                />

                { watch('userType') === UserType.COMPANY && <div style={{display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '12px'}}>
                    <TextFieldControl
                        name='companyName'
                        rules={formRules['companyName']}
                        control={data}
                        error={Boolean(errors.companyName)}
                        helperText={errors.companyName && strings.forms.common.thisFieldIsRequired}
                        label={strings.base.company.companyName}
                    />

                    <TextFieldControl
                        name='companyAddress'
                        rules={formRules['companyAddress']}
                        control={data}
                        error={Boolean(errors.companyAddress)}
                        helperText={errors.companyAddress && strings.forms.common.thisFieldIsRequired}
                        label={strings.base.company.companyAddress}
                    />
                </div> }

                { watch('userType') === UserType.INDIVIDUAL &&
                    <TextFieldControl
                        name='individualAddress'
                        rules={formRules['individualAddress']}
                        control={data}
                        error={Boolean(errors.individualAddress)}
                        helperText={errors.individualAddress && strings.forms.common.thisFieldIsRequired}
                        label={strings.base.individual.individualAddress}
                    /> 
                }


                <Button variant="contained" className="button-primary" style={{width: '100%'}} onClick={onSubmit}>
                    {strings.forms.common.register}
                </Button>
                
            </form>
        </FormProvider>
    );
}

export default RegisterForm;