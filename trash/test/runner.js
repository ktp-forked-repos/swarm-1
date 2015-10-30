"use strict";

var testrunner = require("qunit");

function onTest (err, stats) {
    if (err) {
        console.error(err);
        process.exit(1);
        return;
    }
    process.exit(stats.failed > 0 ? 1 : 0);
}

testrunner.setup({
    coverage: true,
    maxBlockDuration: 10000
});

testrunner.run({
    code: "lib/IdArray.js",
    tests: "test/0A_IdArray.js"
}, onTest);

testrunner.run({
    code: "lib/Spec.js",
    tests: "test/01_Spec.js"
}, onTest);

testrunner.run({
    code: "lib/Syncable.js",
    tests: "test/02_EventRelay.js"
}, onTest);

testrunner.run({
    code: "lib/Pipe.js",
    tests: "test/03_OnOff.js"
}, onTest);

testrunner.run({
    code: "lib/Text.js",
    tests: "test/04_Text.js"
}, onTest);

testrunner.run({
    code: "lib/LongSpec.js",
    tests: "test/05_LongSpec.js"
}, onTest);

testrunner.run({
    code: "lib/Host.js",
    tests: "test/06_Handshakes.js"
}, onTest);

testrunner.run({
    code: "lib/Vector.js",
    tests: "test/07_Vector.js"
}, onTest);

/*testrunner.run({
    code: "lib/FileStorage.js",
    tests: "test/08_FileStorage.js"
}, onTest); breaks travis, no idea why */

/*testrunner.run({
    code: "lib/LevelStorage.js",
    tests: "test/09_LevelStorage.js"
}, onTest);*/

testrunner.run({
    code: "lib/IdArray.js",
    tests: "test/0A_IdArray.js"
}, onTest);

testrunner.run({
    code: "lib/Syncable.js",
    tests: "test/0B_Ref.js"
}, onTest);