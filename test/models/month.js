var model = require("../../api/models/month");
var assert = require("assert");

describe("month model", function(){

  describe("find", function(){
    var project = {
      days: [
        {date: "2014-03-30", duration: 600},
        {date: "2014-04-16", duration: 480},
        {date: "2014-04-17", duration: 400}
      ],
      currency: "usd",
      rate: 30
    };

    it("returns an error when month is invalid", function(){
      var date = "200";
      assert.throws(function () {
        model.find(date, project);
      }, /invalid month format, use: YYYY-MM/);
    });

    describe("days", function(){

      it("returns a list of days from that month", function(){
        var date = "2014-04";
        var month = model.find(date, project);
        assert.deepEqual([
          {date: "2014-04-16", duration: 480},
          {date: "2014-04-17", duration: 400}
        ], month.days);
      });

      it("returns an empty list when there is no days for month", function(){
        var date = "2013-02";
        var month = model.find(date, project);
        assert.deepEqual([], month.days);
      });

    });

    describe("time", function(){

      it("returns the time formated as hours and minutes", function(){
        var date = "2014-04";
        var month = model.find(date, project);
        assert.deepEqual("15h40", month.time);
      });

      it("returns an empty time when there is no days", function(){
        var date = "2013-02";
        var month = model.find(date, project);
        assert.deepEqual("00h00", month.time);
      });

    });

    describe("cost", function(){

      it("returns the monthly cost based on minutes and project rate", function(){
        var date = "2014-04";
        var month = model.find(date, project);
        assert.deepEqual(440, month.cost);
      });

      it("returns no cost when there is no days", function(){
        var date = "2013-02";
        var month = model.find(date, project);
        assert.deepEqual(0, month.cost);
      });

    });

    describe("currency", function(){

      it("returns the project currency", function(){
        var date = "2014-02";
        var month = model.find(date, project);
        assert.deepEqual("usd", month.currency);
      });

    });

  });

});
