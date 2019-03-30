const db = require('./db_connect');

const query = {
    insert: 'insert into student(email) select ? where not exists(select 1 from student where email = ?) limit 1',
    suspend: 'update student set is_suspended = ? where email = ?'
}

const updateStudent = (values, cb) => {
    db.query(query.insert, [values,values], (err, data) => {
        console.log(err);
        if(err){
            cb(err)
        }else{
            cb(null, data)
        }
    })
}

const suspendStudent = (student, cb) => {
    db.query(query.suspend, [1,student], (err, data) => {
        if(err){
            cb(err)
        }else{
            cb(null, data)
        }
    })
}

module.exports.updateStudent = updateStudent;
module.exports.suspendStudent = suspendStudent;