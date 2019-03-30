const registerRoute = require('./register');
const commonStudentsRoute = require('./commonStudents');
const notificationRoute = require('./retrievefornotifications');
const suspendRoute = require('./suspend');

module.exports = [registerRoute, commonStudentsRoute, notificationRoute, suspendRoute];