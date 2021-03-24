// Libraries
import React, { useState } from "react";
import Store from "../../reducers/Store";
import Constants from "../../resources/constants.json";
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';

// Components
import { Redirect } from "react-router";
import Modal from "../../components/Modal";
import FlexRow from "../../components/FlexRow";

const ZINDEX_DEFAULT = 2;

const DeleteProfile = (props) => {

  const [redirect, setRedirect] = useState(false);
  const { authentication, users } = Store.getState();
  const [isDeleted, setIsDeleted] = useState(false);

  const align = props.align || "center";
  const background = props.background || "kit-bg-smoke-light";
  const zIndex = props.zIndex || ZINDEX_DEFAULT;


  const deleteAccount = () => {
    AuthenticationDispatcher.deleteAccount(authentication.userId);
    setIsDeleted(true);
    setTimeout(() => {
      setRedirect(true);
    }, 3500);
  };

  return (
    <Modal
      align={align}
      background={background}
      disableCloseButton={true}
      zIndex={zIndex}
      onClose={props.onClose}
    >
      <div className="container-fluid">
        <div className="row">
          <div className={props.className || ""} style={props.style}>
            <div className="row">

              {/* Close Button */}
              <FlexRow>
                <button
                  className="btn btn-dark"
                  style={{
                    position: "absolute",
                    top: "-2rem",
                    right: "1rem",
                    zIndex: Number(zIndex) + 1,
                  }}
                  onClick={() => props.onClose()}
                >
                  <svg
                    className="kit-icon-light kit-svg-white"
                    height="2rem"
                    width="2rem"
                    viewBox="4 4 8 8"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </FlexRow>

              {/* Header */}
              <div className="col-12 bg-white rounded p-2 kit-border-shadow">
                <FlexRow className="h-100 row d-flex justify-content-center" justify="start">
                  <h3>Are you sure you want to delete your account?</h3>

                </FlexRow>
              </div>

              {isDeleted &&

                <div>
                  <FlexRow>
                    <h1>Account successfully deleted</h1>
                    <div className="spinner-border ml-2" />
                  </FlexRow>
                </div>

              }

              {isDeleted && redirect &&

                <div>
                  <Redirect to="/home" />
                </div>

              }


              {/* Body */}
              <FlexRow className="col-12 mt-2">
                <div className="row rounded d-flex justify-content-center" wrap="no-wrap">

                  <button className="btn btn-info ml-2 text-black" onClick={() => props.onClose()} >
                    Cancel
                </button>
                  <button className="btn btn-success ml-2 text-black " onClick={deleteAccount}>
                    Yes/ Delete
                </button>
                </div>
              </FlexRow>

            </div>
          </div>
        </div>
      </div>

      {/* Redirects */}
      {redirect && <Redirect to={Constants.pagePaths.home}/>}

    </Modal>
  );
};


export default DeleteProfile;
