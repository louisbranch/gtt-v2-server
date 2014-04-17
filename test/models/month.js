var model = require("../../api/models/month");
var assert = require("assert");

describe("month model", function(){

  describe("find", function(){
    var project = {
      days: [
        {date: "2014-03-30"},
        {date: "2014-04-16"},
        {date: "2014-04-17"}
      ]
    };

    describe("days", function(){

      it("returns a list of days from that month", function(){
        var date = "2014-04";
        var month = model.find(date, project);
        assert.deepEqual([
          {date: "2014-04-16"},
          {date: "2014-04-17"}
        ], month.days);
      });

      it("returns an empty list when there is no days for month", function(){
        var date = "2013-02";
        var month = model.find(date, project);
        assert.deepEqual([], month.days);
      });

      it("returns an error when month is invalid", function(){
        var date = "200";
        assert.throws(function () {
          model.find(date, project);
        }, /invalid month format, use: YYYY-MM/);
      });

    });


  });

});
