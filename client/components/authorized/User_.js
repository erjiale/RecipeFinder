import React from 'react';

const User_ = props => {
    const { info } = props;
    return (
        <main>
            <h1>Welcome {info}!</h1>
            <p>You are successfully logged in</p>
        </main>
    );
};

export default User_;