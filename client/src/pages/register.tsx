import React from 'react'
import { Link } from 'react-router-dom'

import RegisterForm from '../components/auth/RegisterForm'

const Register = () => {

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Đăng ký</h3>

        <RegisterForm />
        
        <p className="mt-2">
          {`Bạn đã có tài khoản? `}
          <Link to={`/login`} style={{color: 'crimson'}}>
            Đăng nhập ngay
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register