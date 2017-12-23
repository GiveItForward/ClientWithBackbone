({
    name: "main",
    baseUrl: "../src/js",
    mainConfigFile: "../src/js/main.js",
    out: "../src/js/main-optimized.min.js",
    generateSourceMaps: true,
    preserveLicenseComments: false,
    optimize: "uglify2"
})

//from pluralSight requirejs 4, optimization build profiles
//node build\r.js -o build\build.config.js