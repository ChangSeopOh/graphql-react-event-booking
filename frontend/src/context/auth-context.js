//this is such as session
import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    login: (toekn, userId, tokenExpiration) =>{},
    logout: ()=>{}
});