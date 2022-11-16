import React from 'react'
import { Link } from 'react-router-dom'
// import Search from './Search'
import Menu from './Menu'
import logo from "../../images/logo.png"

const Header = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3"
      style={{ position: 'sticky', top: 0, left: 0, zIndex: 9, background: "#e1eefc" }}
    >
      <Link className="navbar-brand" to="/">
        <img
          src={logo}
          alt="logo"
          style={{
            height: 45,
            width: 45,
            marginRight: "0.2rem",
          }}
        >
        </img>
        <strong className="text-muted">
          UET Review
        </strong>
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        {/* <Search /> */}
        <Menu />
      </div>
    </nav>
  )
}

export default Header