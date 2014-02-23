var model = require("../../api/models/project");
var assert = require("assert");

describe("project model", function(){
  var user;

  beforeEach(function(){
    user = {projects: []};
  });

  describe("create", function(){

    it("return a new project", function(){
      var project = model.create({
        name: "NodeJS",
        rate: 40,
        currency: "brl"
      }, user);
      assert.deepEqual(project, {
        name: "NodeJS",
        rate: 40,
        currency: "brl",
        days: []
      });
    });

    it("fallbacks to default values", function(){
      var project = model.create({name: "NodeJS"}, user);
      assert.deepEqual(project, {
        name: "NodeJS",
        rate: 0,
        currency: "usd",
        days: []
      });
    });

  });

  describe("update", function(){

    it("overwrites original project values passed", function(){
      var original = {name: "NodeJS", rate: 10};
      var project = model.update(original, {name: "New Name"});
      assert.deepEqual(project, {
        name: "New Name",
        rate: 10
      });
    });

  });

  describe("find", function(){
    it("returns a project by its name", function(){
      var projects = [
        {name: "NodeJS"},
        {name: "Koa"}
      ];
      var result = model.find("koa", projects);
      assert.deepEqual(result, {name: "Koa"});
    });
  });

});
