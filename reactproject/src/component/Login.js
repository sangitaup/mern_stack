
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {

    const [email, setEmail]= React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const auth = localStorage.getItem('user');
      if(auth) {
          navigate("/")
      }
  }, [])
    const handleLogin= async()=>{
        console.warn(email,password)
        let result = await fetch("http://localhost:5000/login", {
          method:'post',
          body:JSON.stringify({email,password}),
          headers: {
            'Content-Type': 'application/json'
          },
        });
        result = await result.json();
        console.warn(result)
        if(result.auth)
        {
          localStorage.setItem("user",JSON.stringify(result.user));
          localStorage.setItem("token",JSON.stringify(result.auth));
          navigate("/")

        }else{
          alert("please enter correct details")
        }
    }
    
  return (
         
     <div className="container">
         <div className="jumbotron">
           <div className="row">
            <div className="col-md-4 mx-auto">
              <form>
                <div className="form-group">
                  <label>Email Address:</label>
                  <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} className="form-control" id="email" />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} className="form-control" id="password" />
                </div>
                <button type="button" onClick={handleLogin} className="btn btn-success " >Login</button>
              </form>

              </div>

            </div>

           </div>

          </div>

       

   
  );
};
export default Login;
