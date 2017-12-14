/*
Copyright 2017 OCAD University
Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.
You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/fluid-project/sjrk-story-telling-server/master/LICENSE.txt
*/

"use strict";

var fluid = require("infusion");
var uuidv1 = require("uuid/v1");
require("kettle");

var sjrk = fluid.registerNamespace("sjrk");

fluid.defaults("sjrk.storyTelling.server.getStoryHandler", {
    gradeNames: "kettle.request.http",
    invokers: {
        handleRequest: {
            funcName: "sjrk.storyTelling.server.handleStoryRequest",
            args: ["{request}", "{server}.storyDataSource", false]
        }
    }
});

fluid.defaults("sjrk.storyTelling.server.saveStoryHandler", {
    gradeNames: "kettle.request.http",
    invokers: {
        handleRequest: {
            funcName: "sjrk.storyTelling.server.handleStoryRequest",
            args: ["{request}", "{server}.storyDataSource", true]
        }
    }
});

sjrk.storyTelling.server.handleStoryRequest = function (request, dataSource, isSave) {
    var id = request.req.params.id ? request.req.params.id : (isSave ? uuidv1() : "");
    var promise = isSave ?
        dataSource.set({directStoryId: id}, request.req.body) :
        dataSource.get({directStoryId: id});

    promise.then(function (response) {
        var responseAsJSON = JSON.stringify(response);
        request.events.onSuccess.fire(responseAsJSON);
    }, function (error) {
        var errorAsJSON = JSON.stringify(error);
        request.events.onError.fire({
            message: errorAsJSON
        });
    });
};

fluid.defaults("sjrk.storyTelling.server.uiHandler", {
    gradeNames: ["sjrk.storyTelling.server.staticHandlerBase"],
    requestMiddleware: {
        "static": {
            middleware: "{server}.ui"
        }
    }
});

fluid.defaults("sjrk.storyTelling.server.saveImageHandler", {
    gradeNames: "kettle.request.http",
    requestMiddleware: {
        "multer": {
            middleware: "{server}.saveImage"
        }
    },
    invokers: {
        handleRequest: {
            funcName: "sjrk.storyTelling.server.handleSaveImageRequest",
            args: ["{request}"]
        }
    }
});

sjrk.storyTelling.server.handleSaveImageRequest = function (request) {
    console.log(request.req.file)
    request.events.onSuccess.fire({
    message: "POST request received for image"
    });
};
