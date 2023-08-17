import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    console.warn(name, lastName, email, password, confirmPassword);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, lastName, email, password, confirmPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate("/");
  };
  return (
    <>
    <div className="container">
        <div className="row-centered-form">
        <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4 mx-auto">
        
              <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Registration Form</h3>
              </div>
              <div className="panel-body">
                <form >
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                          <input
                          type="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control name"
                          placeholder="enter name"
                        />
                      </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        
                        <input
                          type="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="form-control name"
                          placeholder="enter name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                  
                
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control email"
                      placeholder="enter email"
                    />
                  </div>

                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                      
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control pwd"
                          placeholder="password"
                        />
                      </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                     
                      
                        <input
                          type="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="form-control pwd"
                          placeholder="confirm password"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={collectData}
                    className="btn btn-success form-control"
                  >
                    SignUp{" "}
                  </button>
                </form>
              </div>
             
            </div>
          </div>
        </div>
    </div> 
   
    </>
  );
};
export default SignUp;
