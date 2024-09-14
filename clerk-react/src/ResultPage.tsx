import { useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

const ResultPage = () => {
    const location = useLocation();
    const formData = location.state as { [key: string]: string };

    return (
        <div>
            <h1>Your Tailored Diet Plan</h1>
            <p>Based on the information you provided, here's what we recommend:</p>
            {/* Display results here */}
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
};

export default ResultPage;
