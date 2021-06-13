import styles from './CreateOrderButton.module.css'
import { Link } from 'react-router-dom';

const CreateOrderButton = (props) => (
    <div
        style={{
            margin: '50px 10px 50px 50px'
        }}
    >
        <button>
            <Link className={styles.button} to='/new-order'
            >Create Order</Link>
        </button>
    </div>
)

export default CreateOrderButton;