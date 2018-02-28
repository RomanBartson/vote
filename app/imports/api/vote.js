import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import pdf from 'html-pdf';
import path from 'path';

export const Vote = new Mongo.Collection('vote');

if (Meteor.isServer) {
    Meteor.methods({
        'vote.toPDF'(html = '') {
            let _storage_path = path.resolve('../../../../../public', 'storage', Random.id() + '.pdf');
            html = '<div>' + Random.id() + '</div>';

            var toF = pdf.create(html).toFile(_storage_path, Meteor.bindEnvironment((err, res) => {
                let vote = Vote.findOne();
                if (err) {
                    Vote.update({_id: vote._id }, {$set:{'error': err}});
                }
                if (res.filename) {
                    Vote.update({_id: vote._id }, {$set: {
                        'title': res.filename
                    }});
                }
            }));
        },
        'vote.save'(vote) {
            /** @ToDo: implement */
        }
    });
}