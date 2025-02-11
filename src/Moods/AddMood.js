import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { withAuth0 } from '@auth0/auth0-react';

class AddMood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'kassie.r.bradshaw@gmail.com',
      mood: '',
      note: '',
      color: '',
      number: ''
    };
  }

  componentDidMount() {
  }

  handleCreateMood = (event) => {
    event.preventDefault();
    this.setState({
      mood: event.target.value,
    });
  };

  handleMoodNote = (event) => {
    this.setState({
      note: event.target.value,
    });
  };

  handleAddMood = () => {
    axios.post(`${process.env.REACT_APP_BACKEND}/moods`, {
      // this.state.email is literally always kassie.r.bradshaw@gmail.com.
      // this will break for literally any other logged in user.
      // this needs to use auth0 to get the correct email address.
      email: this.props.auth0.user.email,
      mood: this.state.mood,
      note: this.state.note,
    })
      .then((response) => {
        this.props.updateMoods(response.data);
        // alerts are not generally a good UI pattern in a React app
        alert('Your mood has been submitted!');
      });
    this.props.hasVoted();
  }

  render() {
    return (
      <Container id="mood-buttons-container">
        <h1>How Are You Feeling Today?</h1>
        <h4>You will be able to see your mood history after submitting!</h4>
        <Button id="happy-button" value="Happy" size="lg" onClick={this.handleCreateMood}>Happy</Button>
        <Button id="sad-button" value="Sad" size="lg" onClick={this.handleCreateMood}>Sad</Button>
        <Button id="excited-button" value="Excited" size="lg" onClick={this.handleCreateMood}>Excited</Button>
        <Button id="angry-button" value="Angry" size="lg" onClick={this.handleCreateMood}>Angry</Button>
        <Button id="meh-button" value="Meh" size="lg" onClick={this.handleCreateMood}>Meh</Button>
        {/* You should be listening for onSubmit on the form, not onClick on the button. */}
        {/* You're also getting an error in your console because you don't preventDefault. */}
        <Form>
          <Form.Group controlId="notesForm">
            <Form.Label>Add a note about how you are feeling and save it to your history:</Form.Label>
            <Form.Control as="textarea" rows={2} onInput={this.handleMoodNote} />
          </Form.Group>
          <Button id="submit-mood" variant="light" type="submit" onClick={this.handleAddMood}>Submit your mood!</Button>
        </Form>
      </Container>
    );
  }
}

export default withAuth0(AddMood);
