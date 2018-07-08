import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Results } from '../api/results';
import { Vote } from '../api/vote.js';
import { Voters } from '../api/voters.js';
import Voter from './Voter.js';
import Title from './Title.js';
import Footer from './Footer.js';
import { Link } from "react-router-dom";

import _ from 'underscore';
{/*<style dangerouslySetInnerHTML={{__html: `@page {size: A4; margin: 0;} @media print {body { padding: 50px 30px } body, html {width: 210mm, height: 297mm} section.page { page-break-after: always;} table {page-break-inside:auto} tr {page-break-inside:avoid; page-break-after:auto}`}} />*/}

class BtnGroup extends Component {
    constructor(props) {
        super(props);

        this.toPdf = this.toPdf.bind(this);
    }
    toPdf() {
        this.props.toPdf();
    }
    render() {
        const disable = this.props.creating && !this.props.isResultsReady;
        return (
            <div className="btn-group">
                <Link to='/' className="btn btn-default" title="Back">
                    <i className="fa fa-arrow-left" title="Back" />
                </Link>
                <button
                    type="button"
                    className="btn btn-default"
                    title="To PDF"
                    onClick={this.toPdf}
                    disabled={disable}
                >
                    <i className="fa fa-file-pdf-o" title="To PDF" />{' '}
                    {this.props.creating ? <i className="fa fa-gear fa-spin"/> : null }
                </button>
                <a
                    className="btn btn-default"
                    href={disable ? '#' : this.props.vote.filename}
                >
                    Show PDF
                </a>
        </div>);
    }
}
class Check extends Component {
    render() {
        /*const style = {
            border: "solid red",
            borderWidth: "0 2px 2px 0",
            transform: "rotate(45deg)",
            WebkitTransform: "rotate(45deg)",
            MozTransform:    "rotate(45deg)",
            MsTransform:     "rotate(45deg)",
            OTransform:      "rotate(45deg)",
            height: "14px",
            width: "6px",
            display: "inline-block",
        };*/
        return this.props.isChecked ? (<i>✔</i>) : null;
     }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creating: false
        };
        this.toPDF = this.toPDF.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isResultsReady != nextProps.isResultsReady) {
            this.setState({
                creating: !nextProps.isResultsReady
            })
        }
    }
    toPDF() {
        this.setState({creating: true});
        Meteor.call('vote.toPDF', ReactDOM.findDOMNode(this.refs.PDF).outerHTML , (err) => {
            if (err) throw err;
        });
    }
    render() {
        const vote = this.props.vote || {};
        const tdStyle={
            border: '1px solid black',
            width: '116mm',
            maxWidth: '116mm',
            minWidth: '116mm',
            textAlign: 'center'
            /*wordWrap: 'break-word'*/
        };
        const tdStyleCheck = {
            width: '15mm',
            maxWidth: '15mm',
            minWidth: '15mm',
            border: '1px solid black',
            textAlign: 'center'
        };
        return (
            <section className="page" style={{ padding: "20px" }}>
                <BtnGroup vote={vote} toPdf={this.toPDF} creating={this.state.creating} isResultsReady={this.props.isResultsReady}/>
                <div ref="PDF">
                    <style dangerouslySetInnerHTML={{__html: `@media print { tr { page-break-inside: avoid !important; display: table !important; text-align: center; }}`}}/>
                    <table align={'center'} style={{width: '195mm', borderCollapse: 'collapse', borderSpacing: 0}}>
                        <caption>
                            <Title vote={vote} />
                        </caption>
                        <thead>
                        <tr>
                            {_.map(['#', 'Name', 'Yes', 'No', 'Ign', 'Abs'], (value, key) => {
                                return (<th key={key} style={value == 'Name' ? tdStyle : tdStyleCheck}>
                                    {value}
                                </th>);
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {_.map(this.props.voters, (voter, key) => {
                            return (
                                <tr key={key}>
                                    <td style={tdStyleCheck}>{key + 1}</td>
                                    <td title="Name" style={tdStyle}>{voter.name}</td>
                                    <td title="Yes" style={tdStyleCheck}>{<Check isChecked={voter.vote == 'Yes'}/>}</td>
                                    <td title="No" style={tdStyleCheck}>{<Check isChecked={voter.vote == 'No'}/>}</td>
                                    <td title="Ignore" style={tdStyleCheck}>{<Check isChecked={voter.vote == 'Ignore'}/>}</td>
                                    <td title="Absent" style={tdStyleCheck}>{<Check isChecked={voter.vote == 'Absent'}/>}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <Footer vote={vote} />
                </div>
                <footer>
                    <BtnGroup vote={vote} toPdf={this.toPDF} creating={this.state.creating} isResultsReady={this.props.isResultsReady} />
                </footer>
            </section>
        );
    }
}

export default withTracker(() => {
    const resultsStatus = Results.findOne({type: 'status'});
    return {
        isResultsReady: resultsStatus ? resultsStatus.ready : null,
        vote: Vote.findOne({}),
        voters: Voters.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(App);