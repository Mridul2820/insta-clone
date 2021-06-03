import React, { lazy, Suspense } from 'react'
import GlobalStyles from './GlobalStyles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Login = lazy(() => import ('./pages/Login'))

const App = () => {
    return (
        <div>
            <GlobalStyles />
            <Suspense fallback={<p>Loading...</p>} >
                <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                    </Switch>
                </Router>
            </Suspense>
        </div>
    )
}

export default App
