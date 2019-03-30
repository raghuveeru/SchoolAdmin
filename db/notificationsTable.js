const db = require('./db_connect');
var mysql = require('mysql');

const query = {
    sendnotification: 'insert into notifications(teacher,notification) values(?,?)'
}

const updateNotification = (values, cb) => {
    let finalQuery=mysql.format(query.sendnotification,values);
    db.query(finalQuery,'', (err, data) => {
        if(err){
            cb(err)
        }else{
            cb(null, data)
        }
    })
}

module.exports = updateNotification;