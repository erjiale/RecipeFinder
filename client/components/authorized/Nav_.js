import React from 'react';
import { Link } from 'react-router-dom';

const Nav_ = ({ location, logout, email }) => {
    const url = location.pathname.slice(1);
    return (
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
    );
};

export default Nav_;