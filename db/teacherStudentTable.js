const db = require('./db_connect');
var mysql = require('mysql');

const queries = {
    insert: 'insert into studenttoteacher(student, teacher) select ?,? where not exists(select 1 from studenttoteacher where student = ? and teacher = ?) limit 1',
    getStudentsByTeacher: 'select student from studenttoteacher where teacher in (?)'
}

const updateTeacherStudentTable = (student, teacher, cb) => {
    db.query(queries.insert, [student,teacher,student,teacher], (err, data) => {
        if(err){
            cb(err)
        }else{
            cb(null, data)
        }
    })
}

const getStudentsByTeacher = (teacher, cb) => {
     db.query(queries.getStudentsByTeacher, teacher, (err, data) => {
         if(err){
             cb(err)
         }else{
             cb(null, data)
         }
     })
 }

 const getCommonStudentsByTeachers = (teachers, cb) => {
     let finalQuery = queries.getStudentsByTeacher;
        if(Array.isArray(teachers)){
        let i=0;     
            teachers.map(teacher =>{
                if(i!=0)
                    finalQuery = finalQuery + " and student in (select student from studenttoteacher where teacher = ?)";
                    i=i+1;
            });
        }
     finalQuery=mysql.format(finalQuery,teachers);
     db.query(finalQuery,null, (err, data) => {
        if(err){
           cb(err)
        }else{
           cb(null, data)
        }
    })
}

module.exports.updateTeacherStudentTable = updateTeacherStudentTable;
module.exports.getStudentsByTeacher = getStudentsByTeacher;
module.exports.getCommonStudentsByTeachers = getCommonStudentsByTeachers;