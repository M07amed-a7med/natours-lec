
process.env.Node_ENV = 'test'

const expect = require('chai').expect;
const supertest = require('supertest')
const app = require('../../../app')
const server = require('../../../server')

describe('GET', () => {
    before((done) => {
        server.connect()
        done()
    })

    after((done) => {
        // server.closeConn();
        done()
    })

})

it('test get tour ok', (done) => {
    supertest(app).get('/api/v1/tours').then((res) => {
        let body = res.body;
        console.log(body)
        expect(body.data.tours.length).equal(0)      //property('_id')
        expect(body.status).equal('success')
        done();
    }).catch((err) => {
        console.log('err ', err)
        done(err)
    })
})


it('test get 1 tour ', (done) => {
    supertest(app).post('/api/v1/tours').send({
        "rating": 4.5,
        "ratingsAverage": 4.5,
        "ratingsQuantity": 37,
        "secretTour": false,
        "name": "mock test mmmmm",
        "duration": 5,
        "maxGroupSize": 25,
        "difficulty": "easy",
        "price": 397,
        "priceDiscount": 40,
        "summary": "Breathtaking hike through the Canadian Banff National Park",
        "imageCover": "tour-1-cover.jpg"
    }).then((res1) => {
        supertest(app).get('/api/v1/tours').then((res) => {
            let body = res.body
            expect(body.data.tours.length).equal(1)      //property('_id')
            expect(body.data.tours[0]).contain.property('_id')

            done();
        }).catch((err) => done(err))
        // console.log(body)
        // expect(body.status).equal('success')   
    }).catch((err) => done(err))
})






