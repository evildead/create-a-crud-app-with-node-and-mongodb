const Event = require('../models/event');

module.exports = {
    // show all events
    showEvents: (req, res) => {
        // get all the events

        // return a view with data
        res.render('pages/events', {events: events});
    },

    showSingle: (req, res) => {
        // get a single event
        const event = { name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.' };

        // return a view with data
        res.render('pages/single', {event: event});
    },

    // seed our database
    seedEvents: (req, res) => {
        // create dummy events
        const events = [
            { name: 'Basketball', description: 'Throwing into a basket.' },
            { name: 'Swimming', description: 'Michael Phelps is the fast fish.' },
            { name: 'Weightlifting', description: 'Lifting heavy things up' },
            { name: 'Ping Pong', description: 'Super fast paddles' }
        ];

        // use the Event model to insert/save
        Event.remove({}, () => {
            // After removing all the events present in the database, perform the seeding!
            for(event of events) {
                var newEvent = new Event(event);
                newEvent.save();
            }
        });

        // seeded!
        res.send('Database seeded!');
    }
};
