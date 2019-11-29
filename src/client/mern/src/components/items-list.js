import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Item = props => (
    <tr>
        <td>{props.item.username}</td>
        <td>{props.item.description}</td>
        <td>{props.item.duration}</td>
        <td>{props.item.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.item._id}>edit</Link> | <Link to={"/items"} method="delete" onClick={() => { props.deleteItem(props.item._id) }}>delete</Link>
        </td>
    </tr>
)

export default class ItemsList extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this)

        this.state = { items: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/items/')
            .then(response => {
                this.setState({ items: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteItem(id) {
        axios.delete('http://localhost:5000/items/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            items: this.state.items.filter(item => item._id !== id)
        })
    }

    itemList() {
        return this.state.items.map(currenItem => {
            return <Item item={currenItem} deleteItem={this.deleteItem} key={currenItem._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Items</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.itemList()}
                    </tbody>
                </table>
            </div>
        )
    }
}