import React, { useContext, useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'
import { Button } from '../GlobalStyles'

const Login = () => {
    const history = useHistory()
    const { firebase } = useContext(FirebaseContext)

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    const isInvalid = password === '' || emailAddress === ''

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password)
            history.push(ROUTES.DASHBOARD)
        } catch (error) {
            setPassword('')
            setError(error.message)
        }
    }

    useEffect(() => {
        document.title = 'Login - Instagram'
    }, [])

    return (
        <LoginContainer>
            <LoginImg>
                <img 
                    src="/images/iphone-with-profile.jpg" 
                    alt="login page" 
                />
            </LoginImg>
            
            <LoginMain>
                <LoginBox>
                    <img src="/images/logo.png" alt="instagram" />
                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <LoginFrom onSubmit={handleLogin} method="POST">
                        <Input
                            aria-label="Enter Your Email Address"
                            type="email"
                            placeholder="Email"
                            onChange={({ target }) => setEmailAddress(target.value)}
                        />
                        <Input
                            aria-label="Enter Your Password"
                            type="password"
                            placeholder="Password"
                            onChange={({ target }) => setPassword(target.value)}
                            autoComplete="on"
                        />
                        <Button
                            disabled={isInvalid}
                            type="submit"
                        >Log In</Button>
                    </LoginFrom>
                </LoginBox>

                <SignUpBox>
                    <p>Don't have an account?</p>
                    <Link to={ROUTES.SIGN_UP}>Sign up</Link>
                </SignUpBox>

                <AppBox>
                    <p>Get the app.</p>
                    <div>
                        <img src="/images/play-store.png" alt="play store" />
                        <img src="/images/app-store.png" alt="app store" />
                    </div>
                </AppBox>
            </LoginMain>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0 auto;
    max-width: 935px;
    width: 100%;
`

const LoginImg = styled.div`
    height: 580px;

    @media  screen and  (max-width: 875px){
        display: none;
    }

    img {
        height: 100%;
    }
`

const LoginMain = styled.div`
    max-width: 350px;
    width: 100%;

    @media  screen and  (max-width: 480px){
        margin: 0 10px;
    }
`

const LoginBox = styled.div`
    margin: 12px 0 25px;
    padding: 10px 0 40px;
    border: 1px solid rgba(219,219,219,1);
    border-radius: 1px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    img {
        margin: 22px auto 12px;
    }
`

const ErrorMessage = styled.p`
    color: red;
    margin: 4px 20px;
    text-align: center;
`

const LoginFrom = styled.form`
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


const SignUpBox = styled.div`
    margin: 12px 0;
    padding: 20px 0;
    border: 1px solid rgba(219,219,219,1);
    background: #ffffff;
    border-radius: 1px;
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 14px;

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

        img {
            height: 40px;
            margin: 0 4px;
        }
    }
`

export default Login