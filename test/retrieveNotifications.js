process.env.NODE_ENV = "test"

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp)

describe('/POST retrievenotifications', () => {
    it('it should Get all students for notification', (done) => {
        const req = {
            "teacher":  "teacherken@gmail.com",
            "notification": "Hello students! @studentagnes@exam.gmail.com @studentmiche@gmail.com"
          };

        chai.request(app)
        .post('/api/retrievefornotifications')
        .send(req)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('students');
            done();
        });
    });
});
