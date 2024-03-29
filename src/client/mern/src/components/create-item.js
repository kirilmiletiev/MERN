import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import auth from '../auth'

export default class CreateItem extends Component {
  constructor(props) {
    super(props);

    // this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
      price: 0,
      location: '',
      url: '',
      category: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username)
          })
        }
      })
  }


  // onChangeUsername(e) {
  //   this.setState({
  //     username: e.target.value
  //   })
  // }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(e) {
    this.setState({
      date: e
    })
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    })
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    })
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const item = {
      username: auth.getUserInfo().username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      price: this.state.price,
      location: this.state.location,
      url: this.state.url,
      category: this.state.category

    }

    console.log(item);

    axios.post('http://localhost:5000/items/add', item).then(res => res.data);
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Item (demo)</h3>
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group" >
            <label>Username: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function (user) {  ///  => func!
                  return <option
                    key={user}
                    value={user}>{user}
                  </option>;
                })
              }
            </select>
          </div> */}
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="text" className="form-control" value={this.state.price} onChange={this.onChangePrice} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" className="form-control" value={this.state.location} onChange={this.onChangeLocation} />
          </div>
          <div className="form-group">
            <label>Image Url</label>
            <input type="text" className="form-control" value={this.state.url} onChange={this.onChangeUrl} />
          </div>
          <div className="form-group">
            <select onChange={this.onChangeCategory}>
              <option defaultValue='1'> Select category</option>
              <option>Music</option>
              <option>Culture</option>
              <option>Sport</option>
              <option>Kids</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Item (demo)" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  };
};