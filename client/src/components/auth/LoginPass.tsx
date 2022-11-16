import React, { useState } from "react";
import { login } from '../../api/auth';
import Cookies from 'universal-cookie'
import { FormSubmit, ICredential, InputChange } from "../../utils/TypeScript";
import { useHistory } from "react-router-dom";

const cookies = new Cookies()
const LoginPass = () => {
  const initialState = { account: "", password: "" };
  const [userLogin, setUserLogin] = useState(initialState);
  const { account, password } = userLogin;
  const history = useHistory()

  const [typePass, setTypePass] = useState(false);

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const writeCookies = (accessToken: string, refreshToken: string, _id: string, nickname: string) => {
    cookies.set('accessToken', accessToken, { 
        path: '/', 
        maxAge: 24 * 60 * 60, // 1d
       })
    cookies.set('_id', _id, { 
        path: '/', 
        maxAge: 24 * 60 * 60,
       })
    cookies.set('nickname', nickname, { 
        path: '/', 
        maxAge: 24 * 60 * 60,
       })
    if (refreshToken) {
      cookies.set('refreshToken', refreshToken, { 
        path: '/', 
        maxAge: 30 * 24 * 60 * 60, // 30d
       })
    }
  }

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    const { accessToken, refreshToken, _id, nickname } = await login({
      email: userLogin.account,
      password: userLogin.password,
    } as ICredential)
    writeCookies(accessToken, refreshToken, _id, nickname)
    history.push('/')
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Email
        </label>

        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Mật khẩu
        </label>

        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Ẩn" : "Hiện"}
          </small>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100 mt-1"
        disabled={account && password ? false : true}
      >
        Đăng nhập
      </button>
    </form>
  );
};

export default LoginPass;
