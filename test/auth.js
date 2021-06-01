// ANCHOR External Modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

// ANCHOR Internal Modules
const server = require('../server');
const User = require('../models/User');

chai.use(chaiHttp);

describe('User API', function () {
    this.afterEach(function (done) {
        User.collection
            .findOneAndDelete(
                {
                    email: "john.smith@js.com"
                }
            );
        done();
    });

    it('should return status code of 200 on successful login', function (done) {
        chai.request(server)
            .post('/api/v1/auth/login')
            .send({
                email: 'jasonhawkharris@gmail.com',
                password: '17T481mx0!',
            })
            .end(function (err, res) {
                if (!err) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('signedJwt');
                    res.body.should.have.property('message');
                } else {
                    console.log(err)
                }
            });
        done();
    });

    it('should return the correct user object on registration', function (done) {
        chai.request(server)
            .post('/api/v1/auth/register')
            .send({
                "firstName": "John",
                "lastName": "Smith",
                "email": "john.smith@js.com",
                "username": "johnsmith",
                "password": "password",
                "accountType": "Manager"
            })
            .end(function (err, res) {
                if (!err) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');

                } else {
                    console.log(error);
                }
            });
        done();
    });
});
