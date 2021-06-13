import React, { useContext, useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'
import { doesUsernameExist } from '../services/firebase'
import { Button } from '../GlobalStyles'

const SignUp = () => {
    const history = useHistory()
    const { firebase } = useContext(FirebaseContext)

    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    const isInvalid = password === '' || emailAddress === ''

    const handleSignUp = async (e) => {
        e.preventDefault()

        const userNameExists = await doesUsernameExist(username)
        if(!userNameExists){
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);

                // -> emailAddress & password & username (displayName)
                await createdUserResult.user.updateProfile({
                    displayName: username
                });

                // firebase user collection (create a document)
                await firebase
                .firestore()
                .collection('users')
                .add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: ['2'],
                    followers: [],
                    dateCreated: Date.now()
                });

                history.push(ROUTES.DASHBOARD);

            } catch (error) {
                setPassword('');
                setError(error.message);
            }
        } else {
            setUsername('');
            setError('That username is already taken, please try another.');
        }
    }

    useEffect(() => {
        document.title = 'Sign Up - Instagram'
    }, [])

    return (
        <SignUpContainer>
            <SIgnUpBox>
                <img src="/images/logo.png" alt="instagram" />
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <SignUpFrom onSubmit={handleSignUp} method="POST">
                    <Input
                        aria-label="Enter Your Username"
                        type="text"
                        placeholder="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        value={username}
                    />
                    <Input
                        aria-label="Enter Your Full Name"
                        type="text"
                        placeholder="Full Name"
                        onChange={({ target }) => setFullName(target.value)}
                        value={fullName}
                    />
                    <Input
                        aria-label="Enter Your Email Address"
                        type="email"
                        placeholder="Email"
                        onChange={({ target }) => setEmailAddress(target.value)}
                        value={emailAddress}
                    />
                    <Input
                        aria-label="Enter Your Password"
                        type="password"
                        placeholder="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        value={password}
                        autoComplete="on"
                    />
                    <Button
                        disabled={isInvalid}
                        type="submit"
                    >Log In</Button>
                </SignUpFrom>
            </SIgnUpBox>

            <LoginBox>
                <p>Have an account?</p>
                <Link to={ROUTES.LOGIN}>Log in</Link>
            </LoginBox>

            <AppBox>
                <p>Get the app.</p>
                <div>
                    <img src="/images/play-store.png" alt="play store" />
                    <img src="/images/app-store.png" alt="app store" />
                </div>
            </AppBox>
        </SignUpContainer>
    )
}

const SignUpContainer = styled.div`
    margin: 50px auto;
    max-width: 350px;
    width: 100%;

    @media  screen and  (max-width: 480px){
        margin: 20px auto;
    }
`

const SIgnUpBox = styled.div`
    margin: 12px 0 25px;
    padding: 10px 0 40px;
    border: 1px solid rgba(219,219,219,1);
    border-radius: 1px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media  screen and  (max-width: 480px){
        margin: 10px;
    }
    
    img {
        margin: 22px auto 12px;
    }
`

const ErrorMessage = styled.p`
    color: red;
    margin: 4px 20px;
    text-align: center;
`

const SignUpFrom = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 18px;
`

const Input = styled.input`
    margin: 0 40px 6px;
    padding: 9px 0 9px 8px;
    font-size: 16px;
    border-radius: 2px;
    background: rgba(250,250,250,1);
    border: 1px solid rgba(219,219,219,1);
    outline: none;

    &:focus {
        border: 1px solid rgba(168,168,168,1);
    }

    &::placeholder {
        color: rgba(142,142,142,1);
        font-size: 12px;
    }
`

const LoginBox = styled.div`
    margin: 12px 0;
    padding: 20px 0;
    border: 1px solid rgba(219,219,219,1);
    background: #ffffff;
    border-radius: 1px;
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 14px;

    @media  screen and  (max-width: 480px){
        margin: 10px;
    }

    a {
        color: #0095f6;
        margin-left: 5px;
    }
`

const AppBox = styled.div`
    text-align: center;

    p {
        margin: 10px 20px;
    }

    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;

        @media  screen and  (max-width: 320px){
            flex-direction: column;
        }

        img {
            height: 40px;
            margin: 0 4px;

            @media  screen and  (max-width: 320px){
                margin: 5px 4px; 
            }
        }
    }
`

export default SignUp
