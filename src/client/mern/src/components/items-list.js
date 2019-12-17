import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import auth from '../auth'

const userInfo = auth.getUserInfo();
const Item = props => (
    <tr>
        <td>{props.item.username}</td>
        <td>{props.item.description}</td>
        <td>{props.item.duration}</td>
        <td>{props.item.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.item._id}> edit </Link>
            | <Link to={"/items"} method="delete" onClick={() => { props.deleteItem(props.item._id) }}> delete </Link>
            | <Link to={'/subscribe'} method="put" onClick={() => { props.subscribeItem(props.item._id, auth.getUserInfo().id) }}> subscribe </Link>

        </td>
    </tr>
)

export default class ItemsList extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);
        this.subscribeItem = this.subscribeItem.bind(this);

        this.state = {
             items: [],
             userId: auth.getUserInfo().id
             };

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

    subscribeItem(itemId, userId) {
        return axios({
            method: 'put',
            url: 'http://localhost:5000/items/subscribe/' + itemId,
            data: {
                itemId , userId
            }
        }).then(res => res.data);
    }
    // subscribeItem(id) {
    //     console.log(id)
    //     axios.put('http://localhost:5000/items/subscribe/' + id)
    //         .then(response => { console.log(response.data) })
    //         .catch((err) => {
    //             console.log(err);
    //         });

    //     this.setState({
    //         items: this.state.items.filter(item => item._id !== id)
    //     })
    //  //   window.location = '/';
    // }

    deleteItem(id) {
        axios.delete('http://localhost:5000/items/' + id)
            .then(response => { console.log(response.data) })
            .catch((err) => {
                console.log(err);
            });

        this.setState({
            items: this.state.items.filter(item => item._id !== id)
        })
        window.location = '/';
    }

    itemList() {
        return this.state.items.map(currenItem => {
            return <Item item={currenItem} deleteItem={this.deleteItem} subscribeItem={this.subscribeItem} key={currenItem._id} />;
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