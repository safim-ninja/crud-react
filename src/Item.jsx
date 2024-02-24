import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
function Item() {
    const url = 'http://192.168.88.241:8000'
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [editItemName, setEditItemName] = useState('');
    const [editItemPrice, setEditItemPrice] = useState('');
    const [editingItemId, setEditingItemId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await axios.get(url + '/api/items');
        setItems(response.data);
    };

    const addItem = async () => {
        try {
            const response = await axios.post(url + '/api/items', {name: itemName, price: itemPrice});
            console.log(response.status)
            await fetchItems();
            setItemName('');
            setItemPrice('');
            setError('');
        } catch (error) {
                // setError(error);
            // console.log(error);
            if (error.response && error.response.status === 500 && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Failed to add item');
            }
        }
    };

    const deleteItem = async (id) => {
        await axios.get(url + `/api/items/delete/${id}`);
        await fetchItems();
    };

    const startEditing = (id, name, price) => {
        setEditingItemId(id);
        setEditItemName(name);
        setEditItemPrice(price);
    };

    const cancelEditing = () => {
        setEditingItemId(null);
        setItemName('');
        setItemPrice('');
    };

    const updateItem = async (id) => {
        await axios.post(url + `/api/items/update/${id}`, {name: editItemName, price: editItemPrice});
        await fetchItems();
        setEditingItemId(null);
        setEditItemName('');
        setEditItemPrice('');
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <h3>New Item</h3>
                <div className="col-lg-3 col-md-6">
                    <input type="text" className="form-control" placeholder="name" required value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                    {error && <p className="text-danger">{error}</p>}
                </div>
                <div className="col-lg-3 col-md-6">
                    <input type="text" className="form-control" placeholder="price" required value={itemPrice} onChange={(e) => setItemPrice(e.target.value)}/>
                </div>
                <div className="col-lg-2 col-sm-6">
                    <button className="btn btn-outline-success" onClick={addItem}>Add Item</button>
                </div>
            </div>
            <h1>Items</h1>
            <table className="table rounded table-bordered">
                <thead>
                <tr>
                    <th width="10%" scope="col">#</th>
                    <th width="30%" scope="col">Name</th>
                    <th width="30%" scope="col">Price</th>
                    <th width="20%" scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                            {editingItemId === item.id ? (
                                <input type="text" className="form-control" value={editItemName} onChange={(e) => setEditItemName(e.target.value)} />
                            ) : (
                                item.name
                            )}
                        </td>
                        <td>
                            {editingItemId === item.id ? (
                                <input type="text" className="form-control" value={editItemPrice} onChange={(e) => setEditItemPrice(e.target.value)} />
                            ) : (
                                item.price
                            )}
                        </td>
                        <td>
                            {editingItemId === item.id ? (
                                <>
                                    <button className="btn btn-outline-primary" onClick={() => updateItem(item.id)}>Save</button>
                                    <button className="btn btn-outline-secondary" onClick={cancelEditing}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-outline-warning" onClick={() => startEditing(item.id, item.name, item.price)}>Edit</button>
                                    <button className="btn btn-outline-danger" onClick={() => deleteItem(item.id)}>Delete</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Item;
