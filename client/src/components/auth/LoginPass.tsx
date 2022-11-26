import { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import { login } from '../../api/auth';
import { configAxios } from '../../api/axios';
import { Cookie, FormSubmit, ICredential, InputChange } from "../../utils/TypeScript";

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

  const writeCookies = (cookie: Cookie) => {
    const maxAge = 24 * 60 * 60 // 1d
    const options = { path: '/', maxAge }
    cookies.set('accessToken', cookie.accessToken, options )
    cookies.set('_id', cookie._id, options)
    cookies.set('nickname', cookie.nickname, options)
    cookies.set('role', cookie.role, options)
    if (cookie.refreshToken) {
      cookies.set('refreshToken', cookie.refreshToken, { 
        path: '/', 
        maxAge: 30 * maxAge, // 30d
       })
    }
    configAxios()
  }

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    const cookie: Cookie = await login({
      email: userLogin.account,
      password: userLogin.password,
    } as ICredential)
    writeCookies(cookie)
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
