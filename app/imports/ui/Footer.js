import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Vote } from '../api/vote.js'; 

export default class Title extends Component {
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
		<div style={{margin: "10px 0"}}>
			<div style={{ textAlign: "center" }} >
			    <div style={{ width: '49%'}}>{ vote.footer5 } : </div>
			    <div style={{ width: '45%', marginLeft: '25%'}}>
			        <dl className="dl-horizontal">
			            <dt style={dtStyle} >"{ vote.footer1 }" : <span>_________</span></dt>
			            <dd style={ddStyle}><span>{ vote.footer6 }</span></dd>

			            <dt style={dtStyle}>"{ vote.footer2 }" : <span>_________</span></dt>
			            <dd style={ddStyle}><span>{ vote.footer6 }</span></dd>

			            <dt style={dtStyle}>"{ vote.footer3 }" : <span>_________</span></dt>
			            <dd style={ddStyle}><span>{ vote.footer6 }</span></dd>

			            <dt style={dtStyle}>"{ vote.footer4 }" : <span>_________</span></dt>
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