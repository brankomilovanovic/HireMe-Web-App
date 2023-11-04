import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoaderContext from "../../Context/LoaderContext";
import AdPlacementForm from "../../Components/Forms/Ad/AdPlacementForm";
import { isEmpty } from "../../Components/Inputs/QuillEditorControl";
import { createAd, getAd, updateAd } from "../../Services/AdService";
import strings from '../../localization';
import { useSelector } from "react-redux";
import { getCityByName } from "../../Util/LocationUtil";

const formRules = {
  'title': { required: true },
  'description': { required: true },
  'address': { required: true },
  'shifts': { required: true },
  'city': { required: true },
  'jobType': { required: true },
  'shortDescription': { required: true },
  'adType': { required: true }
}

const AdPlacement = () => {

  const navigate = useNavigate();
  const {setLoading} = useContext(LoaderContext)

  const cities = useSelector((state) => state.location.cities)
  const authUser = useSelector((state) => state.auth.user);

  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    defaultValues: {}
  });
  const { data, handleSubmit, getValues, setValue, watch, setError, formState: { errors } } = form;

  const {id} = useParams();

  useEffect(() => {
    if(id && cities?.length > 0 && authUser) {
      fetchAd();
    }
  }, [id, cities, authUser]);

  const formatResponseData = (responseData) => {
    const formattedData = { ...responseData };
    
    if(formattedData?.shifts) {
      formattedData.shifts = formattedData.shifts.map((shift) => shift?.shiftType);
    }
  
    if(formattedData?.city) {
      formattedData.city = getCityByName(formattedData?.city, cities);
    }

    return formattedData;
  };

  const fetchAd = () => {
    setLoading(true)
    getAd({id}).then((response) => {
      if(response?.status !== 200 || response?.data?.user?.id !== authUser?.id) {
        navigate('/');
        return;
      }
      if (response?.data && response?.status === 200) {
        form.reset(formatResponseData(response.data));
      }
    }).finally(() => setLoading(false));
  }

  const onSubmit = (data) => {
    if(isEmpty(getValues()['description'])) {
      setError('description', { required: true });
      return;
    }

    setLoading(true);

    const transformData = {...data, city: data?.city?.name}

    if(!id) {
      createAd(transformData).then((response) => {
        if(response.status !== 200) {
          return;
        }
        navigate('/');
      }).finally(() => setLoading(false));
    } else {
      updateAd({id, ...transformData}).then((response) => {
        if(response.status !== 200) {
          return;
        }
      }).finally(() => setLoading(false));
    } 
  }
  
  return (
    <div className="ad-placement">
      <AdPlacementForm
        formRules={formRules}
        values={getValues()}
        setValue={setValue}
        submitButtonText={!id ? strings.forms.adPlacement.submit : strings.forms.adPlacement.edit}
        errors={errors} data={data} form={form} watch={watch}
        onSubmit={handleSubmit(onSubmit)} />

      { errorMessage && <p className="error" style={{textAlign: 'center'}}>{errorMessage}</p> }
    </div>
  );
};

export default AdPlacement;
