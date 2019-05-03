webpackHotUpdate(0,{

/***/ "./src/app/main.js":
/*!*************************!*\
  !*** ./src/app/main.js ***!
  \*************************/
/*! exports provided: main */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__ = __webpack_require__(/*! utils/Selector.js */ \"./src/app/utils/Selector.js\");\n\n\nclass Main {\n  constructor() {\n    Object(__WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__[\"a\" /* selector */])(document).ready(this.bind());\n  }\n\n  bind() {\n    console.log(\"Document Ready!!!!! - Loaded Content Scripts\");\n    alert(\"CCC\");\n    InboxSDK.load('1', 'sdk_Gmail-Extension_290e96f7ea').then(function (sdk) {\n      console.log(\"Loaded InboxSDK\");\n      sdk.Compose.registerComposeViewHandler(function (composeView) {\n        var inboxStatusBar = composeView.addStatusBar();\n        console.log(inboxStatusBar);\n      });\n    });\n  }\n\n}\n\nconst main = new Main();\n/* harmony export (immutable) */ __webpack_exports__[\"main\"] = main;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL21haW4uanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tYWluLmpzPzRmYzMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VsZWN0b3IgfSBmcm9tICd1dGlscy9TZWxlY3Rvci5qcydcblxuY2xhc3MgTWFpbiB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzZWxlY3Rvcihkb2N1bWVudCkucmVhZHkodGhpcy5iaW5kKCkpXG4gIH1cblxuICBiaW5kKCkge1xuICAgIGNvbnNvbGUubG9nKFwiRG9jdW1lbnQgUmVhZHkhISEhISAtIExvYWRlZCBDb250ZW50IFNjcmlwdHNcIilcbiAgICBhbGVydChcIkNDQ1wiKVxuICAgIEluYm94U0RLLmxvYWQoJzEnLCAnc2RrX0dtYWlsLUV4dGVuc2lvbl8yOTBlOTZmN2VhJykudGhlbihmdW5jdGlvbihzZGspe1xuICAgICAgY29uc29sZS5sb2coXCJMb2FkZWQgSW5ib3hTREtcIilcbiAgICAgIHNkay5Db21wb3NlLnJlZ2lzdGVyQ29tcG9zZVZpZXdIYW5kbGVyKGZ1bmN0aW9uKGNvbXBvc2VWaWV3KXtcbiAgICAgICAgdmFyIGluYm94U3RhdHVzQmFyID0gY29tcG9zZVZpZXcuYWRkU3RhdHVzQmFyKClcbiAgICAgICAgY29uc29sZS5sb2coaW5ib3hTdGF0dXNCYXIpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuXG59XG5cbmV4cG9ydCBjb25zdCBtYWluID0gbmV3IE1haW4oKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9hcHAvbWFpbi5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEJBO0FBQ0E7QUFtQkE7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/app/main.js\n");

/***/ })

})