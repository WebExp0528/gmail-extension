/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "d6d87e110e2836590bac"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 1;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/app/options.js")(__webpack_require__.s = "./src/app/options.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/options.js":
/*!****************************!*\
  !*** ./src/app/options.js ***!
  \****************************/
/*! exports provided: options */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__ = __webpack_require__(/*! utils/Selector.js */ \"./src/app/utils/Selector.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils_Storage_js__ = __webpack_require__(/*! utils/Storage.js */ \"./src/app/utils/Storage.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_styles_options_scss__ = __webpack_require__(/*! styles/options.scss */ \"./src/styles/options.scss\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_styles_options_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_styles_options_scss__);\n\n\n\n\n\nclass Options {\n  constructor() {\n    /**\n     * Predefined values.\n     *\n     * @type Object\n     */\n    this.defaults = {\n      messageSuccess: 'Options saved successfully!',\n      messageError: 'Please fill all items in the form.',\n      messageTime: 2000\n    };\n\n    Object(__WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__[\"a\" /* selector */])(document).ready(this.bind());\n  }\n\n  bind() {\n    /**\n    * Detect click action under save button.\n    */\n    Object(__WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__[\"a\" /* selector */])('.save-options').click(() => {\n      // Get filled\n      const options = this.getOptions();\n\n      // Check if exists some field filled.\n      if (!options.standard) {\n        // Set error message.\n        this.response(this.defaults.messageError, 'error');\n        return;\n      }\n\n      // Store values to the Chrome storage.\n      __WEBPACK_IMPORTED_MODULE_1_utils_Storage_js__[\"a\" /* storage */].save(options).then(() => {\n        this.response(this.defaults.messageSuccess, 'success');\n      });\n    });\n\n    // Set default options or saved options already.\n    this.setOptions();\n  }\n\n  /**\n   * Get values from the form\n   *\n   * @param {Callback} callback\n   */\n  getOptions() {\n    return {\n      standard: Object(__WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__[\"a\" /* selector */])('#default-input').val(),\n      checkbox: Object(__WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__[\"a\" /* selector */])('#default-checkbox').checked()\n    };\n  }\n\n  /**\n   * Retrieve values from Chrome storage and set as default value.\n   */\n  setOptions() {\n    __WEBPACK_IMPORTED_MODULE_1_utils_Storage_js__[\"a\" /* storage */].get({\n      standard: '',\n      checkbox: false\n    }).then(data => {\n      // Set degault values or saved options.\n      Object(__WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__[\"a\" /* selector */])('#default-input').val(data.standard);\n      Object(__WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__[\"a\" /* selector */])('#default-checkbox').checked(data.checkbox);\n    });\n  }\n\n  /**\n   * Set message to the options container.\n   *\n   * @param {String} message\n   * @param {String} classname\n   */\n  response(message, classname) {\n    // Set text message.\n    Object(__WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__[\"a\" /* selector */])('.response').text(message);\n    // Add provided class.\n    Object(__WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__[\"a\" /* selector */])('.response').addClass(classname);\n\n    // Remove class after defined time.\n    setTimeout(() => {\n      Object(__WEBPACK_IMPORTED_MODULE_0_utils_Selector_js__[\"a\" /* selector */])('.response').removeClass(classname);\n    }, this.defaults.messageTime);\n  }\n}\n\nconst options = new Options();\n/* harmony export (immutable) */ __webpack_exports__[\"options\"] = options;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL29wdGlvbnMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9vcHRpb25zLmpzPzBlNWIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VsZWN0b3IgfSBmcm9tICd1dGlscy9TZWxlY3Rvci5qcydcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICd1dGlscy9TdG9yYWdlLmpzJ1xuXG5pbXBvcnQgJ3N0eWxlcy9vcHRpb25zLnNjc3MnXG5cbmNsYXNzIE9wdGlvbnMge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgLyoqXG4gICAgICogUHJlZGVmaW5lZCB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgKi9cbiAgICB0aGlzLmRlZmF1bHRzID0ge1xuICAgICAgbWVzc2FnZVN1Y2Nlc3M6ICdPcHRpb25zIHNhdmVkIHN1Y2Nlc3NmdWxseSEnLFxuICAgICAgbWVzc2FnZUVycm9yOiAnUGxlYXNlIGZpbGwgYWxsIGl0ZW1zIGluIHRoZSBmb3JtLicsXG4gICAgICBtZXNzYWdlVGltZTogMjAwMFxuICAgIH1cblxuICAgIHNlbGVjdG9yKGRvY3VtZW50KS5yZWFkeSh0aGlzLmJpbmQoKSlcbiAgfVxuXG4gIGJpbmQgKCkge1xuICAgIC8qKlxuICAgICogRGV0ZWN0IGNsaWNrIGFjdGlvbiB1bmRlciBzYXZlIGJ1dHRvbi5cbiAgICAqL1xuICAgIHNlbGVjdG9yKCcuc2F2ZS1vcHRpb25zJykuY2xpY2soKCkgPT4ge1xuICAgICAgLy8gR2V0IGZpbGxlZFxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpXG5cbiAgICAgIC8vIENoZWNrIGlmIGV4aXN0cyBzb21lIGZpZWxkIGZpbGxlZC5cbiAgICAgIGlmICghb3B0aW9ucy5zdGFuZGFyZCkge1xuICAgICAgICAvLyBTZXQgZXJyb3IgbWVzc2FnZS5cbiAgICAgICAgdGhpcy5yZXNwb25zZSh0aGlzLmRlZmF1bHRzLm1lc3NhZ2VFcnJvciwgJ2Vycm9yJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFN0b3JlIHZhbHVlcyB0byB0aGUgQ2hyb21lIHN0b3JhZ2UuXG4gICAgICBzdG9yYWdlLnNhdmUob3B0aW9ucylcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVzcG9uc2UodGhpcy5kZWZhdWx0cy5tZXNzYWdlU3VjY2VzcywgJ3N1Y2Nlc3MnKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICAvLyBTZXQgZGVmYXVsdCBvcHRpb25zIG9yIHNhdmVkIG9wdGlvbnMgYWxyZWFkeS5cbiAgICB0aGlzLnNldE9wdGlvbnMoKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2YWx1ZXMgZnJvbSB0aGUgZm9ybVxuICAgKlxuICAgKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICAgKi9cbiAgZ2V0T3B0aW9ucyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YW5kYXJkOiBzZWxlY3RvcignI2RlZmF1bHQtaW5wdXQnKS52YWwoKSxcbiAgICAgIGNoZWNrYm94OiBzZWxlY3RvcignI2RlZmF1bHQtY2hlY2tib3gnKS5jaGVja2VkKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgdmFsdWVzIGZyb20gQ2hyb21lIHN0b3JhZ2UgYW5kIHNldCBhcyBkZWZhdWx0IHZhbHVlLlxuICAgKi9cbiAgc2V0T3B0aW9ucyAoKSB7XG4gICAgc3RvcmFnZS5nZXQoe1xuICAgICAgc3RhbmRhcmQ6ICcnLFxuICAgICAgY2hlY2tib3g6IGZhbHNlXG4gICAgfSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgLy8gU2V0IGRlZ2F1bHQgdmFsdWVzIG9yIHNhdmVkIG9wdGlvbnMuXG4gICAgICBzZWxlY3RvcignI2RlZmF1bHQtaW5wdXQnKS52YWwoZGF0YS5zdGFuZGFyZClcbiAgICAgIHNlbGVjdG9yKCcjZGVmYXVsdC1jaGVja2JveCcpLmNoZWNrZWQoZGF0YS5jaGVja2JveClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBtZXNzYWdlIHRvIHRoZSBvcHRpb25zIGNvbnRhaW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzbmFtZVxuICAgKi9cbiAgcmVzcG9uc2UgKG1lc3NhZ2UsIGNsYXNzbmFtZSkge1xuICAgIC8vIFNldCB0ZXh0IG1lc3NhZ2UuXG4gICAgc2VsZWN0b3IoJy5yZXNwb25zZScpLnRleHQobWVzc2FnZSlcbiAgICAvLyBBZGQgcHJvdmlkZWQgY2xhc3MuXG4gICAgc2VsZWN0b3IoJy5yZXNwb25zZScpLmFkZENsYXNzKGNsYXNzbmFtZSlcblxuICAgIC8vIFJlbW92ZSBjbGFzcyBhZnRlciBkZWZpbmVkIHRpbWUuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxlY3RvcignLnJlc3BvbnNlJykucmVtb3ZlQ2xhc3MoY2xhc3NuYW1lKVxuICAgIH0sIHRoaXMuZGVmYXVsdHMubWVzc2FnZVRpbWUpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG9wdGlvbnMgPSBuZXcgT3B0aW9ucygpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2FwcC9vcHRpb25zLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFwRkE7QUFDQTtBQXNGQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/app/options.js\n");

/***/ }),

/***/ "./src/app/utils/Selector.js":
/*!***********************************!*\
  !*** ./src/app/utils/Selector.js ***!
  \***********************************/
/*! exports provided: Selector, selector */
/*! exports used: selector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/**\n* Define Selector functions.\n* @type Class\n*/\nclass Selector {\n  /**\n   * Get current provided selector.\n   *\n   * @param {string|object} selector\n   * @param {string} type [null|querySelector|querySelectorAll]\n   */\n  constructor(selector, type) {\n    // Check selector is Document or Window\n    if (typeof selector === 'object') {\n      this.element = selector;\n      return;\n    }\n\n    // Define default type as 'querySelector.\n    let selectorType = type || 'querySelector';\n\n    // Check if is an ID.\n    if (selector.indexOf('#') === 0) {\n      selectorType = 'getElementById';\n      selector = selector.substr(1, selector.length);\n    }\n\n    this.element = document[selectorType](selector);\n  }\n\n  /**\n   * Validate if element found in page\n   *\n   * @returns {Boolean}\n   */\n  validElement() {\n    if (this.element === null) return false;\n\n    return true;\n  }\n\n  /**\n   * Get an element click.\n   *\n   * @param {Function} callback\n   * @returns {void}\n   */\n  click(callback) {\n    this.element.addEventListener('click', callback);\n  }\n\n  /**\n   * Add new class element to a selector.\n   *\n   * @param {string} style\n   * @returns {void}\n   */\n  addClass(style) {\n    this.element.classList.add(style);\n  }\n\n  /**\n   * Remove class element from a selector.\n   *\n   * @param {string} style\n   * @returns {void}\n   */\n  removeClass(style) {\n    this.element.classList.remove(style);\n  }\n\n  /**\n   * Toggle action under a selector.\n   *\n   * @param {string} style\n   * @returns {void}\n   */\n  toggle(style) {\n    this.element.classList.toggle(style);\n  }\n\n  /**\n   * Set or Get value\n   *\n   * @param {string} value\n   * @returns {string}\n   */\n  val(value) {\n    if (typeof value !== 'undefined') {\n      this.element.value = value;\n\n      return value;\n    }\n\n    return this.element.value;\n  }\n\n  /**\n   * Set or Get checked\n   *\n   * @param {string} value\n   * @returns {string}\n   */\n  checked(value) {\n    if (typeof value !== 'undefined') {\n      this.element.checked = value;\n\n      return value;\n    }\n\n    return this.element.checked;\n  }\n\n  /**\n   * DOM Content Loaded\n   *\n   * @param {Function} callback\n   * @returns {void}\n   */\n  ready(callback) {\n    this.element.addEventListener('DOMContentLoaded', callback);\n  }\n\n  /**\n   * Set or Get textContent\n   *\n   * @param {string} value\n   * @returns {string}\n   */\n  text(value) {\n    if (typeof value !== 'undefined') {\n      this.element.textContent = value;\n\n      return value;\n    }\n\n    return this.element.textContent;\n  }\n}\n/* unused harmony export Selector */\n\n\nconst selector = selector => {\n  return new Selector(selector);\n};\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = selector;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL3V0aWxzL1NlbGVjdG9yLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hcHAvdXRpbHMvU2VsZWN0b3IuanM/MDkxNCJdLCJzb3VyY2VzQ29udGVudCI6WyIgLyoqXG4gKiBEZWZpbmUgU2VsZWN0b3IgZnVuY3Rpb25zLlxuICogQHR5cGUgQ2xhc3NcbiAqL1xuZXhwb3J0IGNsYXNzIFNlbGVjdG9yIHtcbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IHByb3ZpZGVkIHNlbGVjdG9yLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHNlbGVjdG9yXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFtudWxsfHF1ZXJ5U2VsZWN0b3J8cXVlcnlTZWxlY3RvckFsbF1cbiAgICovXG4gIGNvbnN0cnVjdG9yIChzZWxlY3RvciwgdHlwZSkge1xuICAgIC8vIENoZWNrIHNlbGVjdG9yIGlzIERvY3VtZW50IG9yIFdpbmRvd1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLmVsZW1lbnQgPSBzZWxlY3RvclxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIGRlZmF1bHQgdHlwZSBhcyAncXVlcnlTZWxlY3Rvci5cbiAgICBsZXQgc2VsZWN0b3JUeXBlID0gdHlwZSB8fCAncXVlcnlTZWxlY3RvcidcblxuICAgIC8vIENoZWNrIGlmIGlzIGFuIElELlxuICAgIGlmIChzZWxlY3Rvci5pbmRleE9mKCcjJykgPT09IDApIHtcbiAgICAgIHNlbGVjdG9yVHlwZSA9ICdnZXRFbGVtZW50QnlJZCdcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3Iuc3Vic3RyKDEsIHNlbGVjdG9yLmxlbmd0aClcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudFtzZWxlY3RvclR5cGVdKHNlbGVjdG9yKVxuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGlmIGVsZW1lbnQgZm91bmQgaW4gcGFnZVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIHZhbGlkRWxlbWVudCAoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlXG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBlbGVtZW50IGNsaWNrLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGNsaWNrIChjYWxsYmFjaykge1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNhbGxiYWNrKVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBuZXcgY2xhc3MgZWxlbWVudCB0byBhIHNlbGVjdG9yLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3R5bGVcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBhZGRDbGFzcyAoc3R5bGUpIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzdHlsZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2xhc3MgZWxlbWVudCBmcm9tIGEgc2VsZWN0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHlsZVxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIHJlbW92ZUNsYXNzIChzdHlsZSkge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHN0eWxlKVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBhY3Rpb24gdW5kZXIgYSBzZWxlY3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0eWxlXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgdG9nZ2xlIChzdHlsZSkge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHN0eWxlKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBvciBHZXQgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICB2YWwgKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IHZhbHVlXG5cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQudmFsdWVcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgb3IgR2V0IGNoZWNrZWRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBjaGVja2VkICh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2hlY2tlZCA9IHZhbHVlXG5cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2hlY2tlZFxuICB9XG5cbiAgLyoqXG4gICAqIERPTSBDb250ZW50IExvYWRlZFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIHJlYWR5IChjYWxsYmFjaykge1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgY2FsbGJhY2spXG4gIH1cblxuICAvKipcbiAgICogU2V0IG9yIEdldCB0ZXh0Q29udGVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHRleHQgKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG5cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQudGV4dENvbnRlbnRcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID0+IHtcbiAgcmV0dXJuIG5ldyBTZWxlY3RvcihzZWxlY3Rvcilcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvYXBwL3V0aWxzL1NlbGVjdG9yLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUlBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXJJQTtBQUFBO0FBQUE7QUFDQTtBQXVJQTtBQUNBO0FBQ0E7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/app/utils/Selector.js\n");

/***/ }),

/***/ "./src/app/utils/Storage.js":
/*!**********************************!*\
  !*** ./src/app/utils/Storage.js ***!
  \**********************************/
/*! exports provided: Storage, storage */
/*! exports used: storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* global chrome, browser */\n\n/**\n * Define Chrome storage settings.\n * @type Function\n */\nclass Storage {\n  /**\n   * Make sure we are initializing the storage.\n   *\n   * @returns {chrome.storage.local|window.storage.local|Window.storage.local|browser.storage.local|chrome.storage.sync}\n   */\n  synchronize() {\n    let section = {};\n\n    // Try to request as Chrome.\n    try {\n      if (chrome.storage) {\n        // Check if exist sync session.\n        if (chrome.storage.sync) {\n          section = chrome.storage.sync;\n        } else {\n          // Else, get local value.\n          section = chrome.storage.local;\n        }\n      }\n    } catch (e) {}\n\n    // Try to request as Window.\n    try {\n      if (window.storage) {\n        section = window.storage.local;\n      }\n    } catch (e) {}\n\n    // Try to request as Browser.\n    try {\n      if (browser.storage) {\n        section = browser.storage.local;\n      }\n    } catch (e) {}\n\n    // Return element of session.\n    return section;\n  }\n\n  /**\n   * Save values under Chrome Storage.\n   * An object which gives each key/value pair to update storage with.\n   * Any other key/value pairs in storage will not be affected.\n   *\n   * @param {Object} keys\n   * @return {Primise}\n   */\n  save(keys) {\n    return new Promise(resolve => {\n      this.synchronize().set(keys, () => {\n        resolve(true);\n      });\n    });\n  }\n\n  /**\n   * Gets one or more items from storage.\n   * A single key to get, list of keys to get, or a dictionary specifying\n   * default values (see description of the object).\n   * An empty list or object will return an empty result object.\n   * Pass in null to get the entire contents of storage.\n   *\n   * @param {Object} keys\n   * @return {Primise}\n   */\n  get(keys) {\n    return new Promise(resolve => {\n      this.synchronize().get(keys, items => {\n        resolve(items);\n      });\n    });\n  }\n\n  /**\n   * Removes one or more items from storage.\n   *\n   * @param {Object} keys\n   * @return {Primise}\n   */\n  remove(keys) {\n    return new Promise(resolve => {\n      this.synchronize().remove(keys, items => {\n        resolve(items);\n      });\n    });\n  }\n}\n/* unused harmony export Storage */\n\n\nconst storage = new Storage();\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = storage;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL3V0aWxzL1N0b3JhZ2UuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC91dGlscy9TdG9yYWdlLmpzPzMzM2EiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIGNocm9tZSwgYnJvd3NlciAqL1xuXG4vKipcbiAqIERlZmluZSBDaHJvbWUgc3RvcmFnZSBzZXR0aW5ncy5cbiAqIEB0eXBlIEZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBTdG9yYWdlIHtcbiAgLyoqXG4gICAqIE1ha2Ugc3VyZSB3ZSBhcmUgaW5pdGlhbGl6aW5nIHRoZSBzdG9yYWdlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Y2hyb21lLnN0b3JhZ2UubG9jYWx8d2luZG93LnN0b3JhZ2UubG9jYWx8V2luZG93LnN0b3JhZ2UubG9jYWx8YnJvd3Nlci5zdG9yYWdlLmxvY2FsfGNocm9tZS5zdG9yYWdlLnN5bmN9XG4gICAqL1xuICBzeW5jaHJvbml6ZSAoKSB7XG4gICAgbGV0IHNlY3Rpb24gPSB7fVxuXG4gICAgLy8gVHJ5IHRvIHJlcXVlc3QgYXMgQ2hyb21lLlxuICAgIHRyeSB7XG4gICAgICBpZiAoY2hyb21lLnN0b3JhZ2UpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgZXhpc3Qgc3luYyBzZXNzaW9uLlxuICAgICAgICBpZiAoY2hyb21lLnN0b3JhZ2Uuc3luYykge1xuICAgICAgICAgIHNlY3Rpb24gPSBjaHJvbWUuc3RvcmFnZS5zeW5jXG4gICAgICAgIH0gZWxzZSB7IC8vIEVsc2UsIGdldCBsb2NhbCB2YWx1ZS5cbiAgICAgICAgICBzZWN0aW9uID0gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAvLyBUcnkgdG8gcmVxdWVzdCBhcyBXaW5kb3cuXG4gICAgdHJ5IHtcbiAgICAgIGlmICh3aW5kb3cuc3RvcmFnZSkge1xuICAgICAgICBzZWN0aW9uID0gd2luZG93LnN0b3JhZ2UubG9jYWxcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgLy8gVHJ5IHRvIHJlcXVlc3QgYXMgQnJvd3Nlci5cbiAgICB0cnkge1xuICAgICAgaWYgKGJyb3dzZXIuc3RvcmFnZSkge1xuICAgICAgICBzZWN0aW9uID0gYnJvd3Nlci5zdG9yYWdlLmxvY2FsXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIC8vIFJldHVybiBlbGVtZW50IG9mIHNlc3Npb24uXG4gICAgcmV0dXJuIHNlY3Rpb25cbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIHZhbHVlcyB1bmRlciBDaHJvbWUgU3RvcmFnZS5cbiAgICogQW4gb2JqZWN0IHdoaWNoIGdpdmVzIGVhY2gga2V5L3ZhbHVlIHBhaXIgdG8gdXBkYXRlIHN0b3JhZ2Ugd2l0aC5cbiAgICogQW55IG90aGVyIGtleS92YWx1ZSBwYWlycyBpbiBzdG9yYWdlIHdpbGwgbm90IGJlIGFmZmVjdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0ga2V5c1xuICAgKiBAcmV0dXJuIHtQcmltaXNlfVxuICAgKi9cbiAgc2F2ZSAoa2V5cykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuc3luY2hyb25pemUoKS5zZXQoa2V5cywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBvbmUgb3IgbW9yZSBpdGVtcyBmcm9tIHN0b3JhZ2UuXG4gICAqIEEgc2luZ2xlIGtleSB0byBnZXQsIGxpc3Qgb2Yga2V5cyB0byBnZXQsIG9yIGEgZGljdGlvbmFyeSBzcGVjaWZ5aW5nXG4gICAqIGRlZmF1bHQgdmFsdWVzIChzZWUgZGVzY3JpcHRpb24gb2YgdGhlIG9iamVjdCkuXG4gICAqIEFuIGVtcHR5IGxpc3Qgb3Igb2JqZWN0IHdpbGwgcmV0dXJuIGFuIGVtcHR5IHJlc3VsdCBvYmplY3QuXG4gICAqIFBhc3MgaW4gbnVsbCB0byBnZXQgdGhlIGVudGlyZSBjb250ZW50cyBvZiBzdG9yYWdlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0ga2V5c1xuICAgKiBAcmV0dXJuIHtQcmltaXNlfVxuICAgKi9cbiAgZ2V0IChrZXlzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5zeW5jaHJvbml6ZSgpLmdldChrZXlzLCBpdGVtcyA9PiB7XG4gICAgICAgIHJlc29sdmUoaXRlbXMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBvbmUgb3IgbW9yZSBpdGVtcyBmcm9tIHN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlzXG4gICAqIEByZXR1cm4ge1ByaW1pc2V9XG4gICAqL1xuICByZW1vdmUgKGtleXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnN5bmNocm9uaXplKCkucmVtb3ZlKGtleXMsIGl0ZW1zID0+IHtcbiAgICAgICAgcmVzb2x2ZShpdGVtcylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKClcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvYXBwL3V0aWxzL1N0b3JhZ2UuanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBckZBO0FBQUE7QUFBQTtBQUNBO0FBdUZBOzsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app/utils/Storage.js\n");

/***/ }),

/***/ "./src/styles/options.scss":
/*!*********************************!*\
  !*** ./src/styles/options.scss ***!
  \*********************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3R5bGVzL29wdGlvbnMuc2Nzcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zdHlsZXMvb3B0aW9ucy5zY3NzPzVjYjQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZXMvb3B0aW9ucy5zY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9zdHlsZXMvb3B0aW9ucy5zY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/styles/options.scss\n");

/***/ })

/******/ });