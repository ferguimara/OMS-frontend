// eslint-disable-next-line
import styles from './OrderTable.module.css';

const OrderTable = (props) => (
    <div>
        <h2
            style={{
                textAlign: 'left',
                padding: '25px'
            }}
        >Order Dashboard:</h2>
        <table>
            <thead>
                <th>Date</th>
                <th>Product</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
                <th></th>
            </thead>
            {
                props.orders.map(o => (
                    <tr key={o._id}>
                        <td>{o.date}</td>
                        <td>{o.product}</td>
                        <td>{o.price}</td>
                        <td>{o.status}</td>
                        <td
                            className="controls"
                            onClick={() => props.handleEdit(o._id)}>
                        {'✏️'}
                        </td>
                        <td 
                            className="controls"
                            onClick={() => props.handleDelete(o._id)}>
                        {'🗑'}
                        </td>
                    </tr>
                ))
            }
        </table>   
    </div>
)

export default OrderTable;