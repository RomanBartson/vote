import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Voters } from '../api/voters.js';
import { Vote } from '../api/vote.js';
import Voter from './Voter.js';
import { Link } from "react-router-dom";

 
class Index extends Component {

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
            <Voter key={voter._id} voter={voter} preview={false} />
        ));
    }
 
    render() {
        const vote = this.props.vote;
        return (
            <section>
                <div className="container">
                    <header>
                        <h1> { vote.title } </h1>
                        <div className="pull-right">
                            <Link to='/edit' title="Edit">
                                <i className="fa fa-pencil-square-o"/>
                            </Link>
                        </div>
                    </header>
     
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

                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-default"
                            title="Save Results"
                        >
                            <i className="fa fa-save" title="Save Results" />
                        </button>
                        <button
                            type="button"
                            className="btn btn-default"
                            title="To PDF"
                        >
                            <i className="fa fa-file-pdf-o" title="To PDF" />
                        </button>
                    </div>
                </div>
          </section>
        );
    }
}

export default withTracker(() => {
    return {
        voters: Voters.find({}, { sort: { createdAt: -1 } }).fetch(),
        vote: Vote.findOne({}) || { title: 'Default Title'}
    };
})(Index);