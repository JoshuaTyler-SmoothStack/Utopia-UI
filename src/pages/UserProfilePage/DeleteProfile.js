// Libraries
import React, { useState } from "react";
import Store from "../../reducers/Store";
import Constants from "../../resources/constants.json";
import AuthenticationDispatcher from '../../dispatchers/AuthenticationDispatcher';

// Components
import { Redirect } from "react-router";
import Modal from "../../components/Modal";
import FlexRow from "../../components/FlexRow";
import FlexColumn from "../../components/FlexColumn";

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
      AuthenticationDispatcher.onLogout();
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
      <div className="container-fluid w-100">
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
              {!isDeleted &&
                <div className="col-12 bg-white rounded p-2 kit-border-shadow">
                  <FlexColumn className="h-100 column" justify="start" wrap="no-wrap">
                    <h3>Are you sure you want to delete your account?</h3>
                    <FlexRow>
                      <button className="btn btn-info ml-2 text-black" onClick={() => props.onClose()} >
                        Cancel
                </button>
                      <button className="btn btn-primary ml-2 text-black " onClick={deleteAccount}>
                        Yes/ Delete
                </button>
                    </FlexRow>
                  </FlexColumn>
                  {/* Body */}
                </div>
              }



              {isDeleted &&
                <div className="col-12 bg-white rounded p-2 kit-border-shadow">
                  <FlexColumn className="h-100 column" justify="start" wrap="no-wrap">
                    <h3>Account successfully deleted</h3>
                    <h5>Redirecting to home page  <div className="spinner-border ml-2" /></h5>
                  </FlexColumn>
                  {/* Body */}
                </div>
              }

              {isDeleted && redirect &&

                <div>
                  <Redirect to="/home" />
                </div>

              }

            </div>
          </div>
        </div>
      </div>

      {/* Redirects */}
      {redirect && <Redirect to={Constants.pagePaths.home} />}

    </Modal>
  );
};


export default DeleteProfile;
