import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Voters } from '../api/voters.js';
import Voter from './Voter.js';
 
class App extends Component {

   handleSubmit(event) {
      event.preventDefault();

      const name = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
      Voters.insert({
          name: name,
          createdAt: new Date(),
      });
      ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
 
  renderList() {
    return this.props.voters.map((voter) => (
      <Voter key={voter._id} voter={voter} />
    ));
  }
 
  render() {
    return (
      <section>
      <div className="container">
        <header>
            <h1>Voters List { this.props.type } </h1>
        </header>

        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type the name"
            />
        </form>
 
        <ul>
            <header className="row">
                <div className="col-sm-4">Name</div>
                <div className="col-sm-2">Yes</div>
                <div className="col-sm-2">No</div>
                <div className="col-sm-2">Ignore</div>
                <div className="col-sm-2">Absent</div>
            </header>
            {this.renderList()}
        </ul>
      </div>
      </section>
    );
  }
}

export default withTracker(({ type }) => {
    return {
        type: type,
        voters: Voters.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(App);