import React, { lazy, Suspense } from 'react'
import GlobalStyles from './GlobalStyles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import * as ROUTES from './constants/routes'

const Login = lazy(() => import ('./pages/Login'))
const SignUp = lazy(() => import ('./pages/SignUp'))
const NotFound = lazy(() => import ('./pages/NotFound'))
const Dashboard = lazy(() => import ('./pages/Dashboard'))

const App = () => {
    return (
        <div>
            <GlobalStyles />
            <Suspense fallback={<p>Loading...</p>} >
                <Router>
                    <Switch>
                        <Route path={ROUTES.LOGIN} component={Login}  />
                        <Route path={ROUTES.SIGN_UP} component={SignUp} />
                        <Route path={ROUTES.DASHBOARD} component={Dashboard} exact/>
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Suspense>
        </div>
    )
}

export default App
