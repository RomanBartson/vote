import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Vote } from '../api/vote.js';
import { Voters } from '../api/voters.js';
import Voter from './Voter.js';
import Title from './Title.js';
import Footer from './Footer.js';
import { Link } from "react-router-dom";
 
 class Check extends Component {
     render() {
        const style = {
            border: "solid #000",
            "borderWidth": "0 2px 2px 0",
            transform: "rotate(45deg)",
            height: "14px",
            width: "6px",
            display: "inline-block",
        };
        return (
            <i style={style} />
        );
     }
 }

class App extends Component {
  constructor(props) {
    super(props);

    this.toPDF = this.toPDF.bind(this);
  }
  toPDF() {
    const html =  ReactDOM.findDOMNode(this.refs.PDF).outerHTML;
     Meteor.call('vote.toPDF', html , function(res, err) {
        console.log(res,err);
     });
  }
  render() {
    const vote = this.props.vote || {};
    return (
      <section className="page" style={{ padding: "20px"}}>
          <div ref="PDF">
            <style dangerouslySetInnerHTML={{__html: `@page {size: A4; margin: 0;} @media print {body { padding: 50px 30px } body, html {width: 210mm, height: 297mm} section.page { page-break-after: always;} table {page-break-inside:auto} tr {page-break-inside:avoid; page-break-after:auto}`}} />
            <Title vote={vote} />
            <table width="100%" border="1px solid black">
                <thead>
                <tr style={{ textAlign: 'center' }}>
                    {_.map(['#', 'Name', 'Yes', 'No', 'Ignore', 'Absent'], (value, key) => {
                        return (
                          <th key={key} style={{ textAlign: 'center' }}>
                              {value}
                          </th>
                        );
                    })}
                </tr>
                </thead>
                <tbody>
                {_.map(this.props.voters, (voter, key) => {
                    return (
                        <tr key={key} >
                            <td>{key + 1}</td>
                            <td title="Name">
                                {voter.name}
                            </td>
                            <td title="Yes" style={{textAlign: "center"}}>
                                {voter.vote == 'Yes' ? <Check /> : null }
                            </td>
                            <td title="No" style={{textAlign: "center"}}>
                                {voter.vote == 'No' ? <Check /> : null }
                            </td>
                            <td title="Ignore" style={{textAlign: "center"}}>
                                {voter.vote == 'Ignore' ? <Check /> : null }
                            </td>
                            <td title="Absent" style={{textAlign: "center"}}>
                                {voter.vote == 'Absent' ? <Check /> : null }
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <Footer vote={vote} />
          </div>
          <footer>
              <Link to='/' className="btn btn-default" title="Back">
                  <i className="fa fa-arrow-left" title="Back" />
              </Link>
              <button
                  type="button"
                  className="btn btn-default"
                  title="To PDF"
                  onClick={this.toPDF}
              >
                  <i className="fa fa-file-pdf-o" title="To PDF" />
              </button>
              <a href={vote.filename} >Show PDF</a>
          </footer>
      </section>
    );
  }
}

export default withTracker(() => {
    return {
        vote: Vote.findOne({}),
        voters: Voters.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(App);