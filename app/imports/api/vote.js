import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import pdf from 'html-pdf';
import path from 'path';
import App from '../ui/App.js';

export const Vote = new Mongo.Collection('vote');

if (Meteor.isServer) {
    Meteor.methods({
        'vote.toPDF'(html = '') {
            let name = Random.id() + '.pdf';
            let _storage_path = path.resolve('../../../../../public', 'storage', name);

            if (!html) html = '<div>' + Random.id() + '</div>';

            /*let vote = Vote.findOne();
            name = 'gXxQkcJx7ePqN62Ku.pdf';
            Vote.update({_id: vote._id }, {$set: {
                'filename': '/storage/' + name
            }});*/
            var toF = pdf.create(html).toFile(_storage_path, Meteor.bindEnvironment((err, res) => {
                let vote = Vote.findOne();
                if (err) {
                    Vote.update({_id: vote._id }, {$set: {'error': err}});
                }
                if (res.filename) {
                    Vote.update({_id: vote._id }, {$set: {
                        'filename': path.resolve('/storage/', name)
                    }});
                }
            }));
        },
        'vote.save'(vote) {
            /** @ToDo: implement */
        }
    });
}