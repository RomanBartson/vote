import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Vote } from '../api/vote.js'; 
import { Voters } from '../api/voters.js';
import { withTracker } from 'meteor/react-meteor-data';

class Title extends Component {
  render() {
	const vote = this.props.vote;
	const dtStyle = {
		float: "left",
		width: "177px",
		overflow: "hidden",
		clear: "left",
		textAlign: "right",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap"
	}
	const ddStyle = {
		marginLeft: "180px",
		width: "10px"
	}
  	return (
		<div style={{margin: "100px 0 20px 0",}}>
			<div style={{ textAlign: "center" }} >
			    <div style={{ width: '49%'}}>{ vote.footer5 } : </div>
			    <div style={{ width: '45%', marginLeft: '25%'}}>
			        <dl className="dl-horizontal">
			            <dt style={dtStyle} >"{ vote.footer1 }" : <span> { this.props.countYes } </span></dt>
			            <dd style={ddStyle}><span>{ vote.footer6 }</span></dd>

			            <dt style={dtStyle}>"{ vote.footer2 }" : <span> { this.props.countNo } </span></dt>
			            <dd style={ddStyle}><span>{ vote.footer6 }</span></dd>

			            <dt style={dtStyle}>"{ vote.footer3 }" : <span> { this.props.countIgnore } </span></dt>
			            <dd style={ddStyle}><span>{ vote.footer6 }</span></dd>

			            <dt style={dtStyle}>"{ vote.footer4 }" : <span> { this.props.countAbsent } </span></dt>
			            <dd style={ddStyle}><span>{ vote.footer6 }</span></dd>
			        </dl>
			    </div>

	            <div>{ vote.footer7 } : <span>___________</span> </div>
            </div>

            <div style={{ margin: "13px 0" }}>
	            <div>{ vote.footer8 } : <span>_______________</span> <span>_______________</span> </div>
	            <div>{ vote.footer9 } : <span>_______________</span> <span>_______________</span> </div>
            </div>
        </div>
  	);
  }
};

export default withTracker(({vote}) => {
    return {
        vote: vote,
        countYes: Voters.find({ vote: 'Yes' }).count(),
        countNo: Voters.find({ vote: 'No' }).count(),
        countIgnore: Voters.find({ vote: 'Ignore' }).count(),
        countAbsent : Voters.find({ vote: 'Absent' }).count()
    };
})(Title);