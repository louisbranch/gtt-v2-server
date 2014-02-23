var model = require("../../api/models/pause");
var assert = require("assert");

describe("pause model", function(){

  describe("start", function(){
    var params = {start: new Date(), message: "lunch"};

    describe("when day is ongoing", function(){
      var day;

      beforeEach(function(){
        day = {pauses: []};
      });

      it("returns a new pause", function(){
        assert.deepEqual(params, model.start(day, params));
      });

      it("adds pause to days pause list", function(){
        var pause = model.start(day, params);
        assert.deepEqual(day.pauses[0], pause);
      });
    });

    describe("when day is already paused", function(){
      it("returns an error", function(){
        var day = {pauses: [{start: new Date()}]};
        assert.throws(function () {
          model.start(day, params);
        }, /day is already paused/);
      });
    });

    describe("when day is already over", function(){
      it("returns an error", function(){
        var day = {end: new Date()};
        assert.throws(function () {
          model.start(day, params);
        }, /day is already over/);
      });
    });

  });

  describe("stop", function(){
    var params = {end: new Date()};

    describe("when day is already paused", function(){
      var day;

      beforeEach(function(){
        day = {pauses: [{start: new Date()}]};
      });

      it("returns the pause", function(){
        assert.deepEqual(params.end, model.stop(day, params).end);
      });

      it("adds end date to last pause", function(){
        model.stop(day, params);
        assert.deepEqual(params.end, day.pauses[0].end);
      });
    });

    describe("when day is no paused yet", function(){
      it("returns an error", function(){
        var day = {pauses: []};
        assert.throws(function () {
          model.stop(day, params);
        }, /day is not paused yet/);
      });
    });

    describe("when day is already over", function(){
      it("returns an error", function(){
        var day = {end: new Date()};
        assert.throws(function () {
          model.stop(day, params);
        }, /day is already over/);
      });
    });

  });

});
