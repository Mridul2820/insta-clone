import React, { lazy, Suspense } from 'react'
import GlobalStyles from './GlobalStyles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/useAuthListener'
import UserContext from './context/user'

const Login = lazy(() => import ('./pages/Login'))
const SignUp = lazy(() => import ('./pages/SignUp'))
const NotFound = lazy(() => import ('./pages/NotFound'))
const Dashboard = lazy(() => import ('./pages/Dashboard'))

const App = () => {
    const { user } = useAuthListener()

    return (
        <UserContext.Provider value={user}>
            <GlobalStyles />
            <Router>
                <Suspense fallback={<p>Loading...</p>} >
                    <Switch>
                        <Route path={ROUTES.LOGIN} component={Login}  />
                        <Route path={ROUTES.SIGN_UP} component={SignUp} />
                        <Route path={ROUTES.DASHBOARD} component={Dashboard} exact/>
                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
             </Router>
        </UserContext.Provider>
    )
}

export default App