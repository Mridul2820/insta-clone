import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const IsUserLoggedIn = ({ user, loggedInPath, children, ...rest }) => {
    return (
        <Route
            {...rest}

            render={({ location }) => {
                if (!user) {
                  return children
                }

                if (user) {
                    return (
                        <Redirect
                            to={{
                                pathname: loggedInPath,
                                state: { from: location }
                            }}
                        />
                    );
                }

                return null;
            }}
        />
    )
}

export default IsUserLoggedIn

IsUserLoggedIn.propTypes = {
    user: PropTypes.object,
    loggedInPath: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
};
