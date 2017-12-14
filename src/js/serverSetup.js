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
var sjrk = fluid.registerNamespace("sjrk");
require("kettle");

fluid.defaults("sjrk.storyTelling.server.mountedNodeModules", {
    gradeNames: ["sjrk.storyTelling.server.nodeModuleMounter"],
    nodeModulesToMount: ["infusion",
        "gpii-binder",
        "sjrk-story-telling",
        "handlebars",
        "pagedown",
        "gpii-handlebars"],
});

fluid.defaults("sjrk.storyTelling.server", {
    gradeNames: ["fluid.component", "sjrk.storyTelling.server.mountedNodeModules"],
    components: {
        server: {
            type: "kettle.server",
            options: {
                port: 8081,
                components: {
                    storyDataSource: {
                        type: "sjrk.storyTelling.server.dataSource.story"
                    },
                    app: {
                        type: "sjrk.storyTelling.server.app.storyTellingHandlers"
                    },
                    ui: {
                        type: "kettle.middleware.static",
                        options: {
                            "root": "./ui"
                        }
                    },
                    multer: {
                        type: "kettle.middleware.multer"
                    }
                }
            }
        }
    }
});

fluid.defaults("sjrk.storyTelling.server.app.storyTellingHandlers", {
    gradeNames: ["kettle.app"],
    requestHandlers: {
        getStoryHandler: {
            type: "sjrk.storyTelling.server.getStoryHandler",
            "route": "/story/:id",
            "method": "get"
        },
        saveStoryHandler: {
            type: "sjrk.storyTelling.server.saveStoryHandler",
            "route": "/story/:id",
            "method": "post"
        },
        saveNewStoryHandler: {
            type: "sjrk.storyTelling.server.saveStoryHandler",
            "route": "/story/",
            "method": "post"
        },
        uiHandler: {
            type: "sjrk.storyTelling.server.uiHandler",
            "route": "/*",
            "method": "get"
        },
        saveImageHandler: {
            type: "sjrk.storyTelling.server.saveImageHandler",
            "route": "/image/:id",
            "method": "post"
        }
    }
});
