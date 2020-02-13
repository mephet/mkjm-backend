/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DB/databaseConnectionHandler.js":
/*!*********************************************!*\
  !*** ./src/DB/databaseConnectionHandler.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/polyfill */ \"@babel/polyfill\");\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nvar pool = new pg__WEBPACK_IMPORTED_MODULE_0__[\"Pool\"]({\n  host: process.env.DB_HOST,\n  port: process.env.DB_PORT,\n  database: process.env.DB_DEFAULT_DATABASE,\n  user: process.env.DB_USERNAME,\n  password: process.env.DB_PASSWORD\n});\nvar databaseConnectionHandler = {\n  testConnection: function testConnection() {}\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (databaseConnectionHandler);\n\n//# sourceURL=webpack:///./src/DB/databaseConnectionHandler.js?");

/***/ }),

/***/ "./src/Routes/routes.js":
/*!******************************!*\
  !*** ./src/Routes/routes.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _handlers_OptimizerRequestHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../handlers/OptimizerRequestHandler */ \"./src/handlers/OptimizerRequestHandler.js\");\n\n\nvar routes = function routes(app) {\n  app.post('/api/optimization', function (req, res) {\n    console.log(\"post received\");\n    _handlers_OptimizerRequestHandler__WEBPACK_IMPORTED_MODULE_0__[\"default\"].handleOptimizationRequest(req.body); // let pyScript = path.join(__dirname, 'scripts/my_script.py');\n    // let shell = new PythonShell(pyScript);\n    // let shellInput = JSON.stringify(input)\n    // shell.send(shellInput);\n    // shell.on('message', function (message) {\n    //     console.log(\"output is :\" + message);\n    // });\n    // shell.end(function (err, code, signal) {\n    //     if (err) throw err;\n    // });\n\n    res.sendStatus(200);\n  });\n  app.get('/test', function (req, res) {\n    res.send(\"Invalid Endpoint test\");\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (routes);\n\n//# sourceURL=webpack:///./src/Routes/routes.js?");

/***/ }),

/***/ "./src/Utils/logger.js":
/*!*****************************!*\
  !*** ./src/Utils/logger.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nvar _require = __webpack_require__(/*! winston */ \"winston\"),\n    createLogger = _require.createLogger,\n    format = _require.format,\n    transports = _require.transports;\n\nvar combine = format.combine,\n    timestamp = format.timestamp,\n    label = format.label,\n    printf = format.printf;\nvar customFormat = printf(function (_ref) {\n  var level = _ref.level,\n      message = _ref.message,\n      label = _ref.label,\n      timestamp = _ref.timestamp;\n  return \"\".concat(timestamp, \" [\").concat(level, \"]: \").concat(message);\n});\nvar logger = createLogger({\n  format: combine(label({\n    label: 'now!'\n  }), timestamp(), customFormat),\n  transports: [new transports.Console({\n    level: 'debug',\n    prettyPrint: true,\n    colorize: true,\n    silent: false,\n    timestamp: true\n  }), new transports.File({\n    prettyPrint: false,\n    silent: false,\n    colorize: true,\n    timestamp: true,\n    filename: 'debug.log',\n    maxsize: 40000,\n    maxFiles: 10,\n    json: false\n  })]\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (logger);\n\n//# sourceURL=webpack:///./src/Utils/logger.js?");

/***/ }),

/***/ "./src/handlers/OptimizerRequestHandler.js":
/*!*************************************************!*\
  !*** ./src/handlers/OptimizerRequestHandler.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var python_shell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! python-shell */ \"python-shell\");\n/* harmony import */ var python_shell__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(python_shell__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar OptimizerRequestHandler =\n/*#__PURE__*/\nfunction () {\n  function OptimizerRequestHandler() {\n    _classCallCheck(this, OptimizerRequestHandler);\n  }\n\n  _createClass(OptimizerRequestHandler, null, [{\n    key: \"handleOptimizationRequest\",\n    value: function handleOptimizationRequest(data) {\n      // console.log(data);\n      var pyScript = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, 'scripts/p_entry.py');\n      var shell = new python_shell__WEBPACK_IMPORTED_MODULE_0__[\"PythonShell\"](pyScript);\n      var shellInput = JSON.stringify(data);\n      shell.send(shellInput);\n      shell.on('message', function (message) {\n        console.log(\"output is :\" + message);\n      });\n      shell.end(function (err, code, signal) {\n        if (err) throw err;\n      });\n    }\n  }]);\n\n  return OptimizerRequestHandler;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (OptimizerRequestHandler);\n\n//# sourceURL=webpack:///./src/handlers/OptimizerRequestHandler.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/polyfill */ \"@babel/polyfill\");\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Utils_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/logger */ \"./src/Utils/logger.js\");\n/* harmony import */ var _Routes_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Routes/routes */ \"./src/Routes/routes.js\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _DB_databaseConnectionHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DB/databaseConnectionHandler */ \"./src/DB/databaseConnectionHandler.js\");\n\n\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\n\n\n\n\n\nvar staticPath = path__WEBPACK_IMPORTED_MODULE_5___default.a.join(__dirname, '/build');\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(cors__WEBPACK_IMPORTED_MODULE_2___default()());\nvar port = process.env.PORT || 5000;\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(bodyParser.json());\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a[\"static\"](staticPath));\nObject(_Routes_routes__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(app);\n_DB_databaseConnectionHandler__WEBPACK_IMPORTED_MODULE_6__[\"default\"].testConnection();\napp.listen(port, function () {\n  console.log(\"Serving static files from \".concat(staticPath));\n  _Utils_logger__WEBPACK_IMPORTED_MODULE_3__[\"default\"].info(\"Listening on port \".concat(port));\n});\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/polyfill\");\n\n//# sourceURL=webpack:///external_%22@babel/polyfill%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pg\");\n\n//# sourceURL=webpack:///external_%22pg%22?");

/***/ }),

/***/ "python-shell":
/*!*******************************!*\
  !*** external "python-shell" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"python-shell\");\n\n//# sourceURL=webpack:///external_%22python-shell%22?");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston\");\n\n//# sourceURL=webpack:///external_%22winston%22?");

/***/ })

/******/ });