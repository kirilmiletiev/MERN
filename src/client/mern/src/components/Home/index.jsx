import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import auth from '../../auth'

const userInfo = auth.getUserInfo();
const Item = props => (
    <div>
        {
            userInfo ?
                <Fragment>
                    <div>
                        {((props.item.username === userInfo.username) ?
                            [<Link to={"/edit/" + props.item._id} key={props.item._id}> edit </Link>, <Link to={"/items"} method="delete" key={props.item.username} onClick={() => { props.deleteItem(props.item._id) }}> delete </Link>]

                            : <Link to={'/subscribe'} method="put" onClick={() => { props.subscribeItem(props.item._id, userInfo.id) }}> subscribe </Link>)}
                    </div>
                </Fragment>
                :
                <Fragment>
                    <Link to="/login"> Subscribe </Link>
                </Fragment>
        }
    </div>
)

export default class ItemsList extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);
        this.subscribeItem = this.subscribeItem.bind(this);

        this.state = {
            items: [],
            userId: '',
            username: ''
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
                itemId, userId
            }
        }).then(res => res.data, window.location = "/");
    }
    //  subscribeItem(id) {
    //      console.log(id)
    //      axios.put('http://localhost:5000/items/subscribe/' + id)
    //          .then(response => { console.log(response.data) })
    //          .catch((err) => {
    //              console.log(err);
    //         });

    //      this.setState({
    //          items: this.state.items.filter(item => item._id !== id)
    //      })
    //      window.location = '/';
    //  }

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
        return;
    }

    itemList() {
        return this.state.items.map(currenItem => {
            return <Item item={currenItem} deleteItem={this.deleteItem} subscribeItem={this.subscribeItem} key={currenItem._id} />;
        })
    }

    details(id){
        axios.get('http://localhost:5000/items/details/' + id)
            .then(response => { console.log(response.data) })
            .catch((err) => {
                console.log(err);
            });
           return <Redirect to={"/details/" + id}/>
           // window.location('/details/' + id);
    }

    render() {
        return (
            <Fragment>
                {auth ?
                    this.state.items ?
                        <div className="container" style={{ marginBottom: 50 }}>
                            <div className="row" style={{ marginTop: 30, marginBottom: 20 }}>
                                <div className="col-md-4 offset-md-4">
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-search"></i></span>
                                        </div>
                                        <input className="form-control mr-sm-2" type="search" name="search" onChange={this.searchEvents} placeholder="Search Event" />
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                {this.state.items.map(e =>
                                    <div className="col-md" style={{ marginBottom: 30 }}>
                                        <div className="card" style={{ width: 350 }}>
                                            <img className="card-img-top" src={e.url} alt="pic" />
                                            <div className="card-body">
                                                <h5 className="card-title">{e.category}</h5>
                                                <p className="card-text">{e.description}</p>
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item"><b>Location:</b> {e.location}</li>
                                                <li className="list-group-item"><b>Date:</b> {e.date.substring(0, 10)}</li>
                                                <li className="list-group-item"><b>Participants:</b> {e.subscribers.length}</li>
                                            </ul>
                                            <div className="card-body">
                                                {auth.getUserInfo() ?
                                                    <Fragment>
                                                        <div>
                                                            {((e.username === userInfo.username) ?
                                                                [<Link to={"/edit/" + e._id} key={e._id}>  Edit  </Link>, <Link to={"/items"} method="delete" key={e.username} onClick={() => { this.deleteItem(e._id) }}>  Delete  </Link>]
                                                                : [<Link to={'/subscribe'} method="put" onClick={() => { this.subscribeItem(e._id, userInfo.id) }}>  SUBSCRIBE  </Link>,
                                                                <Link to={"/details/" + e._id} key={e._id} onClick={()=>{this.details(e._id)}} >  Details  </Link>])}
                                                        </div>
                                                    </Fragment>
                                                    :
                                                    <Fragment>
                                                        <Link to="/login"> Subscribe </Link>
                                                    </Fragment>}
                                                {/* <Link to={this.subscribeItem(e._id, auth.getUserInfo()._id)}></Link>
                                                <button className="btn btn-success">SUBSCRIBE</button>
                                                
                                                {this.itemList()} */}
                                            </div>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                        : <span><Item /></span>
                    : <div className="container" style={{ marginTop: 30, marginBottom: 50 }}>
                        <div className="card" style={{ width: 1000, marginLeft: 55 }}>
                            <img src="Sport-1.jpg" className="card-img-top" alt="sport-1" />
                            <div className="card-body">
                                <h3 className="card-title text-center">Sport Center</h3>
                                <h5 className="card-text text-center">Great opportunities come to those who make the most of small ones.</h5>
                            </div>
                            <div className="text-center" style={{ marginTop: 10, marginBottom: 10 }}>
                                <Link to="/register">
                                    <button className="btn btn-danger btn-lg">
                                        Join
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        )
    }
}

// import React, { Component, Fragment } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import auth from '../../auth';
// import './styles.css';


// const userInfo = auth.getUserInfo();
// const Card = ({ id, usename, location, description, url, date, subscribers, price, category, itemBtn }) => {
//     return (
//         <div id="container">
//             <div className="row">
//                 <div className="column">
//                     <div className="flip-card">
//                         <div className="flip-card-inner">
//                             <div className="flip-card-front">

//                                 <img src={url} alt="pic" />


//                             </div>
//                             <div className="flip-card-back">
//                                 <img src={url} alt="pic" />
//                                 <h1>{date.substring(0, 10)}</h1>
//                                 <p>{location}</p>
//                                 <p>{price}$</p>
//                                 {itemBtn}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };


// const Item2 = props => (
//     <div class="flip-card">
//         <div class="flip-card-inner">
//             <div class="flip-card-front">
//                 <img src={props.item.url} alt="Avatar" style="width:300px;height:300px;" />
//                 <div class="flip-card-back">
//                     <h1>{props.item.date.substring(0, 10)}</h1>
//                     <p>{props.item.location}</p>
//                     <p>{props.item.price}$</p>
//                 </div>
//             </div>
//         </div>
//     </div>
// );


// // const Item = item => (
// //     <div>
// //         {
// //             userInfo ?
// //                 <Fragment>
// //                     <div>
// //                     {console.log(`ITEM=>> ${item.username}  ==== ${userInfo.username}`)}
// //                         {((item.username === userInfo.username) ?
// //                             [<Link to={"/edit/" + item._id} key={item._id}> edit </Link>, <Link to={"/items"} method="delete" key={item.username} onClick={() => { this.deleteItem(item._id) }}> delete </Link>]

// //                             : <Link to={'/subscribe'} method="put" onClick={() => { this.subscribeItem(item._id, userInfo.id) }}> subscribe </Link>)}
// //                     </div>
// //                 </Fragment>
// //                 :
// //                 <Fragment>
// //                     <Link to="/login"> Subscribe </Link>
// //                 </Fragment>
// //         }
// //     </div>

// // )

// export default class Home extends Component {
//     constructor(props) {
//         super(props);

//         this.deleteItem = this.deleteItem.bind(this);
//         this.subscribeItem = this.subscribeItem.bind(this);
//         this.render = this.render.bind(this);

//         this.state = {
//             items: [],
//             item: [],
//             username: '',
//             description: '',
//             date: '',
//             price: '',
//             location: '',
//             url: '',
//             category: '',
//             subscribers: [],
//             itemId: '',
//             userId: '',
//             userUsername: '',
//         };

//     }

//     Item() {
//         return (<div>
//             {
//                 userInfo ?
//                     <Fragment>
//                         <div>
//                             {console.log(`ITEM=>> ${this.state.username}  ==== ${this.state.userUsername}`)}
//                             {((this.state.username === this.state.userUsername) ?
//                                 [<Link to={"/edit/" + this.state._id} key={this.state._id}> edit </Link>, <Link to={"/items"} method="delete" key={this.state.username} onClick={() => { this.deleteItem(this.state._id) }}> delete </Link>]

//                                 : <Link to={'/subscribe'} method="put" onClick={() => { this.subscribeItem(this.state._id, userInfo.id) }}> subscribe </Link>)}
//                         </div>
//                     </Fragment>
//                     :
//                     <Fragment>
//                         <Link to="/login"> Subscribe </Link>
//                     </Fragment>
//             }
//         </div>)
//     }

//     componentDidMount() {
//         axios.get('http://localhost:5000/items/')
//             .then(response => {
//                 this.setState({ items: response.data });
//                 response.data.map(item => {
//                     this.setState({
//                         item: item,
//                         username: item.username,
//                         description: item.description,
//                         date: item.date.substring(0, 10),
//                         price: item.price,
//                         location: item.location,
//                         url: item.url,
//                         category: item.category,
//                         subscribers: item.subscribers,
//                         itemId: item._id,
//                         userId: auth.getUserInfo().id,
//                         userUsername: auth.getUserInfo().username

//                     })
//                 })
//                 // this.setState({ items: response.data });
//                 console.log(this.state);
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }

//     subscribeItem(itemId, userId) {
//         return axios({
//             method: 'put',
//             url: 'http://localhost:5000/items/subscribe/' + itemId,
//             data: {
//                 itemId, userId
//             }
//         }).then(res => res.data, window.location = "/");
//     }
//     subscribeItem(id) {
//         console.log(id)
//         axios.put('http://localhost:5000/items/subscribe/' + id)
//             .then(response => { console.log(response.data) })
//             .catch((err) => {
//                 console.log(err);
//             });

//         this.setState({
//             items: this.state.items.filter(item => item._id !== id)  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         })
//         window.location = '/';
//     }

//     deleteItem(id) {
//         axios.delete('http://localhost:5000/items/' + id)
//             .then(response => { console.log(response.data) })
//             .catch((err) => {
//                 console.log(err);
//             });

//         this.setState({
//             items: this.state.items.filter(item => item._id !== id)
//         })
//         window.location = '/';
//     }

//     itemList() {
//         return this.state.items.map(currenItem => {
//             // return <Item item={currenItem} deleteItem={this.deleteItem} subscribeItem={this.subscribeItem} key={currenItem._id} />;
//             return (this.Item())
//         })
//     }

//     itemList2() {
//         return this.state.items.map(currenItem => {
//             return <Item2 item={currenItem} />;
//         })
//     }


//     render() {
//         return (
//             <Fragment>
//                 {auth ?
//                     this.state.item ?
//                         <div className="container" style={{ marginBottom: 50 }}>
//                             <div className="row" style={{ marginTop: 30, marginBottom: 20 }}>
//                                 <div className="col-md-4 offset-md-4">
//                                     <div className="form-group input-group">
//                                         <div className="input-group-prepend">
//                                             <span className="input-group-text"><i className="fa fa-search"></i></span>
//                                         </div>
//                                         <input className="form-control mr-sm-2" type="search" name="search" onChange={this.searchEvents} placeholder="Search Event" />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row align-items-center">
//                                 {this.state.items.map(item =>
//                                     <Card key={item._id}
//                                         username={item.username}
//                                         id={item._id}
//                                         name={item.name}
//                                         description={item.description}
//                                         location={item.location}
//                                         url={item.url}
//                                         date={item.date}
//                                         price={item.price}
//                                         category={item.category}
//                                         subscribers={item.subscribers.length}
//                                         itemBtn={this.Item()}
//                                     />)}
//                             </div>
//                         </div>
//                         : <h4>MERN MERN MERN</h4>
//                     : <div className="container" style={{ marginTop: 30, marginBottom: 50 }}>
//                         <div className="card" style={{ width: 1000, marginLeft: 55 }}>
//                             <img src="Sport-1.jpg" className="card-img-top" alt="sport-1" />
//                             <div className="card-body">
//                                 <h3 className="card-title text-center">Sport Center</h3>
//                                 <h5 className="card-text text-center">Great opportunities come to those who make the most of small ones.</h5>
//                             </div>
//                             <div className="text-center" style={{ marginTop: 10, marginBottom: 10 }}>
//                                 <Link to="/register">
//                                     <button className="btn btn-danger btn-lg">
//                                         Join
//                                     </button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 }
//             </Fragment>
//         )
//     }
// }