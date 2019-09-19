const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');

//mearging resolvers
const rootResolver ={
    ...authResolver,
    ...eventsResolver,
    ...bookingResolver
};

module.exports=rootResolver;