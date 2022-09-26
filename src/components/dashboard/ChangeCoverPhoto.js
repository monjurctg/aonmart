import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import SimpleButton from '../master/simpleButton/SimpleButton';
import SimpleTooltip from '../master/simpleTooltip/SimpleTooltip';
import { deletePreviewImage, handleChangeProfileImg, updateProfilePhoto } from './_redux/action/UserAction';
import axios from 'axios'
const ChangeCoverPhoto = ({ handleClose }) => {

    const dispatch = useDispatch()
    const userProfileUpdateInput = useSelector((state) => state.UserReducer.userProfileUpdateInput);
    const { register, errors, handleSubmit, setValue } = useForm();


    const [imgFile, setImgFile] = useState(null);

    const handleChangeFile = (e) => {

        const file = e.target.files[0];
        setImgFile({ file: file })
    }
    // const handleSubmitProfile = () => {
    //     dispatch(updateProfilePhoto(userProfileUpdateInput, handleClose));
    // }

    const handleSubmitProfile = (e) => {
        var formData = new FormData();
        formData.append("cover_image", imgFile.file);

        // axios.post('http://beta.aonmart.net/api/v1/update-cover-photo', imgFile, {
        //     headers: {
        //         // 'Content-Type': 'multipart/form-data',
        //         'Accept': "application/json",
        //         'Authorization': `Bearer 5|lVSRnA69B3IRBd0zG0y5lHJVeWMS1hoKcd4gw66t`,
        //     }
        // })

        axios({
            url: 'http://beta.aonmart.net/api/v1/update-cover-photo',
            method: "PUT",
            headers: {
                'Accept': "application/json",
                'Authorization': `Bearer 5|lVSRnA69B3IRBd0zG0y5lHJVeWMS1hoKcd4gw66t`,
            },
            data: imgFile.file
        }).then((res) => {
        }).catch((err) => {
        })
        e.preventDefault()
    }

    return (
        <div className="item-wrapper one">
            <div className="item">
                <form
                    // onSubmit={handleSubmit(handleSubmitProfile)}
                    // method="post"
                    // autoComplete="off"
                    // encType="multipart/form-data"
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
                                                        <h5><b>Chose a cover photo</b></h5>
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
                                                // onChange={(e) => handleChangeTextInput('image', e.target.files[0], e)}
                                                onChange={(e) => handleChangeFile(e)}
                                            />
                                        </label>
                                }

                            </div>
                            {/* <div className="">
                                <SimpleButton text="Confirm" />
                            </div> */}
                            <button className="dash_submit_btn" onClick={(e) => handleSubmitProfile(e)} type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeCoverPhoto;