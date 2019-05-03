webpackHotUpdate(0,{

/***/ "./src/app/main.js":
/*!*************************!*\
  !*** ./src/app/main.js ***!
  \*************************/
/*! exports provided: main */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__ = __webpack_require__(/*! utils/Selector.js */ \"./src/app/utils/Selector.js\");\n\n\nclass Main {\n  constructor() {\n    Object(__WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__[\"a\" /* selector */])(document).ready(this.bind());\n  }\n\n  bind() {\n    console.log(\"Document Ready!!!!! - Loaded Content Scripts\");\n    InboxSDK.load('1', 'sdk_Gmail-Extension_290e96f7ea').then(function (sdk) {\n      console.log(\"Loaded InboxSDK\");\n      sdk.Compose.registerComposeViewHandler(function (composeView) {\n        var inboxStatusBar = composeView.addStatusBar();\n        inboxStatusBar.el.append(\"asdfasdfasdfasdfa\");\n      });\n    });\n  }\n\n}\n\nconst main = new Main();\n/* harmony export (immutable) */ __webpack_exports__[\"main\"] = main;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL21haW4uanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tYWluLmpzPzRmYzMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VsZWN0b3IgfSBmcm9tICd1dGlscy9TZWxlY3Rvci5qcydcblxuY2xhc3MgTWFpbiB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzZWxlY3Rvcihkb2N1bWVudCkucmVhZHkodGhpcy5iaW5kKCkpXG4gIH1cblxuICBiaW5kKCkge1xuICAgIGNvbnNvbGUubG9nKFwiRG9jdW1lbnQgUmVhZHkhISEhISAtIExvYWRlZCBDb250ZW50IFNjcmlwdHNcIilcbiAgICBJbmJveFNESy5sb2FkKCcxJywgJ3Nka19HbWFpbC1FeHRlbnNpb25fMjkwZTk2ZjdlYScpLnRoZW4oZnVuY3Rpb24oc2RrKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGVkIEluYm94U0RLXCIpXG4gICAgICBzZGsuQ29tcG9zZS5yZWdpc3RlckNvbXBvc2VWaWV3SGFuZGxlcihmdW5jdGlvbihjb21wb3NlVmlldyl7XG4gICAgICAgIHZhciBpbmJveFN0YXR1c0JhciA9IGNvbXBvc2VWaWV3LmFkZFN0YXR1c0JhcigpXG4gICAgICAgIGluYm94U3RhdHVzQmFyLmVsLmFwcGVuZChcImFzZGZhc2RmYXNkZmFzZGZhXCIpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuXG59XG5cbmV4cG9ydCBjb25zdCBtYWluID0gbmV3IE1haW4oKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9hcHAvbWFpbi5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZBO0FBQ0E7QUFrQkE7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/app/main.js\n");

/***/ })

})