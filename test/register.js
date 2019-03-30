process.env.NODE_ENV = "test"

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp)

describe('/POST studentteacher register', () => {
    it('it sould post the request info', (done) => {
        const req = {
             "teacher": "teacherken4@gmail.com",
            "students":
                [
                "studentjon3@example.com",
                "studenthon3@example.com"
                ]
        };

        chai.request(app)
        .post('/api/register')        
        .send(req)
        .end((err, res) => {
            res.should.have.status(204);
            done();
        });
    });
});