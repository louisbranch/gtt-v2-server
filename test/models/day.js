var model = require("../../api/models/day");
var assert = require("assert");

describe("day model", function(){

  describe("create", function(){

    it("return a new day", function(){
      var start = new Date().toJSON();
      var day = create({
        date: "2014-01-20",
        start: start
      });
      assert.deepEqual(day, {
        date: "2014-01-20",
        start: start,
        pauses: [],
        tasks: []
      });
    });

    it("returns an error when date is missing", function(){
      assert.throws(function () {
        create({});
      }, /date required/);
    });

    it("returns an error when date format is invalid", function(){
      assert.throws(function () {
        create({date: "20140120"});
      }, /date format invalid: YYYY-MM-DD/);
    });

    it("returns an error when start is missing", function(){
      assert.throws(function () {
        create({date: "2014-01-20"});
      }, /start required/);
    });

    it("returns an error when start format is invalid", function(){
      assert.throws(function () {
        create({date: "2014-01-20", start: "abc"});
      }, /start time format invalid, use ISO 8601/);
    });

    function create(params) {
      var project = {days: []};
      return model.create(project, params);
    }

  });

  describe("update", function(){

    it("overwrites stat time", function(){
      var original = {
        date: "2014-01-23",
        start: "2014-01-23T17:53:16.503Z"
      };
      var day = model.update(original, {start: "2014-01-23T20:00:00.503Z"});
      assert.deepEqual(day, {
        date: "2014-01-23",
        start: "2014-01-23T20:00:00.503Z"
      });
    });

  });

  describe("find", function(){
    it("returns a day by its date", function(){
      var days = [
        {date: "2014-01-24"},
        {date: "2014-01-25"}
      ];
      var result = model.find("2014-01-25", days);
      assert.deepEqual(result, {date: "2014-01-25"});
    });
  });

  describe("end", function(){
    var params = {end: "2014-01-23T18:00:00.503Z"};

    describe("when day is ongoing", function(){

      it("adds end date", function(){
        var day = {start: "2014-01-23T10:00:00.503Z"};
        model.end(day, params);
        assert.deepEqual("2014-01-23T18:00:00.503Z", day.end);
      });

      xit("calculates day duration", function(){

      });

    });

    describe("when day is paused", function(){
      it("throws an error", function(){
        var day = {
          start: "2014-01-23T10:00:00.503Z",
          pauses: [{start: "2014-01-23T14:00:00.503Z"}]
        };
        assert.throws(function () {
          model.end(day, params);
        }, /day has been paused/);
      });

    });

    describe("when day is already over", function(){
      it("changes the end date", function(){
        var day = {
          start: "2014-01-23T10:00:00.503Z",
          end: "2014-01-23T15:00:00.503Z"
        };
        model.end(day, params);
        assert.deepEqual("2014-01-23T18:00:00.503Z", day.end);
      });

      xit("recalculates day duration", function(){

      });
    });

  });

});
