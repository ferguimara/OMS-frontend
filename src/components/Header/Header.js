import styles from './Header.module.css';

function Header(props) {
    return(
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
                    <li>Welcome, Fernando</li>
                    <li>
                        <img 
                            style={{height: '2.8rem', borderRadius: '50%'}}
                            src={'https://i.imgur.com/MTb1VJh.jpg?2'} 
                            alt={'fernando'}
                        />
                    </li>
                    <li>Logout</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;