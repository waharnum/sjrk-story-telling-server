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
var kettle = require("kettle");
var multer = require("multer");

fluid.defaults("kettle.middleware.multer", {
    gradeNames: "kettle.plainAsyncMiddleware",
    middlewareOptions: {},
    middleware: "@expand:kettle.middleware.multer.createMiddleware({that}.options.middlewareOptions)"
});

kettle.middleware.multer.createMiddleware = function (middlewareOptions) {
    var diskStorage = multer.diskStorage({
        destination: "./images",
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    middlewareOptions.storage = diskStorage;
    var upload = multer(middlewareOptions);
    return upload.single('file');
};
