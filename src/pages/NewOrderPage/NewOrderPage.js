const NewOrderPage = props => {
    return (
        <>
            <h2>Create Order Below:</h2>
            <form className='createOrderForm' onSubmit={props.handleSubmit}>
                <label>
                    <span>Date</span>
                    <input name="date" value={props.newOrder.date} onChange={props.handleChange}/>
                </label>
                <label>
                    <span>Product</span>
                    <input name="product" value={props.newOrder.product} onChange={props.handleChange}/>
                </label>
                <label>
                    <span>Price</span>
                    <input name="price" value={props.newOrder.price} onChange={props.handleChange}/>
                </label>
                <label>
                    <span>Status</span>
                    <select name="status" value={props.newOrder.status} onChange={props.handleChange}>
                        <option value="For Sale">For Sale</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Pending">Pending</option>
                    </select>
                </label>
                <button>{props.editMode ? 'Edit Order' : 'Submit Order'}</button>
            </form>
        </>
    )
}

export default NewOrderPage;