import React from 'react'

const Hamburger = ({ onHamburgerClick }) => {
    return(
        <a onClick={(e) => onHamburgerClick(e) } role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
        </a>
    )
}

export default Hamburger;