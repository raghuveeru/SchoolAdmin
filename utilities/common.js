const updateTeacher = require('../db/teacherTable');
const updateStudent = require('../db/studentTable');
const updateTeacherStudentTable = require('../db/teacherStudentTable');

const updateTeacherStudent = ({teacher, students}) => {
    try{
        updateTeacher(teacher, (err, teacherData) => {   
            console.log(err);        
            if(!err){
            students.map(e =>{
            updateStudent(e, (studenterr, data) => {
                console.log(studenterr);
                if(!studenterr){          
                    console.log("hjkhk");
                    updateTeacherStudentTable(e, teacher, (err, res) => {
                        console.log("Student Id", e, teacher);
                    });            
            }
            });
            });
        }
        });
    
    }catch(err) {

    }
}

module.exports = updateTeacherStudent;