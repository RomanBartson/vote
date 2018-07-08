import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import pdf from 'html-pdf';
import path from 'path';
import { Results } from './results';
import App from '../ui/App.js';

export const Vote = new Mongo.Collection('vote');

const config = {

    // Export options
    "directory": "/tmp",       // The directory the file gets written into if not using .toFile(filename, callback). default: '/tmp'
    "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
    "orientation": "portrait", // portrait or landscape

    // Page options
    //"border": "20mm",             // default is 0, units: mm, cm, in, px
    "border": {
                    // default is 0, units: mm, cm, in, px
        "top": "0.2in",
        "right": "0.2in",
        "bottom": "0.2in",
        "left": "0.2in"
    },


    "timeout": "120000",

    "type": "pdf",             // allowed file types: png, jpeg, pdf
    //"quality": "75",

    //"renderDelay": 1000,

    //paginationOffset: 1,       // Override the initial pagination number
    //zoomFactor: 1,
    /*"header": {
        "height": "45mm",
       // "contents": '<div style="text-align: center;">Author: Marc Bachmann</div>'
    },*/
    /*"paperSize": {
        "margin": "40cm",
        "padding": "40cm"
    },*/
    /*"footer": {
        "height": "28mm",*/
        /*"contents": {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }*/
    //},

    // To run Node application as Windows service
    /*"childProcessOptions": {
        "detached": true
    },*/
};

if (Meteor.isServer) {
    Meteor.methods({
        'vote.toPDF'(html = '') {

            if (!Results.findOne({type: 'status'})) {
                Results.insert({type: 'status', ready: false});
            } else {
                Results.update({type: 'status'}, {$set: {ready: false}});
            }

            let name = Random.id() + '.pdf';
            let _storage_path = path.resolve('../../../../../public', 'storage', name);

            if (!html) html = '<div>' + Random.id() + '</div>';

            /*let vote = Vote.findOne();
            name = 'gXxQkcJx7ePqN62Ku.pdf';
            Vote.update({_id: vote._id }, {$set: {
                'filename': '/storage/' + name
            }});*/
            var toF = pdf.create(html, config).toFile(_storage_path, Meteor.bindEnvironment((err, res) => {
                let vote = Vote.findOne();
                if (err) {
                    Vote.update({_id: vote._id }, {$set: {'error': err}});
                }
                if (res.filename) {
                    Vote.update({_id: vote._id }, {$set: {
                        'filename': '/storage/' + name
                    }});
                    Results.update({type: 'status'}, {$set: {ready: true}});
                }
            }));
        },
        'vote.save'(vote) {
            /** @ToDo: implement */
        }
    });
}