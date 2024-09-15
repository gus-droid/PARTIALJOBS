import { Navigate, useLocation } from 'react-router-dom';
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isSignedIn } = useUser();
    const location = useLocation();

    if (!isSignedIn) {
        // Redirect them to the login page, but save the current location they were trying to go to
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;;