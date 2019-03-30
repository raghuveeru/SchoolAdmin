process.env.NODE_ENV = "test"

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp)

describe('/GET commonstudents', () => {
    it('it should Get all common students to teachers', (done) => {
        chai.request(app)
        .get('/api/commonstudents?teacher=teacherken@gmail.com&teacher=teacherjoe@gmail.com')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('students');
            done();
        });
    });
});

describe('/GET studentstoteacher', () => {
    it('it should Get all students to teacher', (done) => {
        chai.request(app)
        .get('/api/commonstudents?teacher=teacherken@gmail.com')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('students');
            done();
        });
    });
});