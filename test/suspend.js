process.env.NODE_ENV = "test"

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp)

describe('/POST suspend student', () => {
    it('it sould post the request info', (done) => {
        const req = 
        {
            "student": "studentjon3@example.com"
        };        

        chai.request(app)
        .post('/api/suspend')        
        .send(req)
        .end((err, res) => {
            res.should.have.status(204);
            done();
        });
    });
});