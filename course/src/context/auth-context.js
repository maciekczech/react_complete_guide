import React from 'react'

const authContext = React.createContext({
    authenticated: false,
    authenticateUserHandler: () => {}
});

export default authContext;