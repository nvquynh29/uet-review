import React, { useState } from "react";

import { InputChange, FormSubmit } from "../../utils/TypeScript";

const RegisterForm = () => {
  const initialState = {
    name: "",
    account: "",
    password: "",
    cf_password: "",
  };
  const [userRegister, setUserRegister] = useState(initialState);
  const { name, account, password, cf_password } = userRegister;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    console.log(userRegister);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">
          Họ và tên
        </label>

        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={name}
          onChange={handleChangeInput}
          placeholder="Tên của bạn có tối đa 20 ký tự."
        />
      </div>

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
          placeholder="Example@gmail.com"
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
            placeholder="Mật khẩu phải có tối thiểu 6 ký tự."
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Ẩn" : "Hiện"}
          </small>
        </div>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Xác nhận mật khẩu
        </label>

        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            className="form-control"
            id="cf_password"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
            placeholder="Xác nhận lại mật khẩu của bạn."
          />

          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Ẩn" : "Hiện"}
          </small>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100 my-1">
        Đăng ký
      </button>
    </form>
  );
};

export default RegisterForm;
