import "../css/LoginPage.css"
import {useEffect, useState} from "react";
import {baseurl, getLoginUser, setLoginUser} from "../config";
import {post} from "../utils";

// import {post} from "../utils";

export function LoginPage(props) {

  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")

  useEffect(() => {
    setLoginUser("")
  }, [])

  return (<div className={"div-login"}>
    <div>
      <h1>Login</h1>
    </div>
    <div className={"field"}>
      <span>Username: </span>
      <input placeholder={"username"} type={"text"} value={username} onChange={e => setUsername(e.target.value)}/>
    </div>
    <div className={"field"}>
      <span>Password: </span>
      <input placeholder={"password"} type={"password"} value={password} onChange={e => setPassword(e.target.value)}/>
    </div>
    <div>
      <button className={"btn-ok"} onClick={async () => {
        let r = await post(`${baseurl}/login`, {username, password})
        if (r.success) {
          setLoginUser(username)
          console.log(getLoginUser())
          window.location = '/home'
        } else {
          alert("Error username or password")
          window.location = '/'
        }
      }}>Login
      </button>
      <a className={"a-register"} onClick={() => {
        window.location = "/register"
      }}>Register
      </a>
    </div>
  </div>)
}

LoginPage.propTypes = {};
