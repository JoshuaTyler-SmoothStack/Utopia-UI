// Libraries
import React, { Component } from "react";
import { Redirect } from "react-router";
import Store from "../../reducers/Store";
import UsersDispatcher from "../../dispatchers/UsersDispatcher";
import Constants from "../../resources/constants.json";

// Components
import NavBar from "../../componentgroups/NavBar";
import FlexRow from "../../components/FlexRow";
import FlexColumn from "../../components/FlexColumn";

const STYLE_INPUTTEXT = "form-control mb-2 ";

class UserProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
    };
  }

  render() {
    const { users } = Store.getState();
    const { redirectToHome } = this.state;

    return (
      <div className="container-fluid" style={{ height: "100vh", width: "100vw", maxWidth:"1400px",  overflowY: "hidden" }}>
        <div className="row">

          {/* Navbar */}
          <NavBar className="col-12"/>

          {/* Pending */}
          {!users.selected && <div className="spinner-border"/>}

          {/* Body */}
          {users.selected &&
          <div className="col-12">
            <div className="row">
              
              {/* Search Flights Header */}
              <FlexRow className="col-12 col-md-8 col-lg-6 p-3" justify="start">
                <div className="row">
                  {/* Firstname */}
                  <FlexColumn className="col-12 col-sm-6 mb-3" justify="start" style={{width: "30rem"}}>
                    <h5 className="mr-auto">First Name</h5>
                    <input
                      className={STYLE_INPUTTEXT}
                      readOnly
                      value={users.selected.userFirstName}
                    />
                  </FlexColumn>

                  {/* Lastname */}
                  <FlexColumn className="col-12 col-sm-6 mb-3" justify="start" style={{width: "30rem"}}>
                    <h5 className="mr-auto">Last Name</h5>
                    <input
                      className={STYLE_INPUTTEXT}
                      readOnly
                      value={users.selected.userLastName}
                    />
                  </FlexColumn>

                  {/* Email */}
                  <FlexColumn className="col-12 col-sm-6 mb-3" justify="start" style={{width: "30rem"}}>
                    <h5 className="mr-auto">Email</h5>
                    <input
                      className={STYLE_INPUTTEXT}
                      readOnly
                      value={users.selected.userEmail}
                    />
                  </FlexColumn>

                  {/* Phone */}
                  <FlexColumn className="col-12 col-sm-6 mb-3" justify="start" style={{width: "30rem"}}>
                    <h5 className="mr-auto">Phone</h5>
                    <input
                      className={STYLE_INPUTTEXT}
                      readOnly
                      value={users.selected.userPhone}
                    />
                  </FlexColumn>

                </div>
              </FlexRow>

              {/* User Miles */}
              <FlexRow className="col-10 col-md-4 ml-auto mr-auto m-md-auto" style={{height: "15rem"}}>
                <FlexColumn className="p-2 rounded kit-bg-blue kit-border-shadow">
                  <h1 className="text-center kit-cursive text-white kit-text-shadow-sm">
                    {"User Miles"}
                  </h1>
                  <h5 className="text-center text-white w-75">You've got XXX miles!</h5>
                </FlexColumn>
              </FlexRow>

              {/* Upcoming Flights */}
              <FlexRow className="col-12 bg-warning rounded kit-border-shadow">
                Upcoming Flights
              </FlexRow>

            </div>
          </div>} {/* Body-End */}

          {/* Redirects */}
          {redirectToHome && <Redirect to={Constants.pagePaths.home}/>}

        </div>
      </div>
    );
  }

  componentDidMount() {
    const { authentication, users } = Store.getState();
    if(!users.selected.userId) {
      UsersDispatcher.onRequestThenCallback(
        "/" + authentication.userId,
        (onError) => /*this.setState({redirectToHome: false}*/ UsersDispatcher.onSelectItem(
          {
            userFirstName: "TURAL",
            userLastName: "HASANLI",
            userEmail: "Aaa1@gmail.commmmm",
            userPassword: "jdsfskljlk@9ffsssFF",
            userPhone: "75471517166444",
          }
        ),
        (onSuccess) => UsersDispatcher.onSelectItem(        {
          userFirstName: "TURAL",
          userLastName: "HASANLI",
          userEmail: "Aaa1@gmail.commmmm",
          userPassword: "jdsfskljlk@9ffsssFF",
          userPhone: "75471517166444",
        })
      );
    }

    // if(!flights.search.results.length === 3) {

    // }
  }
}
export default UserProfilePage;
