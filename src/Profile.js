import React from 'react';
import { withAuth0, useAuth0 } from '@auth0/auth0-react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Profile.css';

// TO DO //

// Auth0 main frame for initalizing user component
// axios call for mood updating

// internal links for further page navigation

// QR code in comming and out going linkage

// bootstrap required

// __ DONE__
// main profile page

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading Page</div>;
  }
  return (
    isAuthenticated && (
      <>
        <img id="Picture" src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </>
    )
  );
};
const LogoutButton = () => {
  const { logout } = useAuth0();
  return <Button variant="dark" onClick={() => logout({ returnTo: window.location.origin })}> Log Out </Button>;
};


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <Button variant="dark" onClick={() => loginWithRedirect()}>Log In</Button>;
};



console.log('IM working here');


class Profile extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        {isAuthenticated ? '' : <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>HeadSpace</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please Log in!</p>
          </Modal.Body>
          <Modal.Footer>
            <LoginButton />
          </Modal.Footer>
        </Modal.Dialog>}

        {isAuthenticated ? <Navbar bg="dark" variant="dark" fixed="top">
          <Nav>
            <Nav.Link href="/Home">headSpace</Nav.Link>
            <Nav.Link href="/Profile">Profile</Nav.Link>
            <Nav.Link href="/Jokes">Jokes</Nav.Link>
            <Nav.Link href="/AboutUs">About Us</Nav.Link>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </Nav>
        </Navbar> : ''}
        <UserProfile />
      </>
    );
  }
}
export default withAuth0(Profile);
