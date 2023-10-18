import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password})
      });
      const json = await response.json();
      console.log(json)
      if(json.success)
          {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/login")
            props.showAlert("Account Created Successfully", "success")
          }
          else
          {
            props.showAlert("Invalid Details", "danger")
          }
      
}
const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <div className="container mt-3">
      <h2>Create a Account to use with iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="cpassword">Confirm password</label>
          <input
            type="text"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>{" "}
    </div>
  );
};

export default Signup;
