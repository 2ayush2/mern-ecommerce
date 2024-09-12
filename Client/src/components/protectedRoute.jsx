import { useContext } from 'react';
import { UserContext } from '../context/userContext';

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const { user,loading,error } = useContext(UserContext);
console.log(error)




    // Render the children if the user has the right role
    return children;
};

export default ProtectedRoute;
