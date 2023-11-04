import React from 'react';
import Button from '@mui/material/Button';
import {FormProvider} from "react-hook-form";
import TextFieldControl from '../../Inputs/TextFieldControl';
import strings from '../../../localization';
import QuillEditorControl from '../../Inputs/QuillEditorControl';
import { getShiftTypes } from '../../../Constants/Shift';
import SelectControl from '../../Inputs/SelectControl';
import AutoCompleteControl from '../../Inputs/AutoCompleteControl';
import { JobType, getJobTypes } from '../../../Constants/JobType';
import { useSelector } from 'react-redux';
import { getAdTypes } from '../../../Constants/AdType';

const AdPlacementForm = ({
                      onSubmit,
                      data,
                      form,
                      errors,
                      formRules,
                      setValue,
                      watch,
                      values,
                      submitButtonText = strings.forms.adPlacement.submit
                  }) => {
                    
    const cities = useSelector((state) => state.location.cities)

    return (
        <FormProvider {...form}>
            <form id='ad-placement-form' className='ad-placement-form-inputs' action="#">

                <TextFieldControl
                    name='title'
                    rules={formRules['title']}
                    control={data}
                    error={Boolean(errors.title)}
                    helperText={errors.title && strings.forms.common.thisFieldIsRequired}
                    label={strings.forms.adPlacement.title}
                />

                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <AutoCompleteControl
                        value={values['city']}
                        name='city'
                        label={strings.forms.adPlacement.city}
                        nameKey={'name'}
                        valueKey={'name'}
                        setValue={setValue}
                        control={data}
                        options={cities}
                        rules={formRules['city']}
                        error={Boolean(errors.city)}
                        helperText={errors.city && strings.forms.common.thisFieldIsRequired}
                    />

                    <TextFieldControl
                        name='address'
                        rules={formRules['address']}
                        control={data}
                        error={Boolean(errors.address)}
                        helperText={errors.address && strings.forms.common.thisFieldIsRequired}
                        label={strings.forms.adPlacement.address}
                    /> 
                </div>
                <div className='fields-container'>
                    <div className='display-column-fields-container'>
                        <SelectControl
                            value={values['adType']}
                            rules={formRules['adType']}
                            setValue={setValue}
                            name='adType'
                            control={data}
                            error={Boolean(errors.adType)}
                            helperText={errors.adType && strings.forms.common.thisFieldIsRequired}
                            label={strings.forms.adPlacement.adType}
                            options={getAdTypes()}
                            nameKey={'name'}
                            valueKey={'id'}
                        />
                        <SelectControl
                            value={values['jobType']}
                            rules={formRules['jobType']}
                            setValue={setValue}
                            name='jobType'
                            control={data}
                            error={Boolean(errors.jobType)}
                            helperText={errors.jobType && strings.forms.common.thisFieldIsRequired}
                            label={strings.forms.adPlacement.jobType}
                            options={getJobTypes()}
                            nameKey={'name'}
                            valueKey={'id'}
                        />
                    </div>

                    <div className='display-column-fields-container'>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <TextFieldControl
                                name='salary'
                                rules={formRules['salary']}
                                type={'number'}
                                inputProps={{
                                    maxLength: 13,
                                    step: "1"
                                }}
                                control={data}
                                error={Boolean(errors.salary)}
                                helperText={errors.salary && strings.forms.common.thisFieldIsRequired}
                                label={(watch('jobType') === JobType.FULL_TIME || watch('jobType') === undefined) ? strings.forms.adPlacement.salary.fullTime : strings.forms.adPlacement.salary.partTime}
                            />

                            <TextFieldControl
                                name='workingHours'
                                rules={formRules['workingHours']}
                                control={data}
                                type={'number'}
                                error={Boolean(errors.workingHours)}
                                helperText={errors.workingHours && strings.forms.common.thisFieldIsRequired}
                                label={(watch('jobType') === JobType.FULL_TIME || watch('jobType') === undefined) ? strings.forms.adPlacement.workingHours.fullTime: strings.forms.adPlacement.workingHours.partTime}
                            />
                        </div>
                        <SelectControl
                            value={values['shifts']}
                            rules={formRules['shifts']}
                            setValue={setValue}
                            name='shifts'
                            multiple={true}
                            control={data}
                            error={Boolean(errors.shifts)}
                            helperText={errors.shifts && strings.forms.common.thisFieldIsRequired}
                            label={strings.forms.adPlacement.shifts}
                            options={getShiftTypes()}
                            nameKey={'name'}
                            valueKey={'id'}
                        />
                    </div>
                </div>

                <QuillEditorControl
                    name='description'
                    control={data}
                    rules={formRules['description']}
                    onChange={(data) => setValue('description', data)} 
                    error={Boolean(errors.description)}
                    helperText={errors.description && strings.forms.common.thisFieldIsRequired}
                    label={strings.forms.adPlacement.description}
                />

                <QuillEditorControl
                    name='shortDescription'
                    control={data}
                    defaultValue={values['shortDescription']}
                    maxLetters={100}
                    rules={formRules['shortDescription']}
                    onChange={(data) => setValue('shortDescription', data)} 
                    error={Boolean(errors.shortDescription)}
                    helperText={errors.shortDescription && strings.forms.common.thisFieldIsRequired}
                    label={strings.forms.adPlacement.shortDescription}
                    info={strings.forms.adPlacement.shortDescriptionInfo}
                />
                
                <Button variant="contained" className="button-primary" onClick={onSubmit}>
                    {submitButtonText}
                </Button>
                
            </form>
        </FormProvider>
    );
}

export default AdPlacementForm;