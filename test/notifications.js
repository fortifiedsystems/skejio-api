// ANCHOR External Modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

// ANCHOR Internal Modules
const server = require('../server');
const User = require('../models/User');
const Notification = require('../models/Notification');

chai.use(chaiHttp);

describe('Notification API', function () {
    let newNotification;

    this.beforeEach(function (done) {
        newNotification = new Notification({
            message: 'This is a notification generated by the test suite.',
            user: '60b68c606c98bbe6f24bbe29',
        });
        newNotification.save(function (err) {
            done();
        });
    });

    this.afterEach(function (done) {
        Notification.collection
            .findOneAndDelete(
                {
                    message: 'This is a notification generated by the test suite.'
                }
            );
        done();
    });

    it('should have a user field with objectId as value', function (done) {
        newNotification.should.have.property('user');
        User.collection.findOne({ _id: newNotification.user })
            .then(response => {
                chai.expect(response.__t).to.be.a('string');
            })
            .catch(err => {
                console.log(err);
            });
        done();
    });

    it('should have a message field with string as value', function (done) {
        newNotification.should.have.property('message');
        chai.expect(newNotification.message).to.be.a('string');
        done();
    })

    it('should have a message field with string as value', function (done) {
        newNotification.should.have.property('read');
        chai.expect(newNotification.read).to.be.a('boolean');
        chai.expect(newNotification.read).to.equal(false);
        done();
    })

    it('should have ability to be marked as read', function (done) {
        chai.request(server)
            .put(`/api/v1/notifications/${newNotification._id}/markAsRead`)
            .send({})
            .end(function (err, res) {
                if (!err) {
                    chai.expect(res.body.notification.read).to.equal(true);
                    done();
                } else {
                    console.log(err)
                }
            });
    });
});