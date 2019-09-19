const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { transformEvent,
        transfromBooking } = require('./merge');


module.exports = { 
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transfromBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async args => {
        const fetchedEvent = await Event.findOne({_id: args.eventId});
        const booking = new Booking(
            {user: "5d8265e6caf9890431e8a657", event: fetchedEvent}
        );

        const result = await booking.save();
        return transfromBooking(result);
    },
    cancelBooking: async args => {
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