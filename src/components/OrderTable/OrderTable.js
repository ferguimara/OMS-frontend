import OrderRow from '../OrderRow/OrderRow';
import styles from './OrderTable.module.css';

const OrderTable = (props) => (
    <div>
        <h2
            style={{
                textAlign: 'left',
                padding: '25px'
            }}
        >Order Dashboard:</h2>
        <section>
            <article>
                <div>Date</div>
                <div>Product</div>
                <div>Price</div>
                <div>Status</div>
                <div></div>
            </article>
            <article>
                <OrderRow />
            </article>
        </section>    
    </div>
)

export default OrderTable;