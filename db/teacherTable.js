const db = require('./db_connect');

const query = {
    insert: 'insert into teacher(email) select ? where not exists(select 1 from teacher where email = ?) limit 1'
}

const updateTeacher = (values, cb) => {
    db.query(query.insert, [values,values], (err, data) => {
        if(err){
            cb(err)
        }else{
            cb(null, data)
        }
    })
}

module.exports.updateTeacher = updateTeacher;