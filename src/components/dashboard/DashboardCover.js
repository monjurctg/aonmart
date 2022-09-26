import React, { useEffect, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInformation } from './_redux/action/UserAction';
import userProfile from './../../assets/images/userProfile.png';
import SimpleLoading from '../master/simpleLoading/SimpleLoading';
import SimpleTooltip from '../master/simpleTooltip/SimpleTooltip';
import SimpleModel from '../master/simpleModal/SimpleModel';
import ChangeProfilePicture from './ChangeProfilePicture';
import ChangeCoverPhoto from './ChangeCoverPhoto';

const DashboardCover = () => {

    const dispatch = useDispatch();
    const singleUserInfo = useSelector((state) => state.UserReducer.singleUserInfo);
    const isLoading = useSelector((state) => state.UserReducer.isLoading);

    useEffect(() => {
        dispatch(getUserInformation());

    }, [])

    const [show, setShow] = useState(false);
    const [showCover, setShowCover] = useState(false);

    const handleShow = () => {
        setShow(true);
    }

    const handleShowCover = () => {
        setShowCover(true)
    }

    const handleClose = () => {
        setShow(false);
        setShowCover(false);
    }

    return (
        <React.Fragment>
            {
                typeof singleUserInfo !== "undefined" && singleUserInfo !== null && singleUserInfo !== "" && (
                    <div className="user_profile_cover"
                        style={{
                            backgroundImage: `url(${singleUserInfo.cover_image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
                        <div className="cover_before"></div>

                        <>
                            <div className="dashboard_profile_img">
                                <div className="dashboard_cover_inner">
                                    <img src={singleUserInfo.image ? singleUserInfo.image : userProfile} alt="" />
                                    <div className="dashboard_profile_change_section">
                                        <SimpleTooltip title="Change Profile Photo">
                                            <span className="profile_change_icon" onClick={() => handleShow()}> <i className="fas fa-edit"></i></span>
                                        </SimpleTooltip>
                                    </div>
                                </div>
                            </div>
                            <div className="dash_profile_name">
                                <h4 className="user_profile_name">{singleUserInfo.name}</h4>
                                <p className="user_email">{singleUserInfo.email}</p>
                            </div>
                        </>

                        <div className="change_dash_cover d-md-block d-none">
                            <button className="change_cover_btn btn" onClick={() => handleShowCover()}>
                                <span className="icon mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                    </svg>
                                </span>
                                <span>Change Cover</span>
                            </button>
                        </div>
                        <div className="change_dash_cover d-md-none d-block">
                            <SimpleTooltip title="Change Cover" position="left">
                                <button className="change_cover_btn btn" onClick={() => handleShowCover()}>
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                        </svg>
                                    </span>
                                </button>
                            </SimpleTooltip>
                        </div>

                        {
                            isLoading && (
                                <div className="p-3">
                                    <SimpleLoading color="#fff" type="spokes" />
                                </div>
                            )
                        }
                    </div >
                )
            }
            <SimpleModel
                show={show}
                size="md"
                handleClose={handleClose}
                onHide={handleClose}
                isCloseButton={true}
            >
                <ChangeProfilePicture handleClose={handleClose} />
            </SimpleModel>
            <SimpleModel
                show={showCover}
                size="md"
                handleClose={handleClose}
                onHide={handleClose}
                isCloseButton={true}
            >
                <ChangeCoverPhoto handleClose={handleClose} />
            </SimpleModel>
        </React.Fragment>
    );
};

export default memo(DashboardCover);