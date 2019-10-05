import React from 'react';
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, Image, Dropdown, Button, Container, } from 'semantic-ui-react';
import { Link, withRouter, } from 'react-router-dom';
import logo from "../images/logo.png";
import logo2 from "../images/logo2.png";

class Navbar extends React.Component {
  
  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;
    
    if (user) {
      return (
        <Container>

        <Menu.Menu position='right'>
          <Image style={{width: "35px", height: "45px", paddingTop: "8px",}}  src={logo2} />
          <Dropdown style={{paddingRight: "10px", paddingTop: "10px"}}>
            <Dropdown.Menu>
            <Dropdown.Item>
              User
            </Dropdown.Item>
            <Dropdown.Divider/>  
            <Dropdown.Item
            onClick={ () => handleLogout(this.props.history)}
            >
              Logout
            </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
            <Button color="red">Upload Video</Button>
            </Menu.Item>
        </Menu.Menu>
        </Container>
      )
    } else {
      return (
        <Menu.Menu position='right'>
          <Link to='/login'>
            <Menu.Item
              id='login'
              name='login'
              active={location.pathname === '/login'}
            />
          </Link>
          <Link to='/register'>
            <Menu.Item
              id='register'
              name='register'
              active={location.pathname === '/register'}
            />
          </Link>
        </Menu.Menu>
      )
    }
  }
  
  render() {
    return (
      <Container>
        <Menu secondary>
          <Link to='/'>
            <Image style={{ paddingTop: "10px"}} src={logo}  />
          </Link>
            { this.rightNavItems() }
        </Menu>
      </Container>
    )
  }
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer> 
        { auth => 
          <Navbar { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedNavbar);
