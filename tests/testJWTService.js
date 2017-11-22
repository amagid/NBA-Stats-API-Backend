const assert = require('chai').assert;
const jwt = require('../src/services/jwt');
const baseTimeout = 5000;

describe('JWT Service', function() {
    describe('Encode / Decode', function() {
        it('Should return the original data encoded in the JWT', function(done) {
            const testData = {
                woo: 3,
                hoo: {
                    foo: 'bar'
                }
            };

            return jwt.generate(testData)
                .catch(err => { throw "Token Generation Failed"; })
                .then(jwt.decode)
                .catch(err => { throw "Token Decode Failed"; })
                .then(data => {
                    assert.deepEqual(testData, data);
                })
                .catch(err => {
                    assert.fail(null, null, err);
                });
        });
    });
});