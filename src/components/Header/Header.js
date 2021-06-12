import styles from './Header.module.css';
import SignOutButton from '../SignOut/SignOut';
import { AuthUserContext } from '../Session/Session'
//Importing Routes:
import * as ROUTES from '../../constants/routes';
//Import Link:
import { Link } from 'react-router-dom';

function Header(props) {
    return(
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    )
}

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
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                </li>
                <li>
                    <SignOutButton />
                </li>
            </ul>
        </header>
    )
}

function NavigationNonAuth() {
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
            <nav>
                <ul>
                    <li>
                        <Link to={ROUTES.LANDING}>Landing</Link>
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