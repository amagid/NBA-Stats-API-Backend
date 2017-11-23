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

            jwt.generate(testData)
                .catch(err => { throw "Token Generation Failed"; })
                .then(generated => { return jwt.decode(generated.token); })
                .catch(err => {
                    console.log(JSON.stringify(err, null, 4)) 
                    throw "Token Decode Failed"; })
                .then(data => {
                    if (data.woo === testData.woo && data.hoo.foo === testData.hoo.foo) {
                        done();
                    } else {
                        assert.fail(data, testData, "Payload Data Not Preserved");
                    }
                })
                .catch(err => {
                    assert.fail(null, null, err);
                });
        }).timeout(baseTimeout);
    });
});