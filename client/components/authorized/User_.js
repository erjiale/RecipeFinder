import React, { Component } from 'react';
import Admin_ from './Admin_';
import Messages_ from './Messages_';

const User_ = props => {
    const { user } = props;
    return (
        <main>
            <p>You are successfully logged in as { user.name } { user.admin ? '(admin)' : '' }</p>
            {
                user.admin ? <Admin_ user={ user } /> : <Messages_ user={ user } /> 
            }
        </main>
    );
};

export default User_;