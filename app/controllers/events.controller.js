const Event = require('../models/event');

module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents
}

/**
 * Show all the events
 * @param {request} req 
 * @param {response} res 
 */
function showEvents(req, res) {
    // get all the events
    Event.find({}, (err, events) => {
        // error found
        if(err) {
            res.status(404);
            res.send('Events not found');
        }

        // no error
        // return a view with data
        res.render('pages/events', {
            events: events
        });
    });
}

/**
 * Show a single event
 * @param {request} req 
 * @param {response} res 
 */
function showSingle(req, res) {
    // get a single event
    const event = {
        name: 'Basketball',
        slug: 'basketball',
        description: 'Throwing into a basket.'
    };

    Event.findOne({slug: req.params.slug}, (err, event) => {
        // error found
        if(err) {
            res.status(404);
            res.send('Events not found');
        }

        // no error
        // return a view with data
        res.render('pages/single', {
            event: event
        });
    });
}

/**
 * Seed the database
 * @param {request} req 
 * @param {response} res 
 */
function seedEvents(req, res) {
    // create dummy events
    const events = [{
            name: 'Basketball',
            description: 'Throwing into a basket.'
        },
        {
            name: 'Swimming',
            description: 'Michael Phelps is the fast fish.'
        },
        {
            name: 'Weightlifting',
            description: 'Lifting heavy things up'
        },
        {
            name: 'Ping Pong',
            description: 'Super fast paddles'
        }
    ];

    // use the Event model to insert/save
    Event.remove({}, () => {
        // After removing all the events present in the database, perform the seeding!
        for (event of events) {
            var newEvent = new Event(event);
            newEvent.save();
        }
    });

    // seeded!
    res.send('Database seeded!');
}
