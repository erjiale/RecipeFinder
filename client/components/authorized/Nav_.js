import React from 'react';
import { Link } from 'react-router-dom';

const Nav_ = ({ location, logout, email }) => {
    const url = location.pathname.slice(1);
    return (
        
        <nav
        id="mainNavbar"
        class="navbar navbar-expand-lg navbar-dark bg-transparent"
        >
        <a class="navbar-brand" href="#">RECIPE FINDER</a>
        <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
            <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Recipes
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#/search">Search by Ingredients</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#/popular">Popular Recipes</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#/favorite">Saved Recipes</a>
            </div>
            </li>
            <li class="nav-item">
            <Link to='/login' onClick={ () => logout() } className="nav-link">Log Out</Link> 
            </li>
        </ul>
        </div>
    </nav>

    );
};

export default Nav_;
{/*
        <nav>
            <div className="popularlink">
                <Link to='/popular' className={ url === 'popular' ? 'selected' : '' } >Popular Recipes</Link>
                <Link to='/favorite' className={ url === 'favorite' ? 'selected' : '' } >Favorite Recipes</Link>
            </div>
            <div className="loginregisterlink">
                <Link to={`/user/${email}`} className={ url === 'user' ? 'selected' : '' } >My Profile</Link>
                <Link to='/login' onClick={ () => logout() } >Log Out</Link> 
            </div>
        </nav>
*/}