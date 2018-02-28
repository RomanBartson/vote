import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Voters } from '../api/voters.js';
import { Vote } from '../api/vote.js';
import Voter from './Voter.js';
import { Link } from "react-router-dom";

 
class Edit extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveTitle = this.saveTitle.bind(this);
    }
    saveTitle(event) {
        event.preventDefault();

        const title = ReactDOM.findDOMNode(this.refs.voteTitle).value.trim();
        let lastVote = Vote.findOne({});
        if (!lastVote) {
            Vote.insert({
                title: title,
                createdAt: new Date(),
            });
        } else {
            Vote.update(lastVote._id, {
                title: title,
                createdAt: new Date(),
            });
        }

        ReactDOM.findDOMNode(this.refs.voteTitle).value = '';
    }
    handleSubmit(event) {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.voterName).value.trim();
 
        Voters.insert({
            name: name,
            createdAt: new Date(),
        });
        ReactDOM.findDOMNode(this.refs.voterName).value = '';
    }
 
    renderList() {
        return this.props.voters.map((voter) => (
            <Voter key={voter._id} voter={voter} preview={true} />
        ));
    }
 
    render() {
        const vote = this.props.vote;
        return (
          <section>
              <div className="container">
                <header>
                    <h1>{ vote.title }</h1>

                    <div className="pull-right">
                        <Link to='/'>Finish Edit</Link>
                    </div>
                    <form className="new-task" onSubmit={this.saveTitle} >
                        <input
                            type="text"
                            ref="voteTitle"
                            placeholder="Type vote name"
                        />
                    </form>
                </header>

                <form className="new-task" onSubmit={this.handleSubmit} >
                    <input
                        type="text"
                        ref="voterName"
                        placeholder="Type the name"
                    />
                </form>

                <ul>
                    <header className="row">
                        <div className="col-sm-4" title="Name">
                            <i className="fa fa-user-o" />
                        </div>
                        <div className="col-sm-2" title="Yes">
                            <i className="fa fa-check-square-o"/>
                        </div>
                        <div className="col-sm-2" title="No">
                            <i className="fa fa-minus-square-o"/>
                        </div>
                        <div className="col-sm-2" title="Ignore">
                            <i className="fa fa-square-o" />
                        </div>
                        <div className="col-sm-2" title="Absent">
                            <i className="fa fa-user-times" />
                        </div>
                    </header>
                    {this.renderList()}
                </ul>
              </div>
          </section>
        );
    }
}

export default withTracker(() => {
    return {
        voters: Voters.find({}, { sort: { createdAt: -1 } }).fetch(),
        vote: Vote.findOne() || {title: 'Edit Voters List'}
    };
})(Edit);