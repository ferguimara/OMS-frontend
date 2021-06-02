import styles from './Header.module.css';

function Header(props) {
    return(
        <header className={styles.header}>
            <h1>{'⚛'}OMS Platform</h1>
            <nav>
                <ul>
                    <li>Welcom, Fernando</li>
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