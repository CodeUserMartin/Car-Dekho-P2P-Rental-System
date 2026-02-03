import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';



export const ClerkDataComponent = () => {
    return (
        <div id='ClerkComponent'
            className='border border-2'
        >
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}
