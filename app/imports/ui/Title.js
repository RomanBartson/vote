import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Vote } from '../api/vote.js'; 

export default class Title extends Component {
  render() {
  	const vote = this.props.vote;
  	return (
  		<div style={{ textAlign: "center" }}>
            <div><strong>{ vote.title1 }</strong></div>
            <div><strong>{ vote.title2 }</strong></div>
            <div>{ vote.title3 }</div>
            <div><strong>{ vote.title4 }</strong></div>
            <div><strong>{ vote.title5 }</strong></div>
            <div><strong>{ vote.title6 }</strong></div>
        </div>
  	);
  }
};