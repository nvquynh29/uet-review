import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { clearCookies, getAccessToken } from '../../utils/cookies'
import avatar from "../../images/avatar.png";
import { logout } from '../../api/auth';


const Menu = () => {
  const history = useHistory()
  const access_token = getAccessToken()
  const { pathname } = useLocation()

  const bfLoginLinks = [
    { label: 'Đăng nhập', path: '/login' },
    { label: 'Đăng ký', path: '/register' }
  ]

  const afLoginLinks = [
    { label: 'Viết bài Review', path: '/create_review' }
  ]

  const navLinks = access_token ? afLoginLinks : bfLoginLinks

  const isActive = (pn: string) => {
    if (pn === pathname) return 'active';
  }

  const handleLogout = async () => {
    try {
      await logout()
      clearCookies('_id')
      clearCookies('accessToken')
      clearCookies('refreshToken')
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <ul className="navbar-nav ms-auto">
      {
        navLinks.map((link, index) => (
          <li key={index} className={`nav-item ${isActive(link.path)}`}>
            <Link className="nav-link" to={link.path}>{link.label}</Link>
          </li>
        ))
      }

      {
        access_token &&
        <li className="nav-item dropdown">
          <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={avatar} alt="avatar" className="avatar" />
          </span>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{position: 'absolute', transform: 'translate(-90px, 0)'}}>
            <li>
              <Link className="dropdown-item"
                to={`/profile`}
              >
                Hồ sơ
              </Link>
            </li>

            <li><hr className="dropdown-divider" /></li>

            <li>
              <Link className="dropdown-item" to="/"
                onClick={handleLogout}>
                Đăng xuất
              </Link>
            </li>

          </ul>
        </li>
      }

    </ul>
  )
}

export default Menu