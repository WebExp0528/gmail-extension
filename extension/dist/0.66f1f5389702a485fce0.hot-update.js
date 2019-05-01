webpackHotUpdate(0,{

/***/ "./src/app/utils/Runtime.js":
/*!**********************************!*\
  !*** ./src/app/utils/Runtime.js ***!
  \**********************************/
/*! exports provided: Runtime, runtime */
/*! exports used: runtime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/**\n* Define browser runtime API settings.\n* @type Class\n*/\nclass Runtime {\n  /**\n   * Find the right request API to instance as object.\n   *\n   * @param {String} api\n   * @returns {Runtime.api.extension}\n   */\n  api(method) {\n    try {\n      if (chrome[method]) {\n        return chrome[method];\n      }\n    } catch (e) {}\n\n    // Try to request as Window.\n    try {\n      if (window[method]) {\n        return window[method];\n      }\n    } catch (e) {}\n\n    // Try to request as Browser.\n    try {\n      if (browser[method]) {\n        return browser[method];\n      }\n    } catch (e) {}\n\n    // Try to request as extension in browser.\n    try {\n      return browser.extension[method];\n    } catch (e) {}\n  }\n}\n/* unused harmony export Runtime */\n\n\nconst runtime = new Runtime();\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = runtime;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL3V0aWxzL1J1bnRpbWUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC91dGlscy9SdW50aW1lLmpzP2Q1OTAiXSwic291cmNlc0NvbnRlbnQiOlsiIC8qKlxuICogRGVmaW5lIGJyb3dzZXIgcnVudGltZSBBUEkgc2V0dGluZ3MuXG4gKiBAdHlwZSBDbGFzc1xuICovXG5leHBvcnQgY2xhc3MgUnVudGltZSB7XG4gIC8qKlxuICAgKiBGaW5kIHRoZSByaWdodCByZXF1ZXN0IEFQSSB0byBpbnN0YW5jZSBhcyBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhcGlcbiAgICogQHJldHVybnMge1J1bnRpbWUuYXBpLmV4dGVuc2lvbn1cbiAgICovXG4gIGFwaSAobWV0aG9kKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChjaHJvbWVbbWV0aG9kXSkge1xuICAgICAgICByZXR1cm4gY2hyb21lW21ldGhvZF1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgLy8gVHJ5IHRvIHJlcXVlc3QgYXMgV2luZG93LlxuICAgIHRyeSB7XG4gICAgICBpZiAod2luZG93W21ldGhvZF0pIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvd1ttZXRob2RdXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIC8vIFRyeSB0byByZXF1ZXN0IGFzIEJyb3dzZXIuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChicm93c2VyW21ldGhvZF0pIHtcbiAgICAgICAgcmV0dXJuIGJyb3dzZXJbbWV0aG9kXVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAvLyBUcnkgdG8gcmVxdWVzdCBhcyBleHRlbnNpb24gaW4gYnJvd3Nlci5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGJyb3dzZXIuZXh0ZW5zaW9uW21ldGhvZF1cbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBydW50aW1lID0gbmV3IFJ1bnRpbWUoKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9hcHAvdXRpbHMvUnVudGltZS5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUFJQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaENBO0FBQUE7QUFBQTtBQUNBO0FBa0NBOzsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app/utils/Runtime.js\n");

/***/ })

})