var assert = require("assert");
var time = require("../../api/helpers/time");

describe("time", function(){
  var day;

  beforeEach(function(){
    day = {
      start: "2014-01-23T09:00:00.503Z",
      end: "2014-01-23T18:00:00.503Z",
      pauses: [],
      tasks: []
    }
  });

  describe(".dayToMinutes", function(){

    it("returns the total time worked in minutes", function(){
      assert.equal(time.dayToMinutes(day), 540);
    });

    it("reduces pauses times", function(){
      day.pauses = [
        { start: "2014-01-23T10:00:00.503Z",
          end:   "2014-01-23T10:10:00.503Z" },
        { start: "2014-01-23T11:20:00.503Z",
          end:   "2014-01-23T11:40:00.503Z" }
      ];
      assert.equal(time.dayToMinutes(day), 510);
    });

    it("returns a partial time when day is not over", function(){
      delete day.end;
      day.tasks = [
        { end:   "2014-01-23T10:10:00.503Z" },
        { end:   "2014-01-23T10:30:00.503Z" }
      ];
      assert.equal(time.dayToMinutes(day), 90);
    });

    it("returns no time when none was done", function(){
      delete day.end;
      assert.equal(time.dayToMinutes(day), 0);
    });

    it("throws error when time format is invalid", function(){
      var day = {start: "9:00"};
      assert.throws(function(){ time.dayToMinutes(day); });
    });

  });

  describe(".display", function(){

    it("formats minutes in hours and minutes", function(){
      assert.equal(time.display( 71), "01:11");
      assert.equal(time.display(185), "03:05");
      assert.equal(time.display(600), "10:00");
    });

  });

});
