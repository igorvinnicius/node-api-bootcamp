const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller - Login', function() {    

    it('should throw and error with code 500 if accessing the database fails', function(done){
        
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: 'test@tes.com',
                password: 'tester'
            }
        };

        AuthController.login(req, {}, () => {})
        .then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            done();
        });

        User.findOne.restore();
    });

    it('should send a response with a valid user status for an existing user', function(){

        mongoose.connect(
            'mongodb+srv://igorvinnicius:pQiL9RFokLyzjqAD@cluster0.uyf4p.mongodb.net/test-node-bootcamp?retryWrites=true&w=majority'
        )
        .then(result => {
            
            const user = new User({
                email: 'test@test.com',
                password: 'tester',
                name: 'test',
                posts: [],
                _id: '5fd89183c04e1149cc540e2f'
            });

            return user.save();
        })
        .then(() => {
            
            const req = { userId: '5fd89183c04e1149cc540e2f' };
            const res = {
                statusCode: 500,
                userStatus: null,
                status: function (code) {
                    this.statusCode = code;
                    return this;
                },
                json: function (data) {
                    this.userStatus = data.status;
                }
            };

            AuthController.getUserStatus(req, res, () => {})
            .then(() => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.userStatus).to.be.equal('I am new!');
                done();
            });
        })
        .catch(err => console.log(err));

    });

});
