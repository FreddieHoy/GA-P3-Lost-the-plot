/* global api, describe, it, expect, beforeEach, afterEach */
const Plot = require('../../models/Plot')
const plotData = require('../../db/data/plotData')
describe('GET /plots', () => {

  beforeEach(done => {
    Plot.create(plotData)
      .then(() => done())
  })

  afterEach(done => {
    Plot.remove({})
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/plots')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/api/plots')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', done => {
    api.get('/api/plots')
      .end((err, res) => {
        res.body.forEach(plot => {
          expect(plot).to.be.an('object')
        })
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get('/api/plots')
      .end((err, res) => {
        res.body.forEach(plot => {
          expect(plot).to.contains.keys([
            '_id',
            'name',
            'plotType',
            'streetAddress',
            'postCode',
            'latitude',
            'sizeInMeters',
            'numOfSlots',
            'slotsAvailable',
            'facilities',
            'costInvolved',
            'costPerAnnum',
            'ConditionsForUse',
            'Volunteer',
            'comments',
            'primaryContactName',
            'primaryContactEmail',
            'user'
          ])
        })
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get('/api/plots')
      .end((err, res) => {
        res.body.forEach(plot => {
          expect(plot._id).to.be.a('string')
          expect(plot.name).to.be.a('string')
          expect(plot.streetAddress).to.be.a('string')
          expect(plot.plotType).to.deep.eq('string')
          expect(plot.postCode).to.be.a('string')
          expect(plot.latitude).to.be.a('number')
          expect(plot.longitude).to.be.a('number')
          expect(plot.sizeInMeters).to.be.a('number')
          expect(plot.numOfSlots).to.be.a('number')
          expect(plot.slotsAvailable).to.be.a('boolean')
          expect(plot.facilities).to.deep.eq('array')
          expect(plot.costInvolved).to.be.a('boolean')
          expect(plot.costPerAnnum).to.be.a('number')
          expect(plot.ConditionsForUse).to.deep.eq('array')
          expect(plot.Volunteer).to.be.a('boolean')
          expect(plot.comments).to.deep.eq('array')
          expect(plot.primaryContactName).to.be.a('string')
          expect(plot.primaryContactEmail).to.be.a('string')
          expect(plot.user).to.deep.eq('object')
        })
        done()
      })
  })
})