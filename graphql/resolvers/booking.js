const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { transformEvent,
        transfromBooking } = require('./merge');


module.exports = { 
    bookings: async (args, req) => {
        if(!req.isAuth) throw new Error('Unauthenticated!!');
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transfromBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    },

    bookEvent: async (args,req ) => {
        if(!req.isAuth) throw new Error('Unauthenticated!!');

        const fetchedEvent = await Event.findOne({_id: args.eventId});
        const booking = new Booking(
            {user: req.userId, event: fetchedEvent}
        );

        const result = await booking.save();
        return transfromBooking(result);
    },

    cancelBooking: async (args,req) => {
        if(!req.isAuth) throw new Error('Unauthenticated!!');
        try {
            const booking = await Booking
                .findById(args.bookingId)
                .populate('event');
            const event = transformEvent(booking.event); //booking._doc.event is also working.
            
            await Booking.deleteOne({_id: args.bookingId});
            return event;
        } catch (err) {
            throw err;
        }
    }
}