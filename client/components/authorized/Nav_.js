import React from 'react';
import { Link } from 'react-router-dom';

const Nav_ = ({ location, logout, email, user }) => {
    const url = location.pathname.slice(1);
    return (
        <main>
            { !user.admin ?
                <nav>
                    <div className="popularlink">
                        <Link to='/popular' className={ url === 'popular' ? 'selected' : '' } >Recommended💎</Link>
                        <Link to='/favorite' className={ url === 'favorite' ? 'selected' : '' } >Your Favorites😍</Link>
                    </div>
                    <div className="loginregisterlink">
                        <Link to='/store' className={ url === 'store' ? 'selected' : '' }>Store🏪</Link>
                        <Link to={`/user/${email}`} className={ url === `user/${email}` ? 'selected' : '' } >Your Orders🍴</Link>
                        <Link to='/login' onClick={ () => logout() } >Logout❌</Link> 
                    </div>
                </nav>
                :
                <nav>
                    <div className="popularlink">
                        <Link to='/popular' className={ url === 'popular' ? 'selected' : '' } >Recommended💎</Link>
                        <Link to='/favorite' className={ url === 'favorite' ? 'selected' : '' } >Your Favorites😍</Link>
                    </div>
                    <div className="loginregisterlink">
                        <Link to='/store' className={ url === 'store' ? 'selected' : '' }>Store🏪</Link>
                        <Link to={`/user/${email}`} className={ url === `user/${email}` ? 'selected' : '' } >Profile</Link>
                        <Link to='/login' onClick={ () => logout() } >Logout❌</Link>
                    </div>
                </nav>
            }
        </main>
        
        
    );
};

export default Nav_;