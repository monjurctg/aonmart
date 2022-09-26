import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import SimpleButton from '../master/simpleButton/SimpleButton';
import SimpleTooltip from '../master/simpleTooltip/SimpleTooltip';
import { deletePreviewImage, handleChangeProfileImg, updateProfilePhoto } from './_redux/action/UserAction';

const ChangeProfilePicture = ({ handleClose }) => {

    const dispatch = useDispatch()
    const userProfileUpdateInput = useSelector((state) => state.UserReducer.userProfileUpdateInput);
    const { register, errors, handleSubmit, setValue } = useForm();

    const [file, setFile] = useState({
        _method: "PUT",
        image: null
    })
    const handleChangeTextInput = (name, value, e = null) => {
        dispatch(handleChangeProfileImg(name, value, e));
        // const data = new FormData();
        // data.append("image", e.target.files[0]);
        // setFile({
        //     ...file,
        //     image: userProfileUpdateInput.imagePreview
        // })
    };

    const handleSubmitProfile = () => {
        dispatch(updateProfilePhoto(userProfileUpdateInput, handleClose));
    }

    return (
        <div className="item-wrapper one">
            <div className="item">
                <form
                    onSubmit={handleSubmit(handleSubmitProfile)}
                    method="post"
                    autoComplete="off"
                    encType="multipart/form-data"
                >
                    <div className="item-inner">
                        <div className="item-content">
                            <div className="image-upload">
                                {
                                    (userProfileUpdateInput.imagePreview !== null && userProfileUpdateInput.imagePreview !== "") ?
                                        <div className="imgPreview">
                                            <div className="removePreview">
                                                <SimpleTooltip title="Remove Preview Profile">
                                                    <i className="fa fa-times pointer"
                                                        onClick={() => dispatch(deletePreviewImage('image'))}
                                                    ></i>
                                                </SimpleTooltip>
                                            </div>
                                            <img src={userProfileUpdateInput.imagePreview} alt="Preview Profile Img" className="img-thumbnail" />
                                        </div>
                                        :
                                        <label for="file_upload">
                                            <i className="fas fa-cloud-upload-alt"></i>
                                            <div className="h-100">
                                                <div className="dplay-tbl">
                                                    <div className="dplay-tbl-cell"> <i class="fa fa-cloud-upload"></i>
                                                        <h5><b>Chose Your Photo To Upload</b></h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <input
                                                data-required="image"
                                                type="file"
                                                id="file_upload" className="image-input"
                                                data-traget-resolution="image_resolution"
                                                value=""
                                                name="image"
                                                onChange={(e) => handleChangeTextInput('image', e.target.files[0], e)}
                                            />
                                        </label>
                                }

                            </div>
                            {/* <div className="">
                                <SimpleButton text="Confirm" />
                            </div> */}
                            <button className="dash_submit_btn"  type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeProfilePicture;