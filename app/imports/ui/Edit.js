import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Voters } from '../api/voters.js';
import { Vote } from '../api/vote.js';
import Voter from './Voter.js';
import Title from './Title.js';
import Footer from './Footer.js';
import { Link } from "react-router-dom";

 
class Edit extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveTitle = this.saveTitle.bind(this);
        this.saveFooter = this.saveFooter.bind(this);
        this.save = this.save.bind(this);

    }
    saveTitle(event) {
        this.save(event, 'title');
    }
    saveFooter(event) {
        this.save(event, 'footer');
    }
    save(event, type) {
        event.preventDefault();
        let formId = event.target.name;

        let ref = this.refs[type + formId];
        const title = ReactDOM.findDOMNode(ref).value.trim();
        let lastVote = Vote.findOne({});
        if (!lastVote) {
            Vote.insert({
                [type + formId]: title,
                createdAt: new Date(),
            });
        } else {
            Vote.update(lastVote._id, {$set:{
                [type + formId]: title,
                createdAt: new Date(),
            }});
        }

        ReactDOM.findDOMNode(ref).value = '';
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
                    <div className="text-right">
                        <Link to='/'>Finish Edit</Link>
                    </div>
                    <Title vote={vote} />
                    {_.map([1,2,3,4,5,6], (item) => {
                        return (
                            <form className="new-task" name={item} key={item} onSubmit={this.saveTitle}>
                                <input
                                    type="text"
                                    ref={"title" + item}
                                    placeholder={"Type vote title " + item}
                                />
                            </form>
                        );
                    })}
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

                {_.map([1,2,3,4,5,6,7,8,9], (item) => {
                        return (
                            <form className="new-task inline" name={item} key={item} onSubmit={this.saveFooter}>
                                <label>
                                    {this.props.vote["footer" + item]}
                                </label>
                                <input
                                    type="text"
                                    ref={"footer" + item}
                                    placeholder={this.props.vote["footer" + item]}
                                    name={"footer" + item}
                                />
                            </form>
                        );
                })}
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