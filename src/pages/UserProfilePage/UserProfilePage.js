import React from 'react';
import FlexColumn from '../../components/FlexColumn';
import NavBar from '../../componentgroups/NavBar_v0.0.1';
import './userProgileStyle.css'


const UserProfilePage = (props) => {


  return (

    <div>
      <NavBar />

      <FlexColumn className={"kit-bg-blue"} style={{ position: "absolute", height: "100vh", width: "100vw" }}>

        <div class="container emp-profile">
          <div class="row">
            <div class="col-md-4">
              <div class="profile-img">
                <h3> Utopia Airlines </h3>

                <p class="proile-rating">Miles earned : <span>11, 000</span></p>

              </div>
            </div>
            <div class="col-md-6">
              <div class="profile-head">

                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-2">
              <a href='/home' class="btn btn-primary"> Edit profile</a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
            </div>
            <div class="col-md-8">
              <div class="tab-content profile-tab" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div class="row">
                    <div class="col-md-6">
                      <label>Name</label>
                    </div>
                    <div class="col-md-6">
                      <p>Utopia Airlines</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Email</label>
                    </div>
                    <div class="col-md-6">
                      <p>utopia.ss.airlines@gmail.com</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div class="col-md-6">
                      <p>888 000 88888</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </FlexColumn>
    </div>
  )



}

export default UserProfilePage;
