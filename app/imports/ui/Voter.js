import React, { Component } from 'react';
import { Voters } from '../api/voters.js';
export default class Voter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vote: '',
        };

        this.toggleVote = this.toggleVote.bind(this);
        this.check = this.check.bind(this);
    }
    check(e) {
        console.log(e.target.name.substr(5));
        const id = e.target.name.substr(5);
        const value = e.target.value;
        Voters.update(id, {
            $set: { vote: value },
        });
    }
    toggleVote(e) {
        this.setState({
            vote : e.target.value
        });
    }
    toggleChecked() {
        Voters.update(this.props.voter._id, {
          $set: { checked: !this.props.voter.checked },
        });
    }

    deleteThisTask() {
        Voters.remove(this.props.voter._id);
    }
    render() {
        const preview = this.props.preview || false;
        const taskClassName = this.props.voter.checked ? 'checked' : '';

        return (
            <li className={taskClassName + ' row'}>
                <div className="col-sm-4">
                {preview ?
                    <button 
                        className="delete"
                        onClick={this.deleteThisTask.bind(this)}
                    >
                        &times;
                    </button> : null 
                }

                {/*<input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.voter.checked}
                    onClick={this.toggleChecked.bind(this)}
                />*/}

               <span className="text">{this.props.voter.name}</span>
               </div>
               {_.map(['Yes', 'No', 'Ignore', 'Absent'], (value, key) => {
               	   return (
               	       <div className="col-sm-2" key={key}>
                   	       <input
                                type="radio"
                                readOnly
                                onClick={this.toggleVote}
                                name={'vote_' + this.props.voter._id}
                                value={value}
                                disabled={preview}
                                onChange={this.check}
                            />
                        </div>
               	   );
               })}
            </li>
        );
    }
}