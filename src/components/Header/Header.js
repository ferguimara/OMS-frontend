import styles from './Header.module.css';
import SignOutButton from '../SignOut/SignOut';
import { AuthUserContext } from '../Session/Session'
//Importing Routes:
import * as ROUTES from '../../constants/routes';
//Import Link:
import { Link } from 'react-router-dom';

/* *** This header page is intended to enable navigation through out our application *** */

function Header(props) {
    return(
        //We are checking if a user is authenticated (T/F) if auth, we render the Navigation auth and if not we render the other
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    )
}

//Component for authenticated users
function NavigationAuth() {
    return (
        <header className={styles.header}>
            <nav>
                <img
                    style={{height: '2.8rem'}}
                    src={'https://i.imgur.com/DaaMaPx.png'}
                    alt={'tomorrowhealth'}
                />
                <h1>Tomorrow Health</h1>
            </nav>
            <ul>
                <li>
                    <Link to={ROUTES.HOME}>All Orders</Link>
                </li>
                <li>
                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                </li>
                <li>
                    <Link to={ROUTES.ADMIN}>Admin</Link>
                </li>
                <li>
                    <SignOutButton />
                </li>
            </ul>
        </header>
    )
}

//component for nonauthenticated users
function NavigationNonAuth() {
    return (
        <header className={styles.header}>
            <nav>
                <img
                    style={{height: '2.8rem'}}
                    src={'https://i.imgur.com/DaaMaPx.png'}
                    alt={'tomorrowhealth'}
                />
                <h1>
                    <Link to={ROUTES.LANDING}>Tomorrow Health</Link>
                </h1>
            </nav>
            <nav>
                <ul>
                    <li>
                        <Link to={ROUTES.LANDING}>Welcome</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;