import React from 'react'
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash'
import {addUserMutation, getUsersQuery} from '../store/queries'

class AddUser extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addUserMutation({
      input: {
        name: this.state.name,
        description: this.state.description
      }
    })
  }
  render() {
    console.log('the work', this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name" className="input-field">
            <div>Name:</div>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="description" className="input-field">
            <div>Description:</div>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>

          <div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}
export default compose(
  graphql(getUsersQuery, {name: 'getUserQuery'}),
  graphql(addUserMutation, {name: 'addUserMutation'})
)(AddUser)
