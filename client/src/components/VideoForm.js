import React from "react";
import axios from "axios";
import { AuthConsumer } from '../providers/AuthProvider'
import { Form, Header, Message, } from "semantic-ui-react";
import { withRouter, } from 'react-router-dom'

class VideoForm extends React.Component {
//   defaultValues = { video: "", title: "", genre: "", description: "", id: null };
//   state = { ...this.defaultValues, };
     state = { videos: [] }
  componentDidMount() {
    // const { match: { params: { id } } } = this.props
    // if (id)
      axios.get(`/api/users/${this.props.auth.user.id}/videos`)
        .then(res => {
            debugger
          this.setState({ videos: res.data })
        })
        .catch(err => {
          console.log(err.response)
        })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const video = { ...this.state, };
    axios.post(`/api/users/${this.state.id}/videos`, video)
      .then( response => {
          debugger
        this.props.history.push("/videos");
      })
      .catch( error => {
        console.log( error )
      })
    this.setState({ ...this.defaultValues, });
  }

  handleChange = (e) => {
    const { target: {name, value, } } = e;
    this.setState({ [name]: value, });
  }

  render() {
    const { video, title, genre, description, } = this.state;

    return (
      <div>
        <Header as="h1">New Video</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              lable="Video"
              name="video"
              placeholder="Video URL"
              autoFocus
              required
              value={video}
              onChange={this.handleChange}
            />
            <Form.Input
              lable="Title"
              name="title"
              placeholder="Title"
              required
              value={title}
              onChange={this.handleChange}
            />
            <Form.Input
              lable="Genre"
              name="genre"
              placeholder="Genre"
              value={genre}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.TextArea
              lable="Description"
              name="description"
              placeholder="Description"
              value={description}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Checkbox required label="I agree to the Terms and Conditions" />
          <Form.Button color="red">Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export class ConnectedVideoForm extends React.Component {
    render() {
      return (
        <AuthConsumer> 
          { auth => 
            <VideoForm { ...this.props } auth={auth} />
          }
        </AuthConsumer>
      )
    }
  }
  

  export default withRouter(ConnectedVideoForm);