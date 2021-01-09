import React, { useState } from 'react';
import Hamburger from './Hamburger'
import { Link } from 'react-router-dom'



const NavBar = ({ hidden }) => {
    const [isHamburgerActive,setIsHamburgerActive] = useState('')
    const [mobileMenuItemsVisible,setMobileMenuItemsVisible] = useState('')

    const onHamburgerClick = (e) => {
        
        if(isHamburgerActive === ''){
            setIsHamburgerActive('is-active')
            setMobileMenuItemsVisible('visible')
        } else {
            setIsHamburgerActive('')
        }
    }

    const onMobileMenuItemClick = () => {
        if( mobileMenuItemsVisible === 'visible' ){
            setMobileMenuItemsVisible('')
            return setIsHamburgerActive('')
        }
        
    }

    const isHiddenClass = () => {
        return hidden ? 'is-hidden' : ''
    }

    return(
        <nav className={`navbar is-light ${isHiddenClass()}`} role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Hamburger onHamburgerClick={onHamburgerClick} isActive={isHamburgerActive}/>
            </div>

            <div id="navbarBasicExample" className={`navbar-menu ${isHamburgerActive}`}>
                <div className="navbar-start">
                    <Link onClick={onMobileMenuItemClick} to="/" className={`navbar-item ${mobileMenuItemsVisible}`}>Datos</Link>
                    <Link onClick={onMobileMenuItemClick} to="/items" className={`navbar-item ${mobileMenuItemsVisible}`}>Equipos</Link>
                    <Link onClick={onMobileMenuItemClick} to="/itempersonalizado" className={`navbar-item ${mobileMenuItemsVisible}`}>Item personalizado</Link>
                    <Link onClick={onMobileMenuItemClick} to="/porcentajecobro" className={`navbar-item ${mobileMenuItemsVisible}`}>Ingresar porcentaje de cobro</Link>
                    <Link onClick={onMobileMenuItemClick} to="/previewcotizacion" className={`navbar-item ${mobileMenuItemsVisible}`}>Vista previa</Link>

                {/* <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                    More
                    </a>

                    <div className="navbar-dropdown">
                    <a className="navbar-item">
                        About
                    </a>
                    <a className="navbar-item">
                        Jobs
                    </a>
                    <a className="navbar-item">
                        Contact
                    </a>
                    <hr className="navbar-divider"/>
                    <a className="navbar-item">
                        Report an issue
                    </a>
                    </div>
                </div> */}
                </div>

                <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <Link to='/' className="button is-primary">
                            <strong>Admin</strong>
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        </nav>

    )
}

export default NavBar;
                        