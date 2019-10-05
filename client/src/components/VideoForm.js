import React from "react";
import axios from "axios";
import { Form, Header, Message, } from "semantic-ui-react";

class VideoForm extends React.Component {
  defaultValues = { video: "", title: "", genre: "", description: "", };
  state = { ...this.defaultValues, };

  handleSubmit = (e) => {
    e.preventDefault();
    const video = { ...this.state, };
    axios.post("/api/video_upload", video)
      .then( response => {
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
          <Message
            success
            header='Success'
            content="Video successfully uploaded!"
         />
          <Form.Button color="red">Submit</Form.Button>
        </Form>
      </div>
    )
  }
}


export default VideoForm;