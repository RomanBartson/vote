export const Results = new Mongo.Collection('results');

if (Meteor.isServer) {
    Meteor.methods({
        'results.find'() {
            return Results.find({});
        }
    });
}