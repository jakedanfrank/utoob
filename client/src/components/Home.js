import React from 'react';
import axios from "axios";
import { Header, Image, Card, } from 'semantic-ui-react';
import { withRouter, Link, } from 'react-router-dom';
import { AuthConsumer } from '../providers/AuthProvider';



class Home extends React.Component {
  state = { videos: [], };

  componentDidMount() {
    axios.get(`/api/users/${this.props.auth.user.id}/videos`)  //  --- NEED TO UPDATE API ROUTE ---
      .then( response => {
        this.setState({ videos: response.data, })
      })
      .catch( error => {
        console.log( error )
      })
  };

  renderVideos = () => {
    const { videos, } = this.state;

    if (videos.length <= 0)
      return <h1>No Videos</h1>
    return videos.map( video => (
      
         <Link>
          <Card>
            <Image src={video.trailer}/>
            <Card.Content>
                <Card.Header>{video.title}</Card.Header>
                <Card.Meta>{video.genre}</Card.Meta>
                <Card.Description>{video.description}</Card.Description>
              </Card.Content>
            </Card>
         </Link>

    ))
  };

  render() {
    return (
      <div>
        <Header as="h1">Videos</Header>
        <br />
        <br />
        <Card.Group>
          { this.renderVideos() }
        </Card.Group>
      </div>
    );
  };
};

export class ConnectedHome extends React.Component {
  render() {
    return(
      <AuthConsumer>
        { auth =>
        <Home {...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedHome);
