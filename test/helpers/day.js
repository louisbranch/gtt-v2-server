var helper = require("../../api/helpers/day");
var assert = require("assert");

describe("day helper", function(){

  describe("isPaused", function(){

    it("is false when there is no pauses", function(){
      var day = {pauses: []};
      assert.equal(false, helper.isPaused(day));
    });

    it("is false when last pause has ended", function(){
      var day = {pauses: [{end: new Date()}]};
      assert.equal(false, helper.isPaused(day));
    });

    it("is true when last pause hasn't ended", function(){
      var day = {pauses: [{start: new Date()}]};
      assert.equal(true, helper.isPaused(day));
    });

  });

  describe("isOver", function(){

    it("is true when day has an end date", function(){
      var day = {end: new Date()};
      assert.equal(true, helper.isOver(day));
    });

    it("is false otherwise", function(){
      var day = {};
      assert.equal(false, helper.isOver(day));
    });

  });

});
