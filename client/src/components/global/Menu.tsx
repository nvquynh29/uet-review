import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getAccessToken } from '../../utils/cookies'
import avatar from "../../images/avatar.png";


const Menu = () => {
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

  const handleLogout = () => {
    if (!access_token) return;
    console.log("Log out:" + access_token)
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

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
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