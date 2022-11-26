import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { clearCookies, getAccessToken, getCookie } from '../../utils/cookies'
import avatar from "../../images/avatar.png";
import { logout } from '../../api/auth';
import { getProfile } from '../../api/profile';
import { ICredential } from '../../utils/TypeScript';


const Menu = () => {
  const history = useHistory()
  const access_token = getAccessToken()
  const { pathname } = useLocation()
  const [name, setName] = useState("");
  const [role, setRole] = useState("user")

  const bfLoginLinks = [
    { label: 'Đăng nhập', path: '/login' },
    { label: 'Đăng ký', path: '/register' }
  ]

  const afLoginLinks = (role !== "admin") ? [
    { label: 'Viết bài Review', path: '/create_review' }
  ] : 
  [
    { label: 'Xem report', path: '/admin/report' }
  ]

  const navLinks = access_token ? afLoginLinks : bfLoginLinks

  const isActive = (pn: string) => {
    if (pn === pathname) return 'active';
  }

  useEffect(() => {
    const nickname = getCookie('nickname')
    const role = getCookie('role')
    if (nickname) {
      setName(nickname)
      setRole(role)
    }
    // fetchProfile();
  }, [name, access_token]);

  // const fetchProfile = useCallback(async () => {
  //   try {
  //     if (access_token) {
  //       const { data } = await getProfile();
  //       setName(data.nickname)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const handleLogout = async () => {
    try {
      clearCookies('_id')
      clearCookies('accessToken')
      clearCookies('refreshToken')
      clearCookies('nickname')
      clearCookies('role')
      await logout()
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
            <small className="text-muted">
              {name}
            </small>
          </span>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ position: 'absolute', transform: 'translate(0, 0)' }}>
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
