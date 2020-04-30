process.env.Node_ENV = 'test'

const expect = require('chai').expect;
const supertest = require('supertest')
const app = require('../../../app')
const server = require('../../../server')

describe('Testing POST requests ', () => {
    before((done) => {
        server.connect()
        done()
    })

    after((done) => {
        // server.closeConn();
        done()
    })


    it('test post tour ok', (done) => {
        supertest(app).post('/api/v1/tours').send({
            "rating": 4.5,
            "ratingsAverage": 4.5,
            "ratingsQuantity": 37,
            "secretTour": false,
            "name": "mock test tour",
            "duration": 5,
            "maxGroupSize": 25,
            "difficulty": "easy",
            "price": 397,
            "priceDiscount": 40,
            "summary": "Breathtaking hike through the Canadian Banff National Park",
            "imageCover": "tour-1-cover.jpg"
        }).then((res) => {
            let body = res.body;
            // console.log(body)
            expect(body.data.tour).contain.property('_id')   //property('_id')
            expect(body.status).equal('success')
            done();
        }).catch((err) => done(err))
    })


    it('test post tour failed', (done) => {
        supertest(app).post('/api/v1/tours').send({
            "rating": 4.5,
            "ratingsAverage": 4.5,
            "ratingsQuantity": 37,
            "secretTour": false,
            "name": "mock test",
            "duration": 5,
            "maxGroupSize": 25,
            "difficulty": "easy",
            "price": 397,
            "priceDiscount": 40,
            "summary": "Breathtaking hike through the Canadian Banff National Park",
            "imageCover": "tour-1-cover.jpg"
        }).then((res) => {
            let body = res.body;
            // console.log(body)
            expect(body.error.name).equal('ValidationError')   //property('_id')
            // expect(body.status).equal('success')   
            done();
        }).catch((err) => done(err))
    })


})



