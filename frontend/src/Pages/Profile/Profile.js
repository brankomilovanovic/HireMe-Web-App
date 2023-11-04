import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoleName } from "../../Constants/Role";
import { UserType, getUserTypeName } from "../../Constants/UserType";
import { ImageFormats, toBase64 } from "../../Util/ImageUtil";
import { getCurrentUser, getUser, updateUser } from "../../Services/UserService";
import strings from "../../localization";
import { useParams } from "react-router-dom";
import LoaderContext from "../../Context/LoaderContext";
import { Avatar, Button, Divider } from "@mui/material";
import { setUser } from "../../Slices/AuthSlice";
import { useDropzone } from "react-dropzone";
import FullScreenModal from "../../Components/FullScreenModal";
import { useForm } from "react-hook-form";
import ValidationPatters from "../../Base/ValidationPatters";
import EditUserForm from "../../Components/Forms/User/EditUserForm";

const formRules = {
  'name': { required: true },
  'surname': { required: true },
  'email': {required: { value: true, message: strings.forms.common.thisFieldIsRequired},
        pattern: { value: ValidationPatters.EMAIL, message: strings.forms.common.emailFormatError }},
  'username': { required: true },
  'password': { required: true },
  'userType': { required: true }
}

const Profile = () => {

  const {setLoading} = useContext(LoaderContext)
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);

  const param = useParams();

  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);

  const form = useForm();
  const { data, handleSubmit, getValues, setValue, watch, formState: { errors } } = form;

  const {getRootProps, getInputProps} = useDropzone({
    onDrop: files => uploadProfileImage(files[0]),
    accept: ImageFormats,
    multiple: false
  });

  useEffect(() => {
      fetchUser();
  }, [param]);

  const formatResponseData = (responseData) => {
    const formattedData = { ...responseData };
    
    if(formattedData?.userCompany) {
      formattedData.companyAddress = formattedData.userCompany?.address;
      formattedData.companyName = formattedData.userCompany?.name;
    }

    if(formattedData?.userIndividual) {
      formattedData.individualAddress = formattedData.userIndividual?.address;
    }

    return formattedData;
  };

  const fetchUser = () => {
    setLoading(true);

    if(param?.id) {
      getUser({id: param?.id, extend: true}).then(response => {
        setCurrentUser(response?.data);
      }).finally(() => setLoading(false));
      return;
    }

    getCurrentUser({extend: true}).then(response => {
      setCurrentUser(response?.data);
    }).finally(() => setLoading(false));
  }

  const uploadProfileImage = async (file) => {
    const image = await toBase64(file);
    if(image) {
      setLoading(true)
      setErrorMessage("");
      updateUser({id: currentUser?.id, profileImage: image}).then((response) => {
        if(response.status !== 200) {
          return setErrorMessage(response?.data?.message);
        }
        if(!param?.id) {
          dispatch(setUser(response?.data));
        }
        setCurrentUser(response?.data)
      }).finally(() => setLoading(false));
    }
  }

  const onSubmit = (data) => {
    setLoading(true);
    updateUser(data).then(response => {
      if(response.status !== 200) {
        return setFormErrorMessage(response?.data?.message)
      }
      fetchUser();
    }).finally(() => setLoading(false));
  }

  const handleShowEditModal = () => {
    if(currentUser?.id) {
      form.reset(formatResponseData(currentUser));
      setShowEditModal(true);
    }
  }

  return (
    <div className="profile-container">
        <div className="title" style={{fontSize: '40px'}}>{strings.base.profile.myAccount}</div>
        <div className="profile-card">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <Avatar src={currentUser?.profileImage} className="profile-image" />
            </div>
            <div className="details-conteiner">
              <div class="info-row">
                  <span class="label">{strings.base.profile.name}</span>
                  <span class="value">{currentUser?.name}</span>
              </div>
              <div class="info-row">
                  <span class="label">{strings.base.profile.surname}</span>
                  <span class="value">{currentUser?.surname}</span>
              </div>
              <div class="info-row">
                  <span class="label">{strings.base.profile.username}</span>
                  <span class="value">{currentUser?.username}</span>
              </div>
              <div class="info-row">
                  <span class="label">{strings.base.profile.email}</span>
                  <span class="value">{currentUser?.email}</span>
              </div>
              <div class="info-row">
                  <span class="label">{strings.base.profile.role}</span>
                  <span class="value">{getRoleName(currentUser?.role)}</span>
              </div>
              <Divider />
              <div class="info-row">
                  <span class="label">{strings.base.profile.userType}</span>
                  <span class="value">{getUserTypeName(currentUser?.userType)}</span>
              </div>

              { currentUser?.userType === UserType.COMPANY && 
                <>
                  <div class="info-row">
                      <span class="label">{strings.base.company.companyName}</span>
                      <span class="value">{currentUser?.userCompany?.name}</span>
                  </div>
                  <div class="info-row">
                      <span class="label">{strings.base.company.companyAddress}</span>
                      <span class="value">{currentUser?.userCompany?.address}</span>
                  </div>
                </> 
              }

              { currentUser?.userType === UserType.INDIVIDUAL && 
                <div class="info-row">
                    <span class="label">{strings.base.individual.individualAddress}</span>
                    <span class="value">{currentUser?.userIndividual?.address}</span>
                </div>
              }

              { authUser?.id === currentUser?.id && 
                <Button variant="contained" style={{width: '12rem'}} onClick={handleShowEditModal} className="button-primary">
                  {strings.base.profile.editAccount}
                </Button>
              }
            </div>
        </div>

        { errorMessage && <p className="error" style={{textAlign: 'center'}}>{errorMessage}</p> }

        <FullScreenModal open={showEditModal} onClose={() => setShowEditModal(false)} title={strings.base.profile.editAccount}>
          <EditUserForm
              formRules={formRules}
              values={getValues()}
              watch={watch}
              setValue={setValue}
              errors={errors} data={data} form={form}
              onSubmit={handleSubmit(onSubmit)} />
            { formErrorMessage && <p className="error" style={{textAlign: 'center'}}>{formErrorMessage}</p> }
        </FullScreenModal>
    </div>
  );
};

export default Profile;