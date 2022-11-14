import React from 'react'
import { Link } from 'react-router-dom'
import LoginPass from '../components/auth/LoginPass'

const Login = () => {

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Đăng nhập</h3>

        <LoginPass />

        <small className="row my-2 text-primary" style={{ cursor: 'pointer' }}>
          <span className="col-6">
            <Link to='/forgot_password'>
              Quên mật khẩu?
            </Link>
          </span>

        </small>

        <p>
          {`Bạn chưa có tài khoản? `}
          <Link to={`/register`} style={{ color: 'crimson' }}>
            Đăng ký ngay
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login