import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location, foundRecipe }) => {
    const url = location.pathname.slice(1);
    return (
        <nav>
            <div className="popularlink">
                <Link to='/popular' className={ url === 'popular' ? 'selected' : '' } >{ foundRecipe ? 'Your Recipes' : 'Recommended Recipes' }</Link>
            </div>
            <div className="loginregisterlink">
                <Link to='/login' className={ url === 'login' ? 'selected' : '' } >Login</Link>
                <Link to='/register' className={ url === 'register' ? 'selected' : '' } >Register</Link>
            </div>
        </nav>
    );
};

export default Nav;