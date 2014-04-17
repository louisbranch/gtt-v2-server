var model = require("../../api/models/month");
var assert = require("assert");

describe("month model", function(){

  describe("find", function(){
    var days = [
      {date: "2014-03-30"},
      {date: "2014-04-16"},
      {date: "2014-04-17"}
    ];

    it("returns a list of days from that month", function(){
      var month = "2014-04";
      assert.deepEqual(model.find(month, days), [
        {date: "2014-04-16"},
        {date: "2014-04-17"}
      ]);
    });

    it("returns an empty list when there is no days for month", function(){
      var month = "2013-02";
      assert.deepEqual(model.find(month, days), []);
    });

    it("returns an error when month is invalid", function(){
      var month = "200";
      assert.throws(function () {
        model.find(month, days);
      }, /invalid month format, use: YYYY-MM/);
    });

  });

});
