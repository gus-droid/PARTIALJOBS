import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
    return (
        <div style={{
            position: 'fixed',  // Makes the header float and remain visible
            top: 0,            // Aligns it to the top of the viewport
            right: 0,          // Aligns it to the right of the viewport
            zIndex: 1000,      // Ensures it stays on top of other content
            padding: '10px'    // Adds some spacing around the buttons
        }}>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
};

export default Header;
