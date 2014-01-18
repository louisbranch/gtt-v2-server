var model = require("../../api/models/project");
var assert = require("assert");

describe("project model", function(){

  describe("create", function(){

    it("return a new project", function(){
      var project = create({
        name: "NodeJS",
        rate: 40,
        currrency: "brl"
      });
      assert.deepEqual(project, {
        name: "NodeJS",
        rate: 40,
        currrency: "brl"
      });
    });

    it("fallbacks to default values", function(){
      var project = create({name: "NodeJS"});
      assert.deepEqual(project, {
        name: "NodeJS",
        rate: 0,
        currrency: "usd"
      });
    });

    function create(params) {
      var gen = model.create(params)
      gen.next();
      return gen.next().value;
    }

  });

  describe("update", function(){

    it("overwrites original project values passed", function(){
      var original = {name: "NodeJS", rate: 10};
      var gen = model.update(original, {name: "New Name"});
      gen.next();
      var project = gen.next().value;
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
