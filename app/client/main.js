import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import RouterContainer from '../imports/startup/router.js';

Meteor.startup(() => {
	render(<RouterContainer />, document.getElementById('app'));
});