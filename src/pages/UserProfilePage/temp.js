<div className="container emp-profile">
              <div className="row">
                <div className="col-md-4">

                  <h3>{user.firstName} {user.lastName} </h3>
                  <p className="proile-rating">Miles earned : <span>11, 000</span></p>
                  <br />
                  <button variant="primary" className="btn btn-primary" onClick={handleShow}>
                    Delete account </button>
                  <br />
                  <button variant="primary" className="btn btn-primary" onClick={handleShow}>
                    Delete account </button>


                </div>
                <div className="col-md-6">
                  <div className="profile-head">

                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Upcoming flights</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-8">
                  <div className="tab-content profile-tab" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                      <div className="row">
                        <div className="col-md-6">
                          <label>Email</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.email}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Phone</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.phone}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <button variant="primary" className="btn btn-primary" onClick={handleShow}>
                            Delete account </button>
                        </div>

                        <div className="col-md-6">
                          <a href='/home' className="btn btn-primary"> Edit profile</a>

                        </div>

                      </div>





                    </div>
                  </div>
                </div>
              </div>
            </div>

          }