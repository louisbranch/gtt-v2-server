var model = require("../../api/models/task");
var assert = require("assert");

describe("task model", function(){
  var day;

  beforeEach(function(){
    day = {tasks: []};
  });

  describe("create", function(){

    describe("when has valid data", function(){
      var task;

      beforeEach(function(){
        task = model.create(day, {
          message: "Finish test",
          end: "2014-01-19T21:05:59.234Z",
          branch: "master"
        });
      });

      it("returns a new task", function(){
        assert.deepEqual(task, {
          message: "Finish test",
          end: "2014-01-19T21:05:59.234Z",
          branch: "master"
        });
      });

      it("adds task to day tasks list", function(){
        assert.equal(day.tasks[0], task);
      });

    });

    describe("when message is missing", function(){
      it("throws an error", function(){
        assert.throws(function () {
          model.create(day, {
            end: "2014-01-19T21:05:59.234Z"
          });
        }, /message required/);
      });
    });

    describe("when end is missing", function(){
      it("throws an error", function(){
        assert.throws(function () {
          model.create(day, {
            message: "Finish test"
          });
        }, /end required/);
      });
    });

    describe("when end format is invalid", function(){
      it("throws an error", function(){
        assert.throws(function () {
          model.create(day, {
            message: "Finish test",
            end: "20140112"
          });
        }, /end time format invalid, use ISO 8601/);
      });
    });

    describe("when day is already over", function(){

      beforeEach(function(){
        day = {end: "2014-01-19T21:05:59.234Z"};
      });

      it("throws an error", function() {
        assert.throws(function () {
          model.create(day, {
            message: "Finish test",
            end: "2014-01-19T21:05:59.234Z"
          });
        }, /day is already over/);
      });
    });

    describe("when day is paused", function(){

      beforeEach(function(){
        day = {pauses: [{start: "2014-01-19T21:05:59.234Z"}]};
      });

      it("throws an error", function() {
        assert.throws(function () {
          model.create(day, {
            message: "Finish test",
            end: "2014-01-19T21:05:59.234Z"
          });
        }, /day has been paused/);
      });

    });

  });

});
