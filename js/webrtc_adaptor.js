(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@mediapipe/selfie_segmentation')) :
  typeof define === 'function' && define.amd ? define(['exports', '@mediapipe/selfie_segmentation'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.webrtc_adaptor = {}));
})(this, (function (exports) { 'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
    return _classApplyDescriptorGet(receiver, descriptor);
  }
  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _classPrivateMethodInitSpec(obj, privateSet) {
    _checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }

  class PeerStats {
    /**
     * Creates an instance of the class.
     * @param {string} streamId - The stream ID.
     * @constructor
     */
    constructor(streamId) {
      /**
       * The stream ID.
       * @type {string}
       */
      this.streamId = streamId;

      /**
       * The total number of bytes received.
       * @type {number}
       */
      this.totalBytesReceivedCount = 0;

      /**
       * The total number of bytes sent.
       * @type {number}
       */
      this.totalBytesSent = 0;

      /**
       * The number of video packets lost.
       * @type {number}
       */
      this.videoPacketsLost = 0;

      /**
       * The fraction of lost video packets.
       * @type {number}
       */
      this.fractionLost = 0;

      /**
       * The start time.
       * @type {number}
       */
      this.startTime = 0;

      /**
       * The last number of frames encoded.
       * @type {number}
       */
      this.lastFramesEncoded = 0;

      /**
       * The total number of frames encoded.
       * @type {number}
       */
      this.totalFramesEncodedCount = 0;

      /**
       * The last number of bytes received.
       * @type {number}
       */
      this.lastBytesReceived = 0;

      /**
       * The last number of bytes sent.
       * @type {number}
       */
      this.lastBytesSent = 0;

      /**
      * @deprecated use videoPacketsSent
       * The total number of video packets sent.
       * @type {number}
       */
      this.totalVideoPacketsSent = 0;
      /**
          * The total number of video packets sent.
          * @type {number}
             */
      this.videoPacketsSent = 0;
      /**
          * The total number of video packets received.
          * @type {number}
             */
      this.videoPacketsReceived = 0;

      /**
       * @deprecated use audioPacketsSent
      *  The total number of audio packets sent.
       * @type {number}
       */
      this.totalAudioPacketsSent = 0;

      /**
       * 
       * The total number of audio packets sent.
          * @type {number}
       */
      this.audioPacketsSent = 0;
      /* 
       * The total number of audio packets received.
          * @type {number}
       * 			 
       * */
      this.audioPacketsReceived = 0;

      /**
             * The current timestamp.
             * @type {number}
             */
      this.currentTimestamp = 0;

      /**
       * The last recorded timestamp.
       * @type {number}
       */
      this.lastTime = 0;

      /**
       * The timer ID.
       * @type {number}
       */
      this.timerId = 0;

      /**
       * The first byte sent count.
       * @type {number}
       */
      this.firstByteSentCount = 0;

      /**
       * The first bytes received count.
       * @type {number}
       */
      this.firstBytesReceivedCount = 0;

      /**
       * The audio level.
       * @type {number}
       */
      this.audioLevel = -1;

      /**
       * The quality limitation reason.
       * @type {string}
       */
      this.qualityLimitationReason = "";

      /**
       * The source resolution width.
       * @type {number}
       */
      this.resWidth = 0;

      /**
       * The source resolution height.
       * @type {number}
       */
      this.resHeight = 0;

      /**
       * The source frames per second.
       * @type {number}
       */
      this.srcFps = 0;

      /**
       * The frame width of the sent video.
       * @type {number}
       */
      this.frameWidth = 0;

      /**
       * The frame height of the sent video.
       * @type {number}
       */
      this.frameHeight = 0;

      /**
       * The video round-trip time.
       * @type {number}
       */
      this.videoRoundTripTime = 0;

      /**
       * The video jitter.
       * @type {number}
       */
      this.videoJitter = 0;

      /**
       * The audio round-trip time.
       * @type {number}
       */
      this.audioRoundTripTime = 0;

      /**
       * The audio jitter.
       * @type {number}
       */
      this.audioJitter = 0;

      /**
       * The number of audio packets lost.
       * @type {number}
       */
      this.audioPacketsLost = 0;

      /**
       * The number of frames received.
       * @type {number}
       */
      this.framesReceived = 0;

      /**
       * The number of frames dropped.
       * @type {number}
       */
      this.framesDropped = 0;

      /**
       * The number of frames decoded.
       * @type {number}
       */
      this.framesDecoded = 0;

      /**
       * The average audio jitter delay.
       * @type {number}
       */
      this.audioJitterAverageDelay = 0;

      /**
       * The average video jitter delay.
       * @type {number}
       */
      this.videoJitterAverageDelay = 0;
      this.availableOutgoingBitrate = Infinity;

      /**
       * The list of inbound RTP list.
       * It can be used to view the inbound RTP statistics per track in the multi-track conference or the multi-track playback scenarios.
       * @type {*[]}
       */
      this.inboundRtpList = [];

      /**
       * The current round trip time for the candidate pair
       */
      this.currentRoundTripTime = 0;
    }
    //kbits/sec
    get averageOutgoingBitrate() {
      return Math.floor(8 * (this.totalBytesSentCount - this.firstByteSentCount) / (this.currentTimestamp - this.startTime));
    }

    //frames per second
    get currentFPS() {
      return ((this.totalFramesEncodedCount - this.lastFramesEncoded) / (this.currentTimestamp - this.lastTime) * 1000).toFixed(1);
    }

    //kbits/sec
    get averageIncomingBitrate() {
      return Math.floor(8 * (this.totalBytesReceivedCount - this.firstBytesReceivedCount) / (this.currentTimestamp - this.startTime));
    }

    //kbits/sec
    get currentOutgoingBitrate() {
      return Math.floor(8 * (this.totalBytesSentCount - this.lastBytesSent) / (this.currentTimestamp - this.lastTime));
    }

    //kbits/sec
    get currentIncomingBitrate() {
      return Math.floor(8 * (this.totalBytesReceivedCount - this.lastBytesReceived) / (this.currentTimestamp - this.lastTime));
    }
    /**
     * @param {number} timestamp
     * @returns {void}
     */
    set currentTime(timestamp) {
      this.lastTime = this.currentTimestamp;
      this.currentTimestamp = timestamp;
      if (this.startTime == 0) {
        this.startTime = timestamp - 1; // do not have zero division error
      }
    }
    /**
     * @param {number} bytesReceived
     * @returns {void}
     */
    set totalBytesReceived(bytesReceived) {
      this.lastBytesReceived = this.totalBytesReceivedCount;
      this.totalBytesReceivedCount = bytesReceived;
      if (this.firstBytesReceivedCount == 0) {
        this.firstBytesReceivedCount = bytesReceived;
      }
    }
    /**
     * @param {number} bytesSent
     * @returns {void}
     */
    set totalBytesSent(bytesSent) {
      this.lastBytesSent = this.totalBytesSentCount;
      this.totalBytesSentCount = bytesSent;
      if (this.firstByteSentCount == 0) {
        this.firstByteSentCount = bytesSent;
      }
    }
    /**
     * @param {number} framesEncoded
     * @returns {void}
     */
    set totalFramesEncoded(framesEncoded) {
      this.lastFramesEncoded = this.totalFramesEncodedCount;
      this.totalFramesEncodedCount = framesEncoded;
      if (this.lastFramesEncoded == 0) {
        this.lastFramesEncoded = framesEncoded;
      }
    }
  }

  /*
  * loglevel - https://github.com/pimterry/loglevel
  *
  * Copyright (c) 2013 Tim Perry
  * Licensed under the MIT license.
  */
  (function (root, definition) {

    window.log = definition();
  })(undefined, function () {

    // Slightly dubious tricks to cut down minimized file size
    var noop = function noop() {};
    var undefinedType = "undefined";
    var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
    var logMethods = ["trace", "debug", "info", "warn", "error"];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
      var method = obj[methodName];
      if (typeof method.bind === 'function') {
        return method.bind(obj);
      } else {
        try {
          return Function.prototype.bind.call(method, obj);
        } catch (e) {
          // Missing bind shim or IE8 + Modernizr, fallback to wrapping
          return function () {
            return Function.prototype.apply.apply(method, [obj, arguments]);
          };
        }
      }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
      if (console.log) {
        if (console.log.apply) {
          console.log.apply(console, arguments);
        } else {
          // In old IE, native console methods themselves don't have apply().
          Function.prototype.apply.apply(console.log, [console, arguments]);
        }
      }
      if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
      if (methodName === 'debug') {
        methodName = 'log';
      }
      if (typeof console === undefinedType) {
        return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
      } else if (methodName === 'trace' && isIE) {
        return traceForIE;
      } else if (console[methodName] !== undefined) {
        return bindMethod(console, methodName);
      } else if (console.log !== undefined) {
        return bindMethod(console, 'log');
      } else {
        return noop;
      }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
      /*jshint validthis:true */
      for (var i = 0; i < logMethods.length; i++) {
        var methodName = logMethods[i];
        this[methodName] = i < level ? noop : this.methodFactory(methodName, level, loggerName);
      }

      // Define log.log as an alias for log.debug
      this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
      return function () {
        if (typeof console !== undefinedType) {
          replaceLoggingMethods.call(this, level, loggerName);
          this[methodName].apply(this, arguments);
        }
      };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
      /*jshint validthis:true */
      return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
    }
    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;
      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }
      function persistLevelIfPossible(levelNum) {
        var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
        if (typeof window === undefinedType || !storageKey) return;

        // Use localStorage if available
        try {
          window.localStorage[storageKey] = levelName;
          return;
        } catch (ignore) {}

        // Use session cookie as fallback
        try {
          window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
        } catch (ignore) {}
      }
      function getPersistedLevel() {
        var storedLevel;
        if (typeof window === undefinedType || !storageKey) return;
        try {
          storedLevel = window.localStorage[storageKey];
        } catch (ignore) {}

        // Fallback to cookies if local storage gives us nothing
        if (typeof storedLevel === undefinedType) {
          try {
            var cookie = window.document.cookie;
            var location = cookie.indexOf(encodeURIComponent(storageKey) + "=");
            if (location !== -1) {
              storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
            }
          } catch (ignore) {}
        }

        // If the stored level is not valid, treat it as if nothing was stored.
        if (self.levels[storedLevel] === undefined) {
          storedLevel = undefined;
        }
        return storedLevel;
      }
      function clearPersistedLevel() {
        if (typeof window === undefinedType || !storageKey) return;

        // Use localStorage if available
        try {
          window.localStorage.removeItem(storageKey);
          return;
        } catch (ignore) {}

        // Use session cookie as fallback
        try {
          window.document.cookie = encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        } catch (ignore) {}
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;
      self.levels = {
        "TRACE": 0,
        "DEBUG": 1,
        "INFO": 2,
        "WARN": 3,
        "ERROR": 4,
        "SILENT": 5
      };
      self.methodFactory = factory || defaultMethodFactory;
      self.getLevel = function () {
        return currentLevel;
      };
      self.setLevel = function (level, persist) {
        if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
          level = self.levels[level.toUpperCase()];
        }
        if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
          currentLevel = level;
          if (persist !== false) {
            // defaults to true
            persistLevelIfPossible(level);
          }
          replaceLoggingMethods.call(self, level, name);
          if (typeof console === undefinedType && level < self.levels.SILENT) {
            return "No console available for logging";
          }
        } else {
          throw "log.setLevel() called with invalid level: " + level;
        }
      };
      self.setDefaultLevel = function (level) {
        defaultLevel = level;
        if (!getPersistedLevel()) {
          self.setLevel(level, false);
        }
      };
      self.resetLevel = function () {
        self.setLevel(defaultLevel, false);
        clearPersistedLevel();
      };
      self.enableAll = function (persist) {
        self.setLevel(self.levels.TRACE, persist);
      };
      self.disableAll = function (persist) {
        self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
        initialLevel = defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();
    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
      if (typeof name !== "symbol" && typeof name !== "string" || name === "") {
        throw new TypeError("You must supply a name when creating a logger.");
      }
      var logger = _loggersByName[name];
      if (!logger) {
        logger = _loggersByName[name] = new Logger(name, defaultLogger.getLevel(), defaultLogger.methodFactory);
      }
      return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = typeof window !== undefinedType ? window.log : undefined;
    defaultLogger.noConflict = function () {
      if (typeof window !== undefinedType && window.log === defaultLogger) {
        window.log = _log;
      }
      return defaultLogger;
    };
    defaultLogger.getLoggers = function getLoggers() {
      return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;
    return defaultLogger;
  });
  var Logger$5 = window.log;

  var Logger$4 = window.log;
  class WebSocketAdaptor {
    /**
     * 
     * @param {object} initialValues 
     */
    constructor(initialValues) {
      /**
       * Websocket URL
       */
      this.websocketURL = null;

      /**
       * HTTP Endpoint URL is the endpoint that returns the websocket URL
      	 */
      this.httpEndpointUrl = null;

      /**
       * HTTP Endpoint URL for access token
       */
      this.httpEndpointAccessToken = null;

      /**
       * WebRTCAdaptor which is responsible for handling WebRTC connections
       */
      this.webrtcadaptor = null;

      /**
       * @type {boolean}
       */
      this.debug = false;

      /**
       * Init the connectin when constructor is called
       */
      this.initConnection = true;
      for (var key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          this[key] = initialValues[key];
        }
      }
      if (this.websocketURL == null) {
        this.websocketURL = this.websocket_url;
      }
      if (this.initConnection == true) {
        this.checkBackendReady();
      }
      addEventListener("offline", event => {
        this.connected = false;
        this.connecting = false;
        Logger$4.info("Network status has changed to offline. Resetting flags to reconnect faster");
      });
    }
    getHttpEndpoint(endpointUrl, options) {
      return fetch(endpointUrl, options);
    }
    tryAgainAfterDelay(callbackConnected) {
      setTimeout(() => {
        this.checkBackendReady(callbackConnected);
      }, 3000);
    }
    checkBackendInstanceUp(data, callbackConnected) {
      var _this = this;
      return _asyncToGenerator(function* () {
        return _this.getHttpEndpoint(data.http_url, {
          method: 'HEAD'
        }).then(response => {
          if (response.status >= 200 && response.status < 400) {
            _this.websocketURL = data.websocket_url;
            _this.initWebSocketConnection(callbackConnected);
          } else {
            Logger$4.warn('Backend does not return ok. Retrying in 3 seconds...');
            _this.tryAgainAfterDelay(callbackConnected);
          }
        }).catch(e => {
          Logger$4.warn('Backend is not ready yet. Retrying in 3 seconds...');
          Logger$4.error(e);
          _this.tryAgainAfterDelay(callbackConnected);
        });
      })();
    }
    checkBackendReady(callbackConnected) {
      var _this2 = this;
      return _asyncToGenerator(function* () {
        _this2.connecting = true;
        _this2.connected = false;
        if (_this2.httpEndpointUrl != null) {
          var endpointUrl = new URL(_this2.httpEndpointUrl);
          endpointUrl.searchParams.set('source', 'sdk');
          if (_this2.httpEndpointAccessToken != null) {
            endpointUrl.searchParams.set('accessToken', _this2.httpEndpointAccessToken);
          }
          _this2.httpEndpointUrl = endpointUrl.toString();
          //return promise for this case
          return _this2.getHttpEndpoint(_this2.httpEndpointUrl, {
            method: "GET"
          }).then(response => {
            if (response.ok) {
              Logger$4.info("http endpoint returns ok");
              return response.json(); // Parse JSON from body
            }

            throw new Error('Network response was not ok');
          }).then(data => {
            Logger$4.info("Response body -> fqdn :" + data.fqdn + "	websocket_url: " + data.websocket_url + " http_url: " + data.http_url);
            return _this2.checkBackendInstanceUp(data, callbackConnected);
          }).catch(e => {
            _this2.tryAgainAfterDelay(callbackConnected);
            Logger$4.warn('HttpEndpoint is not ready yet', e);
            Logger$4.error(e);
          });
        } else {
          return new Promise((resolve, reject) => {
            _this2.initWebSocketConnection(callbackConnected);
            resolve();
          });
        }
      })();
    }

    /**
     * Initializes the WebSocket connection.
     * @param {Function} callbackConnected - Optional callback function to be called when the connection is established.
     * @returns {void}
     */
    initWebSocketConnection(callbackConnected) {
      this.connecting = true;
      this.connected = false;
      this.clearPingTimer();

      /*
      * It's not mandatory if you don't use the new Load Balancer mechanism
      * It uses one of the nodes on Cluster mode
      * Example parameters: "origin" or "edge"
      */
      var url = new URL(this.websocketURL);
      if (!['origin', 'edge'].includes(url.searchParams.get('target'))) {
        url.searchParams.set('target', this.webrtcadaptor.isPlayMode ? 'edge' : 'origin');
        this.websocketURL = url.toString();
      }
      this.wsConn = new WebSocket(this.websocketURL);
      this.wsConn.onopen = () => {
        Logger$4.debug("websocket connected");
        this.pingTimerId = setInterval(() => {
          this.sendPing();
        }, 3000);
        this.connected = true;
        this.connecting = false;
        this.callback("initialized");

        // Request ICE server configuration from server if user hasn't provided any
        this.webrtcadaptor.getIceServerConfiguration();
        if (typeof callbackConnected != "undefined") {
          callbackConnected();
        }
      };
      this.wsConn.onmessage = event => {
        var obj = JSON.parse(event.data);
        if (obj.command == "start") {
          //this command is received first, when publishing so playmode is false

          if (this.debug) {
            Logger$4.debug("received start command");
          }
          this.webrtcadaptor.startPublishing(obj.streamId);
        } else if (obj.command == "takeCandidate") {
          if (this.debug) {
            Logger$4.debug("received ice candidate for stream id " + obj.streamId);
            Logger$4.debug(obj.candidate);
          }
          this.webrtcadaptor.takeCandidate(obj.streamId, obj.label, obj.candidate);
        } else if (obj.command == "takeConfiguration") {
          if (this.debug) {
            Logger$4.debug("received remote description type for stream id: " + obj.streamId + " type: " + obj.type);
          }
          this.webrtcadaptor.takeConfiguration(obj.streamId, obj.sdp, obj.type, obj.idMapping);
        } else if (obj.command == "stop") {
          if (this.debug) {
            Logger$4.debug("Stop command received");
          }
          //server sends stop command when the peers are connected to each other in peer-to-peer.
          //It is not being sent in publish,play modes
          this.webrtcadaptor.closePeerConnection(obj.streamId);
        } else if (obj.command == "error") {
          this.callbackError(obj.definition, obj);
        } else if (obj.command == "notification") {
          this.callback(obj.definition, obj);
        } else if (obj.command == "streamInformation") {
          this.callback(obj.command, obj);
        } else if (obj.command == "roomInformation") {
          this.callback(obj.command, obj);
        } else if (obj.command == "pong") {
          this.callback(obj.command);
        } else if (obj.command == "trackList") {
          this.callback(obj.command, obj);
        } else if (obj.command == "connectWithNewId") {
          this.multiPeerStreamId = obj.streamId;
          this.join(obj.streamId);
        } else if (obj.command == "peerMessageCommand") {
          this.callback(obj.command, obj);
        } else if (obj.command == "iceServerConfig") {
          if (this.debug) {
            Logger$4.debug("received ice server config");
          }
          if (obj.stunServerUri) {
            // Construct the iceServers configuration based on URI type
            if (obj.stunServerUri.startsWith("turn:")) {
              // For TURN server
              this.webrtcadaptor.peerconnection_config.iceServers = [{
                'urls': 'stun:stun1.l.google.com:19302'
              }, {
                'urls': obj.stunServerUri,
                'username': obj.turnServerUsername || "",
                'credential': obj.turnServerCredential || ""
              }];
            } else if (obj.stunServerUri.startsWith("stun:")) {
              // For STUN server
              this.webrtcadaptor.peerconnection_config.iceServers = [{
                'urls': obj.stunServerUri
              }];
            }
            if (this.debug) {
              Logger$4.debug("ice servers updated: " + JSON.stringify(this.webrtcadaptor.peerconnection_config.iceServers));
            }
          }
        }
      };
      this.wsConn.onerror = error => {
        this.connecting = false;
        this.connected = false;
        Logger$4.info(" error occured: " + JSON.stringify(error));
        this.clearPingTimer();
        this.callbackError("WebSocketNotConnected", error);
      };
      this.wsConn.onclose = event => {
        this.connecting = false;
        this.connected = false;
        if (this.debug) {
          Logger$4.debug("connection closed.");
        }
        this.clearPingTimer();
        this.callback("closed", event);
      };
    }
    clearPingTimer() {
      if (this.pingTimerId != -1) {
        if (this.debug) {
          Logger$4.debug("Clearing ping message timer");
        }
        clearInterval(this.pingTimerId);
        this.pingTimerId = -1;
      }
    }
    sendPing() {
      var jsCmd = {
        command: "ping"
      };
      this.wsConn.send(JSON.stringify(jsCmd));
    }
    close() {
      this.wsConn.close();
    }
    /**
     * 
     * @param {*} text 
     * @returns 
     */
    send(text) {
      if (this.connecting == false && this.connected == false) {
        //try to reconnect
        this.checkBackendReady(() => {
          this.send(text);
        });
        return;
      }
      try {
        this.wsConn.send(text);
        if (this.debug) {
          Logger$4.debug("sent message:" + text);
        }
      } catch (error) {
        Logger$4.warn("Make sure you call methods after you receive initialized callback. Cannot send message:" + text + " Error is " + error);
      }
    }
    isConnected() {
      return this.connected;
    }
    isConnecting() {
      return this.connecting;
    }
  }

  var Logger$3 = window.log;
  class SoundMeter {
    /**
     * 
     * @param {AudioContext} context 
     */
    constructor(context, volumeMeterUrl) {
      this.context = context;
      this.instant = 0.0;
      this.mic = null;
      this.volumeMeterNode = null;
      this.url = volumeMeterUrl;
    }
    /**
     * 
     * @param {MediaStream} stream 
     * @param {Function} levelCallback 
     * @param {Function} errorCallback 
     * @returns 
     */
    connectToSource(stream, levelCallback, errorCallback) {
      return this.context.audioWorklet.addModule(this.url).then(() => {
        this.mic = this.context.createMediaStreamSource(stream);
        this.volumeMeterNode = new AudioWorkletNode(this.context, 'volume-meter');
        this.volumeMeterNode.port.onmessage = event => {
          if (event.data.type == 'debug') {
            Logger$3.debug(event.data.message);
          } else {
            this.instant = event.data;
            levelCallback(this.instant.toFixed(2));
            Logger$3.debug("Audio level: " + this.instant.toFixed(2));
          }
        };
        this.mic.connect(this.volumeMeterNode);
      }).catch(err => {
        if (errorCallback !== undefined) {
          errorCallback(err);
        }
        Logger$3.error("Error in soundmeter: " + err);
        Logger$3.error("You may need to define the url of the volume-meter-processor.js");
        throw err;
      });
    }
    stop() {
      if (this.volumeMeterNode != null) {
        this.volumeMeterNode.port.postMessage('stop');
        this.volumeMeterNode.disconnect();
        this.volumeMeterNode.port.close();
        this.volumeMeterNode = null;
      }
      if (this.mic != null) {
        this.mic.disconnect();
        this.mic = null;
      }
    }
  }

  //ask if adaptive m3u8 file

  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.lastIndexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };
  }
  /**
   *
   * @param {string} sParam
   * @param {string=} search
   * @returns
   */
  function getUrlParameter(sParam, search) {
    if (typeof search === undefined || search == null) {
      search = window.location.search;
    }
    var sPageURL = decodeURIComponent(search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  }

  /**
   * @returns {boolean}
   */
  function isAndroid() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android/i.test(userAgent);
  }

  var Logger$2 = window.log;
  /**
   * Media management class is responsible to manage audio and video
   * sources and tracks management for the local stream.
   * Also audio and video properties (like bitrate) are managed by this class .
   */
  class MediaManager {
    /**
     *
     * @param {object} initialValues
     */
    constructor(initialValues) {
      _defineProperty(this, "prepare", void 0);
      /**
       * the maximum bandwith value that browser can send a stream
       * keep in mind that browser may send video less than this value
       */
      this.bandwidth = 1200; //kbps

      /**
       * This flags enables/disables debug logging
       */
      this.debug = false;

      /**
       * The cam_location below is effective when camera and screen is send at the same time.
       * possible values are top and bottom. It's on right all the time
       */
      this.camera_location = "top";

      /**
       * The cam_margin below is effective when camera and screen is send at the same time.
       * This is the margin value in px from the edges
       */
      this.camera_margin = 15;

      /**
       * this camera_percent is how large the camera view appear on the screen. It's %15 by default.
       */
      this.camera_percent = 15;

      /**
       * initial media constraints provided by the user
      * @type {MediaStreamConstraints}
       */
      this.mediaConstraints = {
        /** @type {MediaTrackConstraints} */
        video: true,
        /** @type {MediaTrackConstraints} */
        audio: true
      };

      /**
       * this is the callback function to get video/audio sender from WebRTCAdaptor
       */
      this.getSender = initialValues.getSender;

      /**
       * This is the Stream Id for the publisher.
       */
      this.publishStreamId = null;

      /**
       * this is the object of the local stream to publish
       * it is initiated in initLocalStream method
       */
      this.localStream = null;

      /**
       * publish mode is determined by the user and set by @mediaConstraints.video
       * It may be camera, screen, screen+camera
       */
      this.publishMode = "camera"; //screen, screen+camera

      /**
       * Default callback. It's overriden below if it exists
       */
      this.callback = (info, obj) => {
        Logger$2.debug("Callback info: " + info + " object: " + typeof obj !== undefined ? JSON.stringify(obj) : "");
      };

      /**
       * Default callback error implementation. It's overriden below if it exists
       */
      this.callbackError = err => {
        Logger$2.error(err);
      };

      /**
             * volume-meter-process.js file to find directly. You can locate the file to your assets
       */
      this.volumeMeterUrl = 'volume-meter-processor.js';

      /**
       * The values of the above fields are provided as user parameters by the constructor.
       * TODO: Also some other hidden parameters may be passed here
       */
      for (var key in initialValues.userParameters) {
        if (initialValues.userParameters.hasOwnProperty(key)) {
          this[key] = initialValues.userParameters[key];
        }
      }

      //set the callback if it's defined
      if (initialValues.callback) {
        this.callback = initialValues.callback;
      }

      //set the callbackError if it's defined
      if (initialValues.callbackError) {
        this.callbackError = initialValues.callbackError;
      }

      /**
       * current volume value which is set by the user
       */
      this.currentVolume = null;

      /**
       * Keeps the audio track to be closed in case of audio track change
       */
      this.previousAudioTrack = null;

      /**
      * silent audio track for switching between dummy track to real tracks on the fly
      */
      this.silentAudioTrack = null;

      /**
       * The screen video track in screen+camera mode
       */
      this.desktopStream = null;

      /**
       * The camera (overlay) video track in screen+camera mode
       */
      this.smallVideoTrack = null;

      /**
       * The screen share audio track in screen+camera mode or screen share mode when
       * there browser tab is shared with audio
       */
      this.screenShareAudioTrack = null;

      /**
      * black video track for switching between dummy video track to real tracks on the fly
      */
      this.blackVideoTrack = null;

      /**
       * Audio context to use for meter, mix, gain
       */
      this.audioContext = new AudioContext();

      /**
      * osciallator to generate silent audio
      */
      this.oscillator = null;

      /**
       * the main audio in single audio case
       * the primary audio in mixed audio case
       *
       * its volume can be controled
       */
      this.primaryAudioTrackGainNode = null;

      /**
       * the secondary audio in mixed audio case
       *
       * its volume can be controled
       */
      this.secondaryAudioTrackGainNode = null;

      /**
       * this is the sound meter object for the local stream
       */
      this.localStreamSoundMeter = null;

      /**
       * this is the level callback for sound meter object
       */
      this.levelCallback = null;

      /**
       * Timer to create black frame to publish when video is muted
       */
      this.blackFrameTimer = null;

      /**
       * Timer to draw camera and desktop to canvas
       */
      this.desktopCameraCanvasDrawerTimer = null;

      /**
       * For audio check when the user is muted itself.
       * Check enableAudioLevelWhenMuted
       */
      this.mutedAudioStream = null;

      /**
       * This flag is the status of audio stream
       * Checking when the audio stream is updated
       */
      this.isMuted = false;

      /**
       * meter refresh period for "are you talking?" check
       */
      this.meterRefresh = null;

      /**
       * For keeping track of whether user turned off the camera
       */
      this.cameraEnabled = true;

      /**
       * Replacement stream for video track when the camera is turn off
      */
      this.replacementStream = null;

      /**
       * html video element that presents local stream
       */
      this.localVideo = this.localVideoElement || document.getElementById(this.localVideoId);

      //A dummy stream created to replace the tracks when camera is turned off.
      this.dummyCanvas = document.createElement("canvas");

      // It should be compatible with previous version
      if (this.mediaConstraints) {
        if (this.mediaConstraints.video == "camera") {
          this.publishMode = "camera";
        } else if (this.mediaConstraints.video == "screen") {
          this.publishMode = "screen";
        } else if (this.mediaConstraints.video == "screen+camera") {
          this.publishMode = "screen+camera";
        }
      } else {
        //just define default values
        this.mediaConstraints = {
          video: true,
          audio: true
        };
      }

      //Check browser support for screen share function
      this.checkBrowserScreenShareSupported();
    }

    /**
     * Called by the WebRTCAdaptor at the start if it isn't play mode
     */
    initLocalStream() {
      this.checkWebRTCPermissions();
      if (typeof this.mediaConstraints.video != "undefined" && this.mediaConstraints.video != false) {
        return this.openStream(this.mediaConstraints);
      } else if (typeof this.mediaConstraints.audio != "undefined" && this.mediaConstraints.audio != false) {
        // get only audio
        var media_audio_constraint = {
          audio: this.mediaConstraints.audio
        };
        return this.navigatorUserMedia(media_audio_constraint, stream => {
          return this.gotStream(stream);
        }, true);
      } else {
        //neither video nor audio is requested
        //just return null stream
        Logger$2.debug("no media requested, just return an empty stream");
        return Promise.resolve(null);
      }
    }

    /*
    * Called to checks if Websocket and media usage are allowed
    */
    checkWebRTCPermissions() {
      if (!("WebSocket" in window)) {
        Logger$2.debug("WebSocket not supported.");
        this.callbackError("WebSocketNotSupported");
        return;
      }
      if (typeof navigator.mediaDevices == "undefined") {
        Logger$2.debug("Cannot open camera and mic because of unsecure context. Please Install SSL(https)");
        this.callbackError("UnsecureContext");
        return;
      }
      if (typeof navigator.mediaDevices == "undefined" || navigator.mediaDevices == undefined || navigator.mediaDevices == null) {
        this.callbackError("getUserMediaIsNotAllowed");
      }
    }

    /*
     * Called to get the available video and audio devices on the system
     */
    getDevices() {
      return navigator.mediaDevices.enumerateDevices().then(devices => {
        var deviceArray = new Array();
        var checkAudio = false;
        var checkVideo = false;
        devices.forEach(device => {
          if (device.kind == "audioinput" || device.kind == "videoinput") {
            deviceArray.push(device);
            if (device.kind == "audioinput") {
              checkAudio = true;
            }
            if (device.kind == "videoinput") {
              checkVideo = true;
            }
          }
        });
        this.callback("available_devices", deviceArray);

        //TODO: is the following part necessary. why?
        if (checkAudio == false && this.localStream == null) {
          Logger$2.debug("Audio input not found");
          Logger$2.debug("Retrying to get user media without audio");
          if (this.inputDeviceNotFoundLimit < 2) {
            if (checkVideo != false) {
              this.openStream({
                video: true,
                audio: false
              });
              this.inputDeviceNotFoundLimit++;
            } else {
              Logger$2.debug("Video input not found");
              alert("There is no video or audio input");
            }
          } else {
            alert("No input device found, publish is not possible");
          }
        }
        return deviceArray;
      }).catch(err => {
        Logger$2.error("Cannot get devices -> error name: " + err.name + ": " + err.message);
        throw err;
      });
    }

    /*
     * Called to add a device change listener
     */
    trackDeviceChange() {
      navigator.mediaDevices.ondevicechange = () => {
        this.getDevices();
      };
    }

    /**
     * This function create a canvas which combines screen video and camera video as an overlay
     *
     * @param {*} stream : screen share stream
     * @param {*} streamId
     * @param {*} onEndedCallback : callback when called on screen share stop
     */
    setDesktopwithCameraSource(stream, streamId, onEndedCallback) {
      this.desktopStream = stream;
      return this.navigatorUserMedia({
        video: this.mediaConstraints.video,
        audio: false
      }, cameraStream => {
        this.smallVideoTrack = cameraStream.getVideoTracks()[0];

        //create a canvas element
        var canvas = document.createElement("canvas");
        var canvasContext = canvas.getContext("2d");

        //create video element for screen
        //var screenVideo = document.getElementById('sourceVideo');
        var screenVideo = document.createElement('video');
        screenVideo.srcObject = stream;
        screenVideo.play();
        //create video element for camera
        var cameraVideo = document.createElement('video');
        cameraVideo.srcObject = cameraStream;
        cameraVideo.play();
        var canvasStream = canvas.captureStream(15);
        if (onEndedCallback != null) {
          stream.getVideoTracks()[0].onended = function (event) {
            onEndedCallback(event);
          };
        }
        var promise;
        if (this.localStream == null) {
          promise = this.gotStream(canvasStream);
        } else {
          promise = this.updateVideoTrack(canvasStream, streamId, onended, null);
        }
        promise.then(() => {
          //update the canvas
          this.desktopCameraCanvasDrawerTimer = setInterval(() => {
            //draw screen to canvas
            canvas.width = screenVideo.videoWidth;
            canvas.height = screenVideo.videoHeight;
            canvasContext.drawImage(screenVideo, 0, 0, canvas.width, canvas.height);
            if (this.cameraEnabled) {
              var cameraWidth = screenVideo.videoWidth * (this.camera_percent / 100);
              var cameraHeight = cameraVideo.videoHeight / cameraVideo.videoWidth * cameraWidth;
              var positionX = canvas.width - cameraWidth - this.camera_margin;
              var positionY;
              if (this.camera_location == "top") {
                positionY = this.camera_margin;
              } else {
                //if not top, make it bottom
                //draw camera on right bottom corner
                positionY = canvas.height - cameraHeight - this.camera_margin;
              }
              canvasContext.drawImage(cameraVideo, positionX, positionY, cameraWidth, cameraHeight);
            }
          }, 66);
        });
      }, true);
    }
    /**
     * This function does these:
     *    1. Remove the audio track from the stream provided if it is camera. Other case
     *       is screen video + system audio track. In this case audio is kept in stream.
     *    2. Open audio track again if audio constaint isn't false
     *    3. Make audio track Gain Node to be able to volume adjustable
     *  4. If screen is shared and system audio is available then the system audio and
     *     opened audio track are mixed
     *
     * @param {*} mediaConstraints
     * @param {*} audioConstraint
     * @param {*} stream
     * @param {*} streamId
     */
    prepareStreamTracks(mediaConstraints, audioConstraint, stream, streamId) {
      //this trick, getting audio and video separately, make us add or remove tracks on the fly

      //if audio stream is silent, no need to change it
      if (mediaConstraints.audio == "dummy") {
        return this.gotStream(stream);
      }
      var audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0 && this.publishMode == "camera") {
        audioTracks[0].stop();
        stream.removeTrack(audioTracks[0]);
      }

      //stopScreenShareSystemAudioTrack if exists
      this.stopScreenShareSystemAudioTrack();

      //now get only audio to add this stream
      if (audioConstraint != "undefined" && audioConstraint != false) {
        var media_audio_constraint = {
          audio: audioConstraint
        };
        return this.navigatorUserMedia(media_audio_constraint).then(audioStream => {
          //here audioStream has onr audio track only
          audioStream = this.setGainNodeStream(audioStream);
          // now audio stream has two audio strams.
          // 1. Gain Node : this will be added to local stream to publish
          // 2. Original audio track : keep its reference to stop later

          //add callback if desktop is sharing
          var onended = event => {
            this.callback("screen_share_stopped");
            this.setVideoCameraSource(streamId, mediaConstraints, null, true);
          };
          if (this.publishMode == "screen") {
            return this.updateVideoTrack(stream, streamId, onended, true).then(() => {
              if (audioTracks.length > 0) {
                //system audio share case, then mix it with device audio

                this.screenShareAudioTrack = audioTracks[0];
                audioStream = this.mixAudioStreams(stream, audioStream);
              }
              return this.updateAudioTrack(audioStream, streamId, null);
            });
          } else if (this.publishMode == "screen+camera") {
            if (audioTracks.length > 0) {
              //system audio share case, then mix it with device audio

              this.screenShareAudioTrack = audioTracks[0];
              audioStream = this.mixAudioStreams(stream, audioStream);
            }
            return this.updateAudioTrack(audioStream, streamId, null).then(() => {
              return this.setDesktopwithCameraSource(stream, streamId, onended);
            });
          } else {
            if (audioConstraint != false && audioConstraint != undefined) {
              stream.addTrack(audioStream.getAudioTracks()[0]);
            }
            if (stream.getVideoTracks().length > 0) {
              return this.updateVideoTrack(stream, streamId, null, null).then(() => {
                return this.updateAudioTrack(stream, streamId, null).then(() => {
                  return this.gotStream(stream);
                });
              });
            } else if (stream.getAudioTracks().length > 0) {
              return this.updateAudioTrack(stream, streamId, null).then(() => {
                return this.gotStream(stream);
              });
            } else {
              return this.gotStream(stream);
            }
          }
        }).catch(error => {
          if (error.name == "NotFoundError") {
            this.getDevices();
          } else {
            this.callbackError(error.name, error.message);
          }
          //throw error for promise
          throw error;
        });
      } else {
        return this.gotStream(stream);
      }
    }

    /**
     * Called to get user media (camera and/or mic)
     *
     * @param {*} mediaConstraints : media constaint
     * @param {*} func : callback on success. The stream which is got, is passed as parameter to this function
     * @param {*} catch_error : error is checked if catch_error is true
     */
    navigatorUserMedia(mediaConstraints, func, catch_error) {
      if (mediaConstraints.video == "dummy" && mediaConstraints.audio == "dummy") {
        //if we will have black frame as video and silence as audio, lets add them and return. Can't get user media.
        var stream = new MediaStream();
        stream.addTrack(this.getSilentAudioTrack());
        stream.addTrack(this.getBlackVideoTrack());
        return new Promise((resolve, reject) => {
          resolve(stream);
        });
      } else {
        //We need to replace "dummy" with false before getting user media.
        var tempMediaConstraints = {
          video: mediaConstraints.video,
          audio: mediaConstraints.audio
        };
        if (mediaConstraints.audio == "dummy") {
          tempMediaConstraints.audio = false;
        }
        if (mediaConstraints.video == "dummy") {
          tempMediaConstraints.video = false;
        }
        return navigator.mediaDevices.getUserMedia(tempMediaConstraints).then(stream => {
          //if silence is desired as audio, add it to stream. 
          //Stream shouldn't have audio because audio is set to false in tempMediaConstraints above.   
          if (mediaConstraints.audio == "dummy") {
            stream.addTrack(this.getSilentAudioTrack());
          }

          //if black frame is desired as video, add it to stream. 
          //Stream shouldn't have video because video is set to false in tempMediaConstraints above.   				
          if (mediaConstraints.video == "dummy") {
            stream.addTrack(this.getBlackVideoTrack());
          }
          if (typeof func != "undefined" || func != null) {
            func(stream);
          }
          return stream;
        }).catch(error => {
          if (catch_error == true) {
            if (error.name == "NotFoundError") {
              this.getDevices();
            } else {
              this.callbackError(error.name, error.message);
            }
          } else {
            Logger$2.warn(error);
          }
          //throw error if there is a promise
          throw error;
        });
      }
    }

    /**
     * Called to get display media (screen share)
     * @param {*} streamId
     * @param {*} mediaConstraints : media constaint
     * @param {*} func : callback on success. The stream which is got, is passed as parameter to this function
     */
    navigatorDisplayMedia(streamId, mediaConstraints, func) {
      return navigator.mediaDevices.getDisplayMedia(mediaConstraints).then(stream => {
        if (typeof func != "undefined") {
          func(stream);
        }
        return stream;
      }).catch(error => {
        if (error.name === "NotAllowedError") {
          Logger$2.debug("Permission denied error");
          this.callbackError("ScreenSharePermissionDenied");

          // If error catched then redirect Default Stream Camera
          if (this.localStream == null) {
            this.openStream(this.mediaConstraints);
          } else {
            this.switchVideoCameraCapture(streamId);
          }
        }
      });
    }

    /**
     * Called to get the media (User Media or Display Media)
     * @param {*} mediaConstraints, media constraints
     * @param {*} streamId, streamId to be used to replace track if there is an active peer connection
     */
    getMedia(mediaConstraints, streamId) {
      var audioConstraint = false;
      if (typeof mediaConstraints.audio != "undefined" && mediaConstraints.audio != false) {
        audioConstraint = mediaConstraints.audio;
      }
      if (this.desktopCameraCanvasDrawerTimer != null) {
        clearInterval(this.desktopCameraCanvasDrawerTimer);
        this.desktopCameraCanvasDrawerTimer = null;
      }

      // Check Media Constraint video value screen or screen + camera
      if (this.publishMode == "screen+camera" || this.publishMode == "screen") {
        return this.navigatorDisplayMedia(streamId, mediaConstraints).then(stream => {
          if (this.smallVideoTrack) this.smallVideoTrack.stop();
          this.stopScreenShareSystemAudioTrack();
          return this.prepareStreamTracks(this.mediaConstraints, audioConstraint, stream, streamId);
        });
      } else {
        return this.navigatorUserMedia(mediaConstraints).then(stream => {
          if (this.smallVideoTrack) this.smallVideoTrack.stop();
          this.stopScreenShareSystemAudioTrack();
          return this.prepareStreamTracks(this.mediaConstraints, audioConstraint, stream, streamId);
        }).catch(error => {
          if (error.name == "NotFoundError") {
            this.getDevices();
          } else {
            this.callbackError(error.name, error.message);
          }
        });
      }
    }

    /**
     * Open media stream, it may be screen, camera or audio
     */
    openStream(mediaConstraints, streamId) {
      this.mediaConstraints = mediaConstraints;
      return this.getMedia(mediaConstraints, streamId).then(() => {
        if (this.mediaConstraints.video != "dummy" && this.mediaConstraints.video != undefined) {
          this.stopBlackVideoTrack();
          this.clearBlackVideoTrackTimer();
        }
        if (this.mediaConstraints.audio != "dummy" && this.mediaConstraints.audio != undefined) {
          this.stopSilentAudioTrack();
        }
      });
    }

    /**
     * Closes stream, if you want to stop peer connection, call stop(streamId)
     */
    closeStream() {
      if (this.localStream) {
        this.localStream.getVideoTracks().forEach(function (track) {
          track.onended = null;
          track.stop();
        });
        this.localStream.getAudioTracks().forEach(function (track) {
          track.onended = null;
          track.stop();
        });
      }
      if (this.videoTrack) {
        this.videoTrack.stop();
      }
      if (this.audioTrack) {
        this.audioTrack.stop();
      }
      if (this.smallVideoTrack) {
        this.smallVideoTrack.stop();
      }
      if (this.previousAudioTrack) {
        this.previousAudioTrack.stop();
      }
    }

    /**
     * Checks browser supports screen share feature
     * if exist it calls callback with "browser_screen_share_supported"
     */
    checkBrowserScreenShareSupported() {
      if (typeof navigator.mediaDevices != "undefined" && navigator.mediaDevices.getDisplayMedia || navigator.getDisplayMedia) {
        this.callback("browser_screen_share_supported");
      }
    }
    /**
     * Changes the secondary stream gain in mixed audio mode
     *
     * @param {*} enable
     */
    enableSecondStreamInMixedAudio(enable) {
      if (this.secondaryAudioTrackGainNode != null) {
        if (enable) {
          this.secondaryAudioTrackGainNode.gain.value = 1;
        } else {
          this.secondaryAudioTrackGainNode.gain.value = 0;
        }
      }
    }

    /**
     * Changes local stream when new stream is prepared
     *
     * @param {*} stream
     */
    gotStream(stream) {
      this.localStream = stream;
      if (this.localVideo) {
        this.localVideo.srcObject = stream;
      }
      this.getDevices();
      this.trackDeviceChange();
      return new Promise((resolve, reject) => {
        resolve();
      });
    }

    /**
     * Changes local video and sets localStream as source
     *
     * @param {*} videoEl
     */
    changeLocalVideo(videoEl) {
      this.localVideo = videoEl;
      if (this.localStream) {
        this.localVideo.srcObject = this.localStream;
      }
    }

    /**
     * These methods are initialized when the user is muted himself in a publish scenario
     * It will keep track if the user is trying to speak without sending any data to server
     * Please don't forget to disable this function with disableAudioLevelWhenMuted if you use it.
     */
    enableAudioLevelWhenMuted() {
      return new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true
        }).then(stream => {
          this.mutedAudioStream = stream;
          this.mutedSoundMeter = new SoundMeter(this.audioContext, this.volumeMeterUrl);
          this.mutedSoundMeter.connectToSource(this.mutedAudioStream, value => {
            if (value > 0.1) {
              this.callback("speaking_but_muted");
            }
          }, e => {
            if (e) {
              reject(e);
            }
            this.meterRefresh = setInterval(() => {
              if (this.mutedSoundMeter.instant.toFixed(2) > 0.1) {
                this.callback("speaking_but_muted");
              }
            }, 200);
            resolve(null);
          });
        }).catch(function (err) {
          Logger$2.debug("Can't get the soundlevel on mute");
          reject(err);
        });
      });
    }
    disableAudioLevelWhenMuted() {
      if (this.meterRefresh != null) {
        clearInterval(this.meterRefresh);
        this.meterRefresh = null;
      }
      if (this.mutedSoundMeter != null) {
        this.mutedSoundMeter.stop();
        this.mutedSoundMeter = null;
      }
      if (this.mutedAudioStream != null) {
        this.mutedAudioStream.getTracks().forEach(function (track) {
          track.stop();
        });
      }
    }

    /**
    * @Deprecated. It's not the job of SDK to make these things. It increases the complexity of the code.
     * We provide samples for having these function
     *
     * This method mixed the first stream audio to the second stream audio and
     * @param {*} stream  : Primary stream that contain video and audio (system audio)
     * @param {*} secondStream :stream has device audio
     * @returns mixed stream.
     */
    mixAudioStreams(stream, secondStream) {
      //Logger.debug("audio stream track count: " + audioStream.getAudioTracks().length);
      var composedStream = new MediaStream();
      //added the video stream from the screen
      stream.getVideoTracks().forEach(function (videoTrack) {
        composedStream.addTrack(videoTrack);
      });
      var audioDestionation = this.audioContext.createMediaStreamDestination();
      if (stream.getAudioTracks().length > 0) {
        this.primaryAudioTrackGainNode = this.audioContext.createGain();

        //Adjust the gain for screen sound
        this.primaryAudioTrackGainNode.gain.value = 1;
        var audioSource = this.audioContext.createMediaStreamSource(stream);
        audioSource.connect(this.primaryAudioTrackGainNode).connect(audioDestionation);
      } else {
        Logger$2.debug("Origin stream does not have audio track");
      }
      if (secondStream.getAudioTracks().length > 0) {
        this.secondaryAudioTrackGainNode = this.audioContext.createGain();

        //Adjust the gain for second sound
        this.secondaryAudioTrackGainNode.gain.value = 1;
        var audioSource2 = this.audioContext.createMediaStreamSource(secondStream);
        audioSource2.connect(this.secondaryAudioTrackGainNode).connect(audioDestionation);
      } else {
        Logger$2.debug("Second stream does not have audio track");
      }
      audioDestionation.stream.getAudioTracks().forEach(function (track) {
        composedStream.addTrack(track);
        Logger$2.debug("audio destination add track");
      });
      return composedStream;
    }

    /**
     * This method creates a Gain Node stream to make the audio track adjustable
     *
     * @param {*} stream
     * @returns
     */
    setGainNodeStream(stream) {
      if (this.mediaConstraints.audio != false && typeof this.mediaConstraints.audio != "undefined") {
        // Get the videoTracks from the stream.
        var videoTracks = stream.getVideoTracks();

        // Get the audioTracks from the stream.
        var audioTracks = stream.getAudioTracks();

        /**
         * Create a new audio context and build a stream source,
         * stream destination and a gain node. Pass the stream into
         * the mediaStreamSource so we can use it in the Web Audio API.
         */
        this.audioContext = new AudioContext();
        var mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
        var mediaStreamDestination = this.audioContext.createMediaStreamDestination();
        this.primaryAudioTrackGainNode = this.audioContext.createGain();

        /**
         * Connect the stream to the gainNode so that all audio
         * passes through the gain and can be controlled by it.
         * Then pass the stream from the gain to the mediaStreamDestination
         * which can pass it back to the RTC client.
         */
        mediaStreamSource.connect(this.primaryAudioTrackGainNode);
        this.primaryAudioTrackGainNode.connect(mediaStreamDestination);
        if (this.currentVolume == null) {
          this.primaryAudioTrackGainNode.gain.value = 1;
        } else {
          this.primaryAudioTrackGainNode.gain.value = this.currentVolume;
        }

        /**
         * The mediaStreamDestination.stream outputs a MediaStream object
         * containing a single AudioMediaStreamTrack. Add the video track
         * to the new stream to rejoin the video with the controlled audio.
         */
        var controlledStream = mediaStreamDestination.stream;
        for (var videoTrack of videoTracks) {
          controlledStream.addTrack(videoTrack);
        }
        for (var audioTrack of audioTracks) {
          controlledStream.addTrack(audioTrack);
        }
        if (this.previousAudioTrack !== null) {
          this.previousAudioTrack.stop();
        }
        this.previousAudioTrack = controlledStream.getAudioTracks()[1];

        /**
         * Use the stream that went through the gainNode. This
         * is the same stream but with altered input volume levels.
         */
        return controlledStream;
      }
      return stream;
    }

    /**
     * Called by User
     * to switch the Screen Share mode
     *
     * @param {*} streamId
     */
    switchDesktopCapture(streamId) {
      this.publishMode = "screen";
      var shareMediaConstraints = JSON.parse(JSON.stringify(this.mediaConstraints));
      if (typeof this.mediaConstraints.video != "undefined" && this.mediaConstraints.video != false) {
        shareMediaConstraints.video = true;
      }

      //TODO: I don't think we need to get audio again. We just need to switch the video stream
      return this.getMedia(shareMediaConstraints, streamId);
    }

    /**
     * Called by User
     * to switch the Screen Share with Camera mode
     *
     * @param {*} streamId
     */
    switchDesktopCaptureWithCamera(streamId) {
      this.publishMode = "screen+camera";
      var shareMediaConstraints = JSON.parse(JSON.stringify(this.mediaConstraints));
      if (typeof this.mediaConstraints.video != "undefined" && this.mediaConstraints.video != false) {
        shareMediaConstraints.video = true;
      }

      //TODO: I don't think we need to get audio again. We just need to switch the video stream
      return this.getMedia(shareMediaConstraints, streamId);
    }

    /**
     * This method updates the local stream. It removes existant audio track from the local stream
     * and add the audio track in `stream` parameter to the local stream
     */
    updateLocalAudioStream(stream, onEndedCallback) {
      var newAudioTrack = stream.getAudioTracks()[0];
      if (this.localStream != null && this.localStream.getAudioTracks()[0] != null) {
        var audioTrack = this.localStream.getAudioTracks()[0];
        if (audioTrack != newAudioTrack) {
          this.localStream.removeTrack(audioTrack);
          audioTrack.stop();
          this.localStream.addTrack(newAudioTrack);
        }
      } else if (this.localStream != null) {
        this.localStream.addTrack(newAudioTrack);
      } else {
        this.localStream = stream;
      }
      if (this.localVideo != null) {
        //it can be null
        this.localVideo.srcObject = this.localStream;
      }
      if (onEndedCallback != null) {
        stream.getAudioTracks()[0].onended = function (event) {
          onEndedCallback(event);
        };
      }
      if (this.mediaConstraints.audio != "dummy") {
        if (this.isMuted) {
          this.muteLocalMic();
        } else {
          this.unmuteLocalMic();
        }
      }
      if (this.localStreamSoundMeter != null) {
        this.enableAudioLevelForLocalStream(this.levelCallback);
      }
    }

    /**
     * This method updates the local stream. It removes existant video track from the local stream
     * and add the video track in `stream` parameter to the local stream
     */
    updateLocalVideoStream(stream, onEndedCallback, stopDesktop) {
      if (stopDesktop && this.desktopStream != null) {
        this.desktopStream.getVideoTracks()[0].stop();
      }
      var newVideoTrack = stream.getVideoTracks()[0];
      if (this.localStream != null && this.localStream.getVideoTracks()[0] != null) {
        var videoTrack = this.localStream.getVideoTracks()[0];
        if (videoTrack != newVideoTrack) {
          this.localStream.removeTrack(videoTrack);
          videoTrack.stop();
          this.localStream.addTrack(newVideoTrack);
        }
      } else if (this.localStream != null) {
        this.localStream.addTrack(newVideoTrack);
      } else {
        this.localStream = stream;
      }
      if (this.localVideo) {
        this.localVideo.srcObject = this.localStream;
      }
      if (onEndedCallback != null) {
        stream.getVideoTracks()[0].onended = function (event) {
          onEndedCallback(event);
        };
      }
    }

    /**
     * Called by User
     * to change video source
     *
     * @param {*} streamId
     * @param {*} deviceId
     */
    switchAudioInputSource(streamId, deviceId) {
      //stop the track because in some android devices need to close the current camera stream
      var audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack && isAndroid()) {
        audioTrack.stop();
      }
      if (typeof audioTrack == "undefined") {
        Logger$2.warn("There is no audio track in local stream");
      }
      if (typeof deviceId != "undefined") {
        //Update the media constraints
        if (this.mediaConstraints.audio !== true) this.mediaConstraints.audio.deviceId = deviceId;else this.mediaConstraints.audio = {
          "deviceId": deviceId
        };

        //to change only audio track set video false otherwise issue #3826 occurs on Android
        var tempMediaConstraints = {
          "video": false,
          "audio": {
            "deviceId": deviceId
          }
        };
        return this.setAudioInputSource(streamId, tempMediaConstraints, null, deviceId);
      } else {
        return new Promise((resolve, reject) => {
          reject("There is no device id for audio input source");
        });
      }
    }

    /**
     * This method sets Audio Input Source and called when you change audio device
     * It calls updateAudioTrack function to update local audio stream.
     */
    setAudioInputSource(streamId, mediaConstraints, onEndedCallback) {
      return this.navigatorUserMedia(mediaConstraints, stream => {
        stream = this.setGainNodeStream(stream);
        return this.updateAudioTrack(stream, streamId, mediaConstraints, onEndedCallback);
      }, true);
    }
    checkAndStopLocalVideoTrackOnAndroid() {
      //stop the track because in some android devices need to close the current camera stream
      if (this.localStream && this.localStream.getVideoTracks().length > 0 && isAndroid()) {
        var videoTrack = this.localStream.getVideoTracks()[0];
        videoTrack.stop();
      }
      if (this.localStream === null || this.localStream.getVideoTracks().length === 0) {
        Logger$2.warn("There is no video track in local stream");
      }
    }

    /**
     * Called by User
     * to change video camera capture
     *
     * @param {*} streamId Id of the stream to be changed.
     * @param {*} deviceId Id of the device which will use as a media device
     * @param {*} onEndedCallback callback for when the switching video state is completed, can be used to understand if it is loading or not
     *
     * This method is used to switch to video capture.
     */
    switchVideoCameraCapture(streamId, deviceId, onEndedCallback) {
      this.checkAndStopLocalVideoTrackOnAndroid();
      this.publishMode = "camera";
      return navigator.mediaDevices.enumerateDevices().then(devices => {
        for (var i = 0; i < devices.length; i++) {
          if (devices[i].kind == "videoinput") {
            //Adjust video source only if there is a matching device id with the given one.
            //It creates problems if we don't check that since video can be just true to select default cam and it is like that in many cases.
            if (devices[i].deviceId == deviceId) {
              if (this.mediaConstraints.video !== true) this.mediaConstraints.video.deviceId = {
                exact: deviceId
              };else this.mediaConstraints.video = {
                deviceId: {
                  exact: deviceId
                }
              };
              break;
            }
          }
        }
        //If no matching device found don't adjust the media constraints let it be true instead of a device ID
        Logger$2.debug("Given deviceId = " + deviceId + " - Media constraints video property = " + this.mediaConstraints.video);
        return this.setVideoCameraSource(streamId, this.mediaConstraints, onEndedCallback, true, deviceId);
      });
    }
    stopScreenShareSystemAudioTrack() {
      //stopping the audoTrack resolves the screen sharing banner issue https://github.com/ant-media/Ant-Media-Server/issues/7335
      if (this.screenShareAudioTrack) {
        this.screenShareAudioTrack.stop();
        this.screenShareAudioTrack = null;
      }
    }
    setGainNodeandUpdateAudioTrack(streamId, stream, mediaConstraints, stopDesktop, onEndedCallback) {
      if (stopDesktop && this.secondaryAudioTrackGainNode && stream.getAudioTracks().length > 0) {
        //if there is a screen share audio track from browser tab, stop it 
        this.stopScreenShareSystemAudioTrack();

        //This audio track update is necessary for such a case:
        //If you enable screen share with browser audio and then
        //return back to the camera, the audio should be only from mic.
        //If, we don't update audio with the following lines,
        //the mixed (mic+browser) audio would be streamed in the camera mode.
        this.secondaryAudioTrackGainNode = null;
        stream = this.setGainNodeStream(stream);
        this.updateAudioTrack(stream, streamId, mediaConstraints, onEndedCallback);
      }
    }

    /**
     * This method sets Video Input Source and called when you change video device
     * It calls updateVideoTrack function to update local video stream.
     */
    setVideoCameraSource(streamId, mediaConstraints, onEndedCallback, stopDesktop) {
      return this.navigatorUserMedia(mediaConstraints, stream => {
        this.setGainNodeandUpdateAudioTrack(streamId, stream, mediaConstraints, stopDesktop, onEndedCallback);
        if (this.cameraEnabled) {
          return this.updateVideoTrack(stream, streamId, onEndedCallback, stopDesktop);
        } else {
          return this.turnOffLocalCamera();
        }
      }, true);
    }

    /**
     * Called by User
     * to switch between front and back camera on mobile devices
     *
     * @param {*} streamId Id of the stream to be changed.
     * @param {*} facingMode it can be "user" or "environment"
     *
     * This method is used to switch front and back camera.
     */
    switchVideoCameraFacingMode(streamId, facingMode) {
      this.checkAndStopLocalVideoTrackOnAndroid();

      // When device id set, facing mode is not working
      // so, remove device id
      if (this.mediaConstraints.video !== undefined && this.mediaConstraints.video.deviceId !== undefined) {
        delete this.mediaConstraints.video.deviceId;
      }
      var videoConstraint = {
        'facingMode': facingMode
      };
      this.mediaConstraints.video = Object.assign({}, this.mediaConstraints.video, videoConstraint);
      this.publishMode = "camera";
      Logger$2.debug("Media constraints video property = " + this.mediaConstraints.video);
      return this.setVideoCameraSource(streamId, {
        video: this.mediaConstraints.video
      }, null, true);
    }

    /**
     * Updates the audio track in the audio sender
     * getSender method is set on MediaManagercreation by WebRTCAdaptor
     *
     * @param {*} stream
     * @param {*} streamId
     * @param {*} onEndedCallback
     */
    updateAudioTrack(stream, streamId, onEndedCallback) {
      var audioTrackSender = this.getSender(streamId, "audio");
      if (audioTrackSender) {
        return audioTrackSender.replaceTrack(stream.getAudioTracks()[0]).then(result => {
          this.updateLocalAudioStream(stream, onEndedCallback);
        }).catch(function (error) {
          Logger$2.debug(error.name);
          throw error;
        });
      } else {
        this.updateLocalAudioStream(stream, onEndedCallback);
        return new Promise((resolve, reject) => {
          resolve();
        });
      }
    }

    /**
     * Updates the video track in the video sender
     * getSender method is set on MediaManagercreation by WebRTCAdaptor
     *
     * @param {*} stream
     * @param {*} streamId
     * @param {*} onEndedCallback
     */
    updateVideoTrack(stream, streamId, onEndedCallback, stopDesktop) {
      var videoTrackSender = this.getSender(streamId, "video");
      if (videoTrackSender) {
        return videoTrackSender.replaceTrack(stream.getVideoTracks()[0]).then(result => {
          this.updateLocalVideoStream(stream, onEndedCallback, stopDesktop);
        }).catch(error => {
          Logger$2.debug(error.name);
        });
      } else {
        this.updateLocalVideoStream(stream, onEndedCallback, stopDesktop);
        return new Promise((resolve, reject) => {
          resolve();
        });
      }
    }

    /**
     * If you mute turn off the camera still some data should be sent
     * Tihs method create a black frame to reduce data transfer
     */
    getBlackVideoTrack() {
      this.dummyCanvas.getContext('2d').fillRect(0, 0, 320, 240);

      //REFACTOR: it's not good to set to a replacement stream
      this.replacementStream = this.dummyCanvas.captureStream();
      //We need to send black frames within a time interval, because when the user turn off the camera,
      //player can't connect to the sender since there is no data flowing. Sending a black frame in each 3 seconds resolves it.
      if (this.blackFrameTimer == null) {
        this.blackFrameTimer = setInterval(() => {
          this.getBlackVideoTrack();
        }, 3000);
      }
      this.blackVideoTrack = this.replacementStream.getVideoTracks()[0];
      return this.blackVideoTrack;
    }

    /**
     * Silent audio track
    */
    getSilentAudioTrack() {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }

      // Stop previous track if exists
      this.stopSilentAudioTrack();

      // Create oscillator
      this.oscillator = this.audioContext.createOscillator();
      this.oscillator.frequency.value = 0; // technically optional

      // Create gain node to mute
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 0;

      // Connect oscillator -> gain -> destination
      this.oscillator.connect(this.gainNode);
      var dst = this.gainNode.connect(this.audioContext.createMediaStreamDestination());

      // Start oscillator
      this.oscillator.start();

      // Return silent audio track
      this.silentAudioTrack = dst.stream.getAudioTracks()[0];
      return this.silentAudioTrack;
    }
    stopSilentAudioTrack() {
      if (this.oscillator != null) {
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.oscillator = null;
      }
      if (this.silentAudioTrack != null) {
        this.silentAudioTrack.stop();
        this.silentAudioTrack = null;
      }
    }

    /**
     * Called by User
     * turns of the camera stream and starts streaming black dummy frame
     */
    turnOffLocalCamera(streamId) {
      if (this.publishMode == "screen+camera") {
        this.cameraEnabled = false;
        return;
      }
      //Initialize the first dummy frame for switching.
      this.getBlackVideoTrack();
      if (this.localStream != null) {
        var choosenId;
        if (streamId != null || typeof streamId != "undefined") {
          choosenId = streamId;
        } else {
          choosenId = this.publishStreamId;
        }
        this.cameraEnabled = false;
        return this.updateVideoTrack(this.replacementStream, choosenId, null, true);
      } else {
        return new Promise((resolve, reject) => {
          this.callbackError("NoActiveConnection");
          reject("NoActiveStream");
        });
      }
    }
    clearBlackVideoTrackTimer() {
      if (this.blackFrameTimer != null) {
        clearInterval(this.blackFrameTimer);
        this.blackFrameTimer = null;
      }
    }
    stopBlackVideoTrack() {
      if (this.blackVideoTrack != null) {
        this.blackVideoTrack.stop();
        this.blackVideoTrack = null;
      }
    }

    /**
     * Called by User
     * turns of the camera stream and starts streaming camera again instead of black dummy frame
     */
    turnOnLocalCamera(streamId) {
      if (this.publishMode == "screen+camera") {
        this.cameraEnabled = true;
        return;
      }
      this.clearBlackVideoTrackTimer();
      this.stopBlackVideoTrack();

      //make video true if it is "dummy"
      var tempMediaConstraints = {
        video: this.mediaConstraints.video == "dummy" ? true : this.mediaConstraints.video,
        audio: this.mediaConstraints.audio
      };
      if (this.localStream == null) {
        return this.navigatorUserMedia(tempMediaConstraints, stream => {
          this.gotStream(stream);
        }, false);
      }
      //This method will get the camera track and replace it with dummy track
      else {
        return this.navigatorUserMedia(tempMediaConstraints, stream => {
          var choosenId;
          if (streamId != null || typeof streamId != "undefined") {
            choosenId = streamId;
          } else {
            choosenId = this.publishStreamId;
          }
          this.cameraEnabled = true;
          this.updateVideoTrack(stream, choosenId, null, true);
        }, false);
      }
    }

    /**
     * Called by User
     * to mute local audio streaming
     */
    muteLocalMic() {
      this.isMuted = true;
      if (this.localStream != null) {
        this.localStream.getAudioTracks().forEach(track => track.enabled = false);
      } else {
        this.callbackError("NoActiveConnection");
      }
    }

    /**
     * Called by User
     * to unmute local audio streaming
     *
     * if there is audio it calls callbackError with "AudioAlreadyActive" parameter
     */
    unmuteLocalMic() {
      this.isMuted = false;
      if (this.mediaConstraints.audio == "dummy") {
        //make audio true if it is "dummy"
        var tempMediaConstraints = {
          video: this.mediaConstraints.video,
          audio: this.mediaConstraints.audio == "dummy" ? true : this.mediaConstraints.audio
        };
        return this.navigatorUserMedia(tempMediaConstraints, stream => {
          this.updateAudioTrack(stream, this.publishStreamId, null);
        }, false);
      }
      if (this.localStream != null) {
        this.localStream.getAudioTracks().forEach(track => track.enabled = true);
      } else {
        this.callbackError("NoActiveConnection");
      }
    }

    /**
     * If we have multiple video tracks in coming versions, this method may cause some issues
     */
    getVideoSender(streamId) {
      var videoSender = null;
      if (typeof adapter !== "undefined" && adapter !== null && (adapter.browserDetails.browser === 'chrome' || adapter.browserDetails.browser === 'firefox' || adapter.browserDetails.browser === 'safari' && adapter.browserDetails.version >= 64) && 'RTCRtpSender' in window && 'setParameters' in window.RTCRtpSender.prototype) {
        videoSender = this.getSender(streamId, "video");
      }
      return videoSender;
    }

    /**
     * Called by User
     * to set maximum video bandwidth is in kbps
     */
    changeBandwidth(bandwidth, streamId) {
      var errorDefinition = "";
      var videoSender = this.getVideoSender(streamId);
      if (videoSender != null) {
        var parameters = videoSender.getParameters();
        if (!parameters.encodings) {
          parameters.encodings = [{}];
        }
        if (bandwidth === 'unlimited') {
          delete parameters.encodings[0].maxBitrate;
        } else {
          parameters.encodings[0].maxBitrate = bandwidth * 1000;
        }
        return videoSender.setParameters(parameters);
      } else {
        errorDefinition = "Video sender not found to change bandwidth. Streaming may not be active";
      }
      return Promise.reject(errorDefinition);
    }
    /**
     * Called by user
     * sets the volume level
     *
     * @param {*} volumeLevel : Any number between 0 and 1.
     */
    setVolumeLevel(volumeLevel) {
      this.currentVolume = volumeLevel;
      if (this.primaryAudioTrackGainNode != null) {
        this.primaryAudioTrackGainNode.gain.value = volumeLevel;
      }
      if (this.secondaryAudioTrackGainNode != null) {
        this.secondaryAudioTrackGainNode.gain.value = volumeLevel;
      }
    }

    /**
     * Called by user
     * To create a sound meter for the local stream
     *
     * @param {Function} levelCallback : callback to provide the audio level to user
     * @param {*} period : measurement period
     */
    enableAudioLevelForLocalStream(levelCallback) {
      this.levelCallback = levelCallback;
      this.disableAudioLevelForLocalStream();
      this.localStreamSoundMeter = new SoundMeter(this.audioContext, this.volumeMeterUrl);
      if (this.audioContext.state !== 'running') {
        return this.audioContext.resume().then(() => {
          return this.localStreamSoundMeter.connectToSource(this.localStream, levelCallback);
        });
      } else {
        return this.localStreamSoundMeter.connectToSource(this.localStream, levelCallback);
      }
    }
    disableAudioLevelForLocalStream() {
      if (this.localStreamSoundMeter != null) {
        this.localStreamSoundMeter.stop();
        this.localStreamSoundMeter = null;
      }
    }

    /**
     * Called by user
     * To change audio/video constraints on the fly
     *
     */
    applyConstraints(newConstraints) {
      var constraints = {};
      if (newConstraints.audio === undefined && newConstraints.video === undefined) {
        //if audio or video field is not defined, assume that it's a video constraint
        constraints.video = newConstraints;
        this.mediaConstraints.video = Object.assign({}, this.mediaConstraints.video, constraints.video);
      } else if (newConstraints.video !== undefined) {
        constraints.video = newConstraints.video;
        this.mediaConstraints.video = Object.assign({}, this.mediaConstraints.video, constraints.video);
      }
      if (newConstraints.audio !== undefined) {
        constraints.audio = newConstraints.audio;
        this.mediaConstraints.audio = Object.assign({}, this.mediaConstraints.audio, constraints.audio);
      }
      var promise = null;
      if (constraints.video !== undefined) {
        if (this.localStream && this.localStream.getVideoTracks().length > 0) {
          var videoTrack = this.localStream.getVideoTracks()[0];
          promise = videoTrack.applyConstraints(this.mediaConstraints.video);
        } else {
          promise = new Promise((resolve, reject) => {
            reject("There is no video track to apply constraints");
          });
        }
      }
      if (constraints.audio !== undefined) {
        //just give the audio constraints not to get video stream
        //we dont call applyContrains for audio because it does not work. I think this is due to gainStream things. This is why we call getUserMedia again

        //use the publishStreamId because we don't have streamId in the parameter anymore
        promise = this.setAudioInputSource(this.publishStreamId, {
          audio: this.mediaConstraints.audio
        }, null);
      }
      if (this.localStreamSoundMeter != null) {
        this.enableAudioLevelForLocalStream(this.levelCallback);
      }
      return promise;
    }
  }

  var Logger$1 = window.log;

  /**
   * This structure is used to handle large size data channel messages (like image)
   * which should be splitted into chunks while sending and receiving.
   *
   */
  class ReceivingMessage {
    /**
     *
     * @param {number} size
     */
    constructor(size) {
      this.size = size;
      this.received = 0;
      this.data = new ArrayBuffer(size);
    }
  }

  /**
   * WebRTCAdaptor Class is interface to the JS SDK of Ant Media Server (AMS). This class manages the signalling,
   * keeps the states of peers.
   *
   * This class is used for peer-to-peer signalling,
   * publisher and player signalling and conference.
   *
   * Also it is responsible for some room management in conference case.
   *
   * There are different use cases in AMS. This class is used for all of them.
   *
   * WebRTC Publish
   * WebRTC Play
   * WebRTC Data Channel Connection
   * WebRTC Conference
   * WebRTC Multitrack Play
   * WebRTC Multitrack Conference
   * WebRTC peer-to-peer session
   *
   */
  class WebRTCAdaptor {
    /**
     * Register plugins to the WebRTCAdaptor
     * @param {Function} plugin
     */
    static register(pluginInitMethod) {
      WebRTCAdaptor.pluginInitMethods.push(pluginInitMethod);
    }
    /**
     *
     * @param {object} initialValues
     */
    constructor(initialValues) {
      /**
       * PeerConnection configuration while initializing the PeerConnection.
       * https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#parameters
       *
       * More than one STURN and/or TURN servers can be added.  Here is a typical turn server configuration
       *
       *    {
       * 	  urls: "",
       *	  username: "",
       *    credential: "",
       *	}
       *
       *  Default value is the google stun server
       */
      this.peerconnection_config = {
        'iceServers': [{
          'urls': 'stun:stun1.l.google.com:19302'
        }],
        sdpSemantics: 'unified-plan'
      };

      /**
       * Used while creating SDP (answer or offer)
       * https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer#parameters
       */
      this.sdp_constraints = {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: false
      };

      /**
       * This keeps the PeerConnections for each stream id.
       * It is an array because one @WebRTCAdaptor instance can manage multiple WebRTC connections as in the conference.
       * Its indices are the Stream Ids of each stream
       */
      this.remotePeerConnection = new Array();

      /**
       * This keeps statistics for the each PeerConnection.
       * It is an array because one @WebRTCAdaptor instance can manage multiple WebRTC connections as in the conference.
       * Its indices are the Stream Ids of each stream
       */
      this.remotePeerConnectionStats = new Array();

      /**
       * This keeps the Remote Description (SDP) set status for each PeerConnection.
       * We need to keep this status because sometimes ice candidates from the remote peer
       * may come before the Remote Description (SDP). So we need to store those ice candidates
       * in @iceCandidateList field until we get and set the Remote Description.
       * Otherwise setting ice candidates before Remote description may cause problem.
       */
      this.remoteDescriptionSet = new Array();

      /**
       * This keeps the Ice Candidates which are received before the Remote Description (SDP) received.
       * For details please check @remoteDescriptionSet field.
       */
      this.iceCandidateList = new Array();

      /**
       * This is the name for the room that is desired to join in conference mode.
       */
      this.roomName = null;

      /**
       * This keeps StreamIds for the each playing session.
       * It is an array because one @WebRTCAdaptor instance can manage multiple playing sessions.
       */
      this.playStreamId = new Array();

      /**
       * This is the flag indicates if multiple peers will join a peer in the peer to peer mode.
       * This is used only with Embedded SDk
       */
      this.isMultiPeer = false;

      /**
       * This is the stream id that multiple peers can join a peer in the peer to peer mode.
       * This is used only with Embedded SDk
       */
      this.multiPeerStreamId = null;

      /**
       * This is instance of @WebSocketAdaptor and manages to websocket connection.
       * All signalling messages are sent to/recived from
       * the Ant Media Server over this web socket connection
       */
      this.webSocketAdaptor = null;

      /**
       * This flags indicates if this @WebRTCAdaptor instance is used only for playing session(s)
       * You don't need camera/mic access in play mode
       */
      this.isPlayMode = false;

      /**
       * This flags enables/disables debug logging
       */
      this.debug = false;

      /**
       * This is the Stream Id for the publisher. One @WebRCTCAdaptor supports only one publishing
       * session for now (23.02.2022).
       * In conference mode you can join a room with null stream id. In that case
       * Ant Media Server generates a stream id and provides it JoinedTheRoom callback and it is set to this field.
       */
      this.publishStreamId = null;

      /**
       * This is used to keep stream id and track id (which is provided in SDP) mapping
       * in MultiTrack Playback and conference.
       */
      this.idMapping = new Array();

      /**
       * This is used when only data is brodcasted with the same way video and/or audio.
       * The difference is that no video or audio is sent when this field is true
       */
      this.onlyDataChannel = false;

      /**
       * While publishing and playing streams data channel is enabled by default
       */
      this.dataChannelEnabled = true;

      /**
       * This is array of @ReceivingMessage
       * When you receive multiple large size messages @ReceivingMessage simultaneously
       * this map is used to indicate them with its index tokens.
       */
      this.receivingMessages = new Map();

      /**
       * Supported candidate types. Below types are for both sending and receiving candidates.
       * It means if when client receives candidate from STUN server, it sends to the server if candidate's protocol
       * is in the list. Likely, when client receives remote candidate from server, it adds as ice candidate
       * if candidate protocol is in the list below.
       */
      this.candidateTypes = ["udp", "tcp"];

      /**
       * Method to call when there is an event happened
       */
      this.callback = null;

      /**
       * Method to call when there is an error happened
       */
      this.callbackError = null;

      /**
       * Flag to indicate if the stream is published or not after the connection fails
       */
      this.reconnectIfRequiredFlag = true;

      /**
       * websocket url to connect
       * @deprecated use websocketURL
       */
      this.websocket_url = null;

      /**
       * Websocket URL
       */
      this.websocketURL = null;

      /**
       * HTTP Endpoint URL is the endpoint that returns the websocket URL
      	 */
      this.httpEndpointUrl = null;

      /**
       * flag to initialize components in constructor
       */
      this.initializeComponents = true;

      /**
       * Degradation Preference
       * 
       * maintain-framerate, maintain-resolution, or balanced
       */
      this.degradationPreference = "maintain-resolution";

      /**
       * PAY ATTENTION: The values of the above fields are provided as this constructor parameter.
       * TODO: Also some other hidden parameters may be passed here
       */
      for (var key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          this[key] = initialValues[key];
        }
      }
      if (this.websocketURL == null) {
        this.websocketURL = this.websocket_url;
      }
      if (this.websocketURL == null && this.httpEndpointUrl == null) {
        throw new Error("WebSocket URL or HTTP Endpoint URL should be defined. It's mandatory");
      }
      /**
       * The html video tag for receiver is got here
       */
      this.remoteVideo = this.remoteVideoElement || document.getElementById(this.remoteVideoId);

      /**
       * Keeps the sound meters for each connection. Its index is stream id
       */
      this.soundMeters = new Array();

      /**
       * Keeps the current audio level for each playing streams in conference mode
       */
      this.soundLevelList = new Array();

      /**
       * This is the event listeners that WebRTC Adaptor calls when there is a new event happened
       */
      this.eventListeners = new Array();

      /**
       * This is the error event listeners that WebRTC Adaptor calls when there is an error happened
       */
      this.errorEventListeners = new Array();

      /**
       * This is token that is being used to publish the stream. It's added here to use in reconnect scenario
       */
      this.publishToken = null;

      /**
       * subscriber id that is being used to publish the stream. It's added here to use in reconnect scenario
       */
      this.publishSubscriberId = null;

      /**
       * subscriber code that is being used to publish the stream. It's added here to use in reconnect scenario
       */
      this.publishSubscriberCode = null;

      /**
       * This is the stream name that is being published. It's added here to use in reconnect scenario
       */
      this.publishStreamName = null;

      /**
       * This is the stream id of the main track that the current publishStreamId is going to be subtrack of it. It's added here to use in reconnect scenario
       */
      this.publishMainTrack = null;

      /**
       * This is the metadata that is being used to publish the stream. It's added here to use in reconnect scenario
       */
      this.publishMetaData = null;

      /**
       * This is the role for selective subtrack playback. It's added here to use in reconnect scenario
       */
      this.publishRole = null;

      /**
       * This is the token to play the stream. It's added here to use in reconnect scenario
       */
      this.playToken = null;

      /**
       * This is the room id to play the stream. It's added here to use in reconnect scenario
       * This approach is old conferencing. It's better to use multi track conferencing
       */
      this.playRoomId = null;

      /**
       * These are enabled tracks to play the stream. It's added here to use in reconnect scenario
       */
      this.playEnableTracks = null;

      /**
       * This is the subscriber Id to play the stream. It's added here to use in reconnect scenario
       */
      this.playSubscriberId = null;

      /**
       * This is the subscriber code to play the stream. It's added here to use in reconnect scenario
       */
      this.playSubscriberCode = null;

      /**
       * This is the meta data to play the stream. It's added here to use in reconnect scenario
       */
      this.playMetaData = null;

      /**
       * This is the role for selective subtrack playback. It's added here to use in reconnect scenario
       */
      this.playRole = null;

      /**
       * This is the time info for the last reconnection attempt
       */
      this.lastReconnectiontionTrialTime = 0;

      /**
       * TimerId for the pending try again call
       */
      this.pendingTryAgainTimerId = -1;

      /**
       * Flag to indicate if peerconnection_config was provided by the user
       */
      this.userDefinedIceServers = false;
      if (initialValues && initialValues.peerconnection_config && initialValues.peerconnection_config.iceServers) {
        this.userDefinedIceServers = true;
      }

      /**
       * All media management works for teh local stream are made by @MediaManager class.
       * for details please check @MediaManager
       */
      this.mediaManager = new MediaManager({
        userParameters: initialValues,
        webRTCAdaptor: this,
        callback: (info, obj) => {
          this.notifyEventListeners(info, obj);
        },
        callbackError: (error, message) => {
          this.notifyErrorEventListeners(error, message);
        },
        getSender: (streamId, type) => {
          return this.getSender(streamId, type);
        }
      });

      //Initialize the local stream (if needed) and web socket connection
      if (this.initializeComponents) {
        this.initialize();
      }
    }

    /**
     * Init plugins
     */
    initPlugins() {
      WebRTCAdaptor.pluginInitMethods.forEach(initMethod => {
        initMethod(this);
      });
    }

    /**
     * Add event listener to be notified. This is generally for plugins
     * @param {*} listener
     */
    addEventListener(listener) {
      this.eventListeners.push(listener);
    }

    /**
     * Add error event listener to be notified. Thisis generally for plugins
     * @param {*} errorListener
     */
    addErrorEventListener(errorListener) {
      this.errorEventListeners.push(errorListener);
    }

    /**
     * Notify event listeners and callback method
     * @param {*} info
     * @param {*} obj
     */
    notifyEventListeners(info, obj) {
      this.eventListeners.forEach(listener => {
        listener(info, obj);
      });
      if (this.callback != null) {
        this.callback(info, obj);
      }
    }

    /**
     * Notify error event listeners and callbackError method
     * @param {*} error
     * @param {*} message
     */
    notifyErrorEventListeners(error, message) {
      this.errorEventListeners.forEach(listener => {
        listener(error, message);
      });
      if (this.callbackError != null) {
        this.callbackError(error, message);
      }
    }

    /**
     * Called by constuctor to
     *    -check local stream unless it is in play mode
     *    -start websocket connection
     */
    initialize() {
      if (!this.isPlayMode && !this.onlyDataChannel && this.mediaManager.localStream == null) {
        //we need local stream because it not a play mode
        return this.mediaManager.initLocalStream().then(() => {
          this.initPlugins();
          this.checkWebSocketConnection();
          return new Promise((resolve, reject) => {
            resolve("Wait 'initialized' callback from websocket");
          });
        }).catch(error => {
          Logger$1.warn(error);
          throw error;
        });
      }
      return new Promise((resolve, reject) => {
        this.initPlugins();
        this.checkWebSocketConnection();
        resolve("Wait 'initialized' callback from websocket");
      });
    }

    /**
     * Called to get the ICE server configuration from the server
     * if user hasn't provided any ICE servers in initialization
     */
    getIceServerConfiguration() {
      if (!this.userDefinedIceServers) {
        var jsCmd = {
          command: "getIceServerConfig"
        };
        this.webSocketAdaptor.send(JSON.stringify(jsCmd));
      }
    }

    /**
     * Called to start a new WebRTC stream. AMS responds with start message.
     * Parameters:
     *  @param {string} streamId : unique id for the stream
     *  @param {string=} [token] : required if any stream security (token control) enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Stream-Security-Documentation
     *  @param {string=} [subscriberId] : required if TOTP enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Time-based-One-Time-Password-(TOTP)
     *  @param {string=} [subscriberCode] : required if TOTP enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Time-based-One-Time-Password-(TOTP)
     *  @param {string=} [streamName] : required if you want to set a name for the stream
     *  @param {string=} [mainTrack] :  required if you want to start the stream as a subtrack for a main stream which has id of this parameter.
     *                Check:https://antmedia.io/antmediaserver-webrtc-multitrack-playing-feature/
     *                !!! for multitrack conference set this value with roomName
     *  @param {string=} [metaData] : a free text information for the stream to AMS. It is provided to Rest methods by the AMS
     *  @param {string=} [role] : role for the stream. It is used for selective forwarding of subtracks in conference mode.
     */
    publish(streamId, token, subscriberId, subscriberCode, streamName, mainTrack, metaData, role) {
      //TODO: should refactor the repeated code
      this.publishStreamId = streamId;
      this.mediaManager.publishStreamId = streamId;
      this.publishToken = token;
      this.publishSubscriberId = subscriberId;
      this.publishSubscriberCode = subscriberCode;
      this.publishStreamName = streamName;
      this.publishMainTrack = mainTrack;
      this.publishMetaData = metaData;
      this.publishRole = role;
      if (this.onlyDataChannel) {
        this.sendPublishCommand(streamId, token, subscriberId, subscriberCode, streamName, mainTrack, metaData, role, false, false);
      }
      //If it started with playOnly mode and wants to publish now
      else if (this.mediaManager.localStream == null) {
        this.mediaManager.initLocalStream().then(() => {
          var videoEnabled = false;
          var audioEnabled = false;
          if (this.mediaManager.localStream != null) {
            videoEnabled = this.mediaManager.localStream.getVideoTracks().length > 0;
            audioEnabled = this.mediaManager.localStream.getAudioTracks().length > 0;
          }
          this.sendPublishCommand(streamId, token, subscriberId, subscriberCode, streamName, mainTrack, metaData, role, videoEnabled, audioEnabled);
        }).catch(error => {
          Logger$1.warn(error);
          throw error;
        });
      } else {
        var videoEnabled = this.mediaManager.localStream.getVideoTracks().length > 0;
        var audioEnabled = this.mediaManager.localStream.getAudioTracks().length > 0;
        this.sendPublishCommand(streamId, token, subscriberId, subscriberCode, streamName, mainTrack, metaData, role, videoEnabled, audioEnabled);
      }
      //init peer connection for reconnectIfRequired
      this.initPeerConnection(streamId, "publish");
      this.reconnectIfRequired(3000, false);
    }
    sendPublishCommand(streamId, token, subscriberId, subscriberCode, streamName, mainTrack, metaData, role, videoEnabled, audioEnabled) {
      var jsCmd = {
        command: "publish",
        streamId: streamId,
        token: token,
        subscriberId: typeof subscriberId !== undefined && subscriberId != null ? subscriberId : "",
        subscriberCode: typeof subscriberCode !== undefined && subscriberCode != null ? subscriberCode : "",
        streamName: typeof streamName !== undefined && streamName != null ? streamName : "",
        mainTrack: typeof mainTrack !== undefined && mainTrack != null ? mainTrack : "",
        video: videoEnabled,
        audio: audioEnabled,
        metaData: typeof metaData !== undefined && metaData != null ? metaData : "",
        role: typeof role !== undefined && role != null ? role : ""
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to join a room. AMS responds with joinedTheRoom message.
     * Parameters:
     * @param {string} roomName : unique id of the room
     * @param {string=} streamId : unique id of the stream belongs to this participant
     * @param {string=} mode :    legacy for older implementation (default value)
     *            mcu for merging streams
     *            amcu: audio only conferences with mixed audio
     * @param {string=} streamName : name of the stream
     * @param {string=} role : role for the stream. It is used for selective forwarding of subtracks in conference mode.
     * @param {string=} metadata : a free text information for the stream to AMS.
     */
    joinRoom(roomName, streamId, mode, streamName, role, metadata) {
      this.roomName = roomName;
      var jsCmd = {
        command: "joinRoom",
        room: roomName,
        mainTrack: roomName,
        streamId: streamId,
        mode: mode,
        streamName: streamName,
        role: role,
        metadata: metadata
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to start a playing session for a stream. AMS responds with start message.
     * Parameters:
     *  @param {streamParameters} includes:
     *    {string} streamId :(string) unique id for the stream that you want to play
     *    {string=} token :(string) required if any stream security (token control) enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Stream-Security-Documentation
     *    {string=} roomId :(string) required if this stream is belonging to a room participant
     *    {Array.<MediaStreamTrack>=} enableTracks :(array) required if the stream is a main stream of multitrack playing. You can pass the the subtrack id list that you want to play.
     *                    you can also provide a track id that you don't want to play by adding ! before the id.
     *    {string=} subscriberId :(string) required if TOTP enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Time-based-One-Time-Password-(TOTP)
     *    {string=} subscriberName :(string) human readable name for subscriber
     *    {string=} subscriberCode :(string) required if TOTP enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Time-based-One-Time-Password-(TOTP)
     *    {string=} metaData :(string, json) a free text information for the stream to AMS. It is provided to Rest methods by the AMS
     *    {string=} [role] : role for the stream. It is used for selective forwarding of subtracks in conference mode.
     *    {string=} [disableTracksByDefault] : disables tracks by default
     */
    playStream(streamParameters) {
      this.playStreamId.push(streamParameters.streamId);
      this.playToken = streamParameters.token;
      this.playRoomId = streamParameters.roomId;
      this.playEnableTracks = streamParameters.enableTracks;
      this.playSubscriberId = streamParameters.subscriberId;
      this.playSubscriberName = streamParameters.subscriberName;
      this.playSubscriberCode = streamParameters.subscriberCode;
      this.playMetaData = streamParameters.metaData;
      this.playRole = streamParameters.role;
      this.disableTracksByDefault = streamParameters.disableTracksByDefault;
      var jsCmd = {
        command: "play",
        streamId: streamParameters.streamId,
        token: typeof streamParameters.token !== undefined && streamParameters.token != null ? streamParameters.token : "",
        room: typeof streamParameters.roomId !== undefined && streamParameters.roomId != null ? streamParameters.roomId : "",
        trackList: typeof streamParameters.enableTracks !== undefined && streamParameters.enableTracks != null ? streamParameters.enableTracks : [],
        subscriberId: typeof streamParameters.subscriberId !== undefined && streamParameters.subscriberId != null ? streamParameters.subscriberId : "",
        subscriberName: typeof streamParameters.subscriberName !== undefined && streamParameters.subscriberName != null ? streamParameters.subscriberName : "",
        subscriberCode: typeof streamParameters.subscriberCode !== undefined && streamParameters.subscriberId != null ? streamParameters.subscriberCode : "",
        viewerInfo: typeof streamParameters.metaData !== undefined && streamParameters.metaData != null ? streamParameters.metaData : "",
        role: typeof streamParameters.role !== undefined && streamParameters.role != null ? streamParameters.role : "",
        userPublishId: typeof this.publishStreamId !== undefined && this.publishStreamId != null ? this.publishStreamId : "",
        disableTracksByDefault: typeof streamParameters.disableTracksByDefault !== undefined && streamParameters.disableTracksByDefault != null ? streamParameters.disableTracksByDefault : false
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));

      //init peer connection for reconnectIfRequired
      this.initPeerConnection(streamParameters.streamId, streamParameters);
      this.reconnectIfRequired(3000, false);
    }

    /**
     * Called to start a playing session for a stream. AMS responds with start message.
     * Parameters:
     *  @param {string} streamId :(string) unique id for the stream that you want to play
     *  @param {string=} token :(string) required if any stream security (token control) enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Stream-Security-Documentation
     *  @param {string=} roomId :(string) required if this stream is belonging to a room participant
     *  @param {Array.<MediaStreamTrack>=} enableTracks :(array) required if the stream is a main stream of multitrack playing. You can pass the the subtrack id list that you want to play.
     *                    you can also provide a track id that you don't want to play by adding ! before the id.
     *  @param {string=} subscriberId :(string) required if TOTP enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Time-based-One-Time-Password-(TOTP)
     *  @param {string=} subscriberCode :(string) required if TOTP enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Time-based-One-Time-Password-(TOTP)
     *  @param {string=} metaData :(string, json) a free text information for the stream to AMS. It is provided to Rest methods by the AMS
     *  @param {string=} [role] : role for the stream. It is used for selective forwarding of subtracks in conference mode.
     */
    play(streamId, token, roomId, enableTracks, subscriberId, subscriberCode, metaData, role) {
      if (typeof streamId === 'object') {
        // Object-style: play({ streamId, token, ... })
        this.playStream(streamId);
        return;
      }
      this.playStreamId.push(streamId);
      this.playToken = token;
      this.playRoomId = roomId;
      this.playEnableTracks = enableTracks;
      this.playSubscriberId = subscriberId;
      this.playSubscriberCode = subscriberCode;
      this.playMetaData = metaData;
      this.playRole = role;
      var jsCmd = {
        command: "play",
        streamId: streamId,
        token: typeof token !== undefined && token != null ? token : "",
        room: typeof roomId !== undefined && roomId != null ? roomId : "",
        trackList: typeof enableTracks !== undefined && enableTracks != null ? enableTracks : [],
        subscriberId: typeof subscriberId !== undefined && subscriberId != null ? subscriberId : "",
        subscriberCode: typeof subscriberCode !== undefined && subscriberId != null ? subscriberCode : "",
        viewerInfo: typeof metaData !== undefined && metaData != null ? metaData : "",
        role: typeof role !== undefined && role != null ? role : "",
        userPublishId: typeof this.publishStreamId !== undefined && this.publishStreamId != null ? this.publishStreamId : ""
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));

      //init peer connection for reconnectIfRequired
      this.initPeerConnection(streamId, "play");
      this.reconnectIfRequired(3000, false);
    }

    /**
     * Reconnects to the stream if it is not stopped on purpose
     * @param {number} [delayMs]
     * @returns
     */
    reconnectIfRequired() {
      var delayMs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
      var forceReconnect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.reconnectIfRequiredFlag) {
        if (delayMs <= 0) {
          delayMs = 500;
          //clear the timer because there is a demand to reconnect without delay
          clearTimeout(this.pendingTryAgainTimerId);
          this.pendingTryAgainTimerId = -1;
        }
        if (this.pendingTryAgainTimerId == -1) {
          this.pendingTryAgainTimerId = setTimeout(() => {
            this.pendingTryAgainTimerId = -1;
            this.tryAgain(forceReconnect);
          }, delayMs);
        }
      }
    }
    tryAgain(forceReconnect) {
      var _this = this;
      var now = Date.now();
      //to prevent too many trial from different paths
      var timeDiff = now - this.lastReconnectiontionTrialTime;
      if (timeDiff < 3000 && forceReconnect == false) {
        //check again 1 seconds later if it is not stopped on purpose
        Logger$1.debug("Reconnection request received after " + timeDiff + " ms. It should be at least 3000ms. It will try again after 1000ms");
        this.reconnectIfRequired(1000, forceReconnect);
        return;
      }
      this.lastReconnectiontionTrialTime = now;

      //reconnect publish
      //if remotePeerConnection has a peer connection for the stream id, it means that it is not stopped on purpose

      if (this.remotePeerConnection[this.publishStreamId] != null && (forceReconnect ||
      //check connection status to not stop streaming an active stream 
      ["checking", "connected", "completed"].indexOf(this.iceConnectionState(this.publishStreamId)) === -1)) {
        // notify that reconnection process started for publish
        this.notifyEventListeners("reconnection_attempt_for_publisher", this.publishStreamId);
        this.stop(this.publishStreamId);
        setTimeout(() => {
          //publish about some time later because server may not drop the connection yet 
          //it may trigger already publishing error 
          Logger$1.log("Trying publish again for stream: " + this.publishStreamId);
          this.publish(this.publishStreamId, this.publishToken, this.publishSubscriberId, this.publishSubscriberCode, this.publishStreamName, this.publishMainTrack, this.publishMetaData, this.publishRole);
        }, 500);
      }

      //reconnect play
      var _loop = function _loop() {
        var streamId = _this.playStreamId[index];
        if (_this.remotePeerConnection[streamId] != null && (forceReconnect ||
        //check connection status to not stop streaming an active stream
        ["checking", "connected", "completed"].indexOf(_this.iceConnectionState(streamId)) === -1)) {
          // notify that reconnection process started for play
          _this.notifyEventListeners("reconnection_attempt_for_player", streamId);
          Logger$1.log("It will try to play again for stream: " + streamId + " because it is not stopped on purpose");
          _this.stop(streamId);
          setTimeout(() => {
            //play about some time later because server may not drop the connection yet 
            //it may trigger already playing error 
            Logger$1.log("Trying play again for stream: " + streamId);
            _this.play(streamId, _this.playToken, _this.playRoomId, _this.playEnableTracks, _this.playSubscriberId, _this.playSubscriberCode, _this.playMetaData, _this.playRole);
          }, 500);
        }
      };
      for (var index in this.playStreamId) {
        _loop();
      }
    }

    /**
     * Called to stop a publishing/playing session for a stream. AMS responds with publishFinished or playFinished message.
     * Parameters:
     *  @param {string} streamId : unique id for the stream that you want to stop publishing or playing
     */
    stop(streamId) {
      //stop is called on purpose and it deletes the peer connection from remotePeerConnections
      this.closePeerConnection(streamId);
      if (this.webSocketAdaptor != null && this.webSocketAdaptor.isConnected()) {
        var jsCmd = {
          command: "stop",
          streamId: streamId
        };
        this.webSocketAdaptor.send(JSON.stringify(jsCmd));
      }
    }

    /**
     * Called to join a peer-to-peer mode session as peer. AMS responds with joined message.
     * Parameters:
     * @param {string} streamId : unique id for the peer-to-peer session
     */
    join(streamId) {
      var jsCmd = {
        command: "join",
        streamId: streamId,
        multiPeer: this.isMultiPeer && this.multiPeerStreamId == null,
        mode: this.isPlayMode ? "play" : "both"
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called by browser when a new track is added to WebRTC connetion. This is used to infor html pages with newStreamAvailable callback.
     * Parameters:
     * 	 event: TODO
     * 	 streamId: unique id for the stream
     */
    onTrack(event, streamId) {
      Logger$1.debug("onTrack for stream");
      if (this.remoteVideo != null) {
        if (this.remoteVideo.srcObject !== event.streams[0]) {
          this.remoteVideo.srcObject = event.streams[0];
          Logger$1.debug('Received remote stream');
        }
      } else {
        var dataObj = {
          stream: event.streams[0],
          track: event.track,
          streamId: streamId,
          trackId: this.idMapping[streamId][event.transceiver.mid]
        };
        this.notifyEventListeners("newTrackAvailable", dataObj);

        //deprecated. Listen newTrackAvailable in callback. It's kept for backward compatibility
        this.notifyEventListeners("newStreamAvailable", dataObj);
      }
    }

    /**
     * Called to leave from a conference room. AMS responds with leavedTheRoom message.
     * Parameters:
     * @param {string} roomName : unique id for the conference room
     * @param {string=} streamId : unique id for the stream that is streamed by this @WebRTCAdaptor
     */
    leaveFromRoom(roomName, streamId) {
      for (var key in this.remotePeerConnection) {
        this.closePeerConnection(key);
      }
      this.roomName = roomName;
      var jsCmd = {
        command: "leaveFromRoom",
        room: roomName,
        mainTrack: roomName,
        streamId: streamId
      };
      Logger$1.debug("leave request is sent for " + roomName);
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to leave from a peer-to-peer mode session. AMS responds with leaved message.
     * Parameters:
     * @param {string} streamId : unique id for the peer-to-peer session
     */
    leave(streamId) {
      var jsCmd = {
        command: "leave",
        streamId: this.isMultiPeer && this.multiPeerStreamId != null ? this.multiPeerStreamId : streamId
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
      this.closePeerConnection(streamId);
      this.multiPeerStreamId = null;
    }

    /**
     * Called to get a stream information for a specific stream. AMS responds with streamInformation message.
     * Parameters:
     * @param {string} streamId : unique id for the stream that you want to get info about
     */
    getStreamInfo(streamId) {
      var jsCmd = {
        command: "getStreamInfo",
        streamId: streamId
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to get the list of video track assignments. AMS responds with the videoTrackAssignmentList message.
     * Parameters:
     * @param {string} streamId : unique id for the stream that you want to get info about
     */
    requestVideoTrackAssignments(streamId) {
      var jsCmd = {
        command: "getVideoTrackAssignmentsCommand",
        streamId: streamId
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to get the broadcast object for a specific stream. AMS responds with the broadcastObject callback.
     * Parameters:
     * @param {string} streamId : unique id for the stream that you want to get info about
     */
    getBroadcastObject(streamId) {
      var jsCmd = {
        command: "getBroadcastObject",
        streamId: streamId
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to update the meta information for a specific stream.
     * Parameters:
     * @param {string} streamId : unique id for the stream that you want to update MetaData
     * @param {string}  metaData : new free text information for the stream
     */
    updateStreamMetaData(streamId, metaData) {
      var jsCmd = {
        command: "updateStreamMetaData",
        streamId: streamId,
        metaData: metaData
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to get the room information for a specific room. AMS responds with roomInformation message
     * which includes the ids and names of the streams in that room.
     * If there is no active streams in the room, AMS returns error `no_active_streams_in_room` in error callback
     * Parameters:
     * @param {string} roomName : unique id for the room that you want to get info about
     * @param {string} streamId : unique id for the stream that is streamed by this @WebRTCAdaptor
     */
    getRoomInfo(roomName, streamId) {
      var jsCmd = {
        command: "getRoomInfo",
        streamId: streamId,
        room: roomName
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to get the subtracks for a specific maintrack. AMS responds with the subtrackList callback.
     * Parameters:
     * @param {string} streamId : main track id
     * @param {string} role : filter the subtracks with the role
     * @param {number} offset : offset for the subtrack list
     * @param {number} size : size for the subtrack list
     */
    getSubtracks(streamId, role, offset, size) {
      var jsCmd = {
        command: "getSubtracks",
        streamId: streamId,
        role: role,
        offset: offset,
        size: size
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to get the subtrack count for a specific maintrack. AMS responds with the subtrackCount callback.
     * @param {string} streamId : main track id
     * @param {string} role : filter the subtracks with the role
     * @param {string} status : filter the subtracks with the status
     */
    getSubtrackCount(streamId, role, status) {
      var jsCmd = {
        command: "getSubtracksCount",
        streamId: streamId,
        role: role,
        status: status
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to enable/disable data flow from the AMS for a specific track under a main track.
     * Parameters:
     * @param {string}  mainTrackId : unique id for the main stream
     * @param {string}  trackId : unique id for the track that you want to enable/disable data flow for
     * @param {boolean} enabled : true or false
     */
    enableTrack(mainTrackId, trackId, enabled) {
      var jsCmd = {
        command: "enableTrack",
        streamId: mainTrackId,
        trackId: trackId,
        enabled: enabled
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to get the track ids under a main stream. AMS responds with trackList message.
     * Parameters:
     * @param {string} streamId : unique id for the main stream
     * @param {string=} [token] : not used
     * TODO: check this function
     */
    getTracks(streamId, token) {
      this.playStreamId.push(streamId);
      var jsCmd = {
        command: "getTrackList",
        streamId: streamId,
        token: token
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called by WebSocketAdaptor when a new ice candidate is received from AMS.
     * Parameters:
     *     event: TODO
     *     streamId: unique id for the stream
     */
    iceCandidateReceived(event, streamId) {
      if (event.candidate) {
        var protocolSupported = false;
        if (event.candidate.candidate == "") {
          //event candidate can be received and its value can be "".
          //don't compare the protocols
          protocolSupported = true;
        } else if (typeof event.candidate.protocol == "undefined") {
          this.candidateTypes.forEach(element => {
            if (event.candidate.candidate.toLowerCase().includes(element)) {
              protocolSupported = true;
            }
          });
        } else {
          protocolSupported = this.candidateTypes.includes(event.candidate.protocol.toLowerCase());
        }
        if (protocolSupported) {
          var jsCmd = {
            command: "takeCandidate",
            streamId: streamId,
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate
          };
          if (this.debug) {
            Logger$1.debug("sending ice candiate for stream Id " + streamId);
            Logger$1.debug(JSON.stringify(event.candidate));
          }
          this.webSocketAdaptor.send(JSON.stringify(jsCmd));
        } else {
          Logger$1.debug("Candidate's protocol(full sdp: " + event.candidate.candidate + ") is not supported. Supported protocols: " + this.candidateTypes);
          if (event.candidate.candidate != "") {
            //
            this.notifyErrorEventListeners("protocol_not_supported", "Support protocols: " + this.candidateTypes.toString() + " candidate: " + event.candidate.candidate);
          }
        }
      } else {
        Logger$1.debug("No event.candidate in the iceCandidate event");
      }
    }

    /**
     * Called internally to sanitize the text if it contains script to prevent xss
     * @param text
     * @returns {*}
     */
    sanitizeHTML(text) {
      if (text.includes("script")) return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return text;
    }

    /**
     * Called internally to initiate Data Channel.
     * Note that Data Channel should be enabled fromAMS settings.
     *  @param {string}  streamId : unique id for the stream
     *  @param {*} dataChannel : provided by PeerConnection
     */
    initDataChannel(streamId, dataChannel) {
      dataChannel.onerror = error => {
        Logger$1.debug("Data Channel Error:", error);
        var obj = {
          streamId: streamId,
          error: error
        };
        Logger$1.debug("channel status: ", dataChannel.readyState);
        if (dataChannel.readyState != "closed") {
          this.notifyErrorEventListeners("data_channel_error", obj);
        }
      };
      dataChannel.onmessage = event => {
        var obj = {
          streamId: streamId,
          data: event.data
        };
        var data = obj.data;
        if (typeof data === 'string' || data instanceof String) {
          obj.data = this.sanitizeHTML(obj.data);
          this.notifyEventListeners("data_received", obj);
        } else {
          var length = data.length || data.size || data.byteLength;
          var view = new Int32Array(data, 0, 1);
          var token = view[0];
          var msg = this.receivingMessages[token];
          if (msg == undefined) {
            var view = new Int32Array(data, 0, 2);
            var size = view[1];
            msg = new ReceivingMessage(size);
            this.receivingMessages[token] = msg;
            if (length > 8) {
              Logger$1.debug("something went wrong in msg receiving");
            }
            return;
          }
          var rawData = data.slice(4, length);
          var dataView = new Uint8Array(msg.data);
          dataView.set(new Uint8Array(rawData), msg.received, length - 4);
          msg.received += length - 4;
          if (msg.size == msg.received) {
            obj.data = msg.data;
            this.notifyEventListeners("data_received", obj);
          }
        }
      };
      dataChannel.onopen = () => {
        this.remotePeerConnection[streamId].dataChannel = dataChannel;
        Logger$1.debug("Data channel is opened");
        this.notifyEventListeners("data_channel_opened", streamId);
      };
      dataChannel.onclose = () => {
        Logger$1.debug("Data channel is closed");
        this.notifyEventListeners("data_channel_closed", streamId);
      };
    }

    /**
     * Called internally to initiate PeerConnection.
     * @param {string} streamId : unique id for the stream
     * @param {string}  dataChannelMode : can be "publish" , "play" or "peer" based on this it is decided which way data channel is created
     */
    initPeerConnection(streamId, dataChannelMode) {
      //null == undefined -> it's true
      //null === undefined -> it's false

      if (this.remotePeerConnection[streamId] == null) {
        var closedStreamId = streamId;
        Logger$1.debug("stream id in init peer connection: " + streamId + " close stream id: " + closedStreamId);
        this.remotePeerConnection[streamId] = new RTCPeerConnection(this.peerconnection_config);
        this.remoteDescriptionSet[streamId] = false;
        this.iceCandidateList[streamId] = new Array();
        if (!this.playStreamId.includes(streamId)) {
          if (this.mediaManager.localStream != null) {
            this.mediaManager.localStream.getTracks().forEach(track => {
              var rtpSender = this.remotePeerConnection[streamId].addTrack(track, this.mediaManager.localStream);
              if (track.kind == 'video') {
                var parameters = rtpSender.getParameters();
                parameters.degradationPreference = this.degradationPreference;
                rtpSender.setParameters(parameters).then(() => {
                  Logger$1.info("Degradation Preference is set to " + this.degradationPreference);
                }).catch(err => {
                  Logger$1.warn("Degradation Preference cannot be set to " + this.degradationPreference);
                });
              }
              //
              //parameters.degradationPreference
            });
          }
        }

        this.remotePeerConnection[streamId].onicecandidate = event => {
          this.iceCandidateReceived(event, closedStreamId);
        };
        this.remotePeerConnection[streamId].ontrack = event => {
          this.onTrack(event, closedStreamId);
        };
        this.remotePeerConnection[streamId].onnegotiationneeded = event => {
          Logger$1.debug("onnegotiationneeded");
        };
        if (this.dataChannelEnabled) {
          // skip initializing data channel if it is disabled
          if (dataChannelMode == "publish") {
            //open data channel if it's publish mode peer connection
            var dataChannelOptions = {
              ordered: true
            };
            if (this.remotePeerConnection[streamId].createDataChannel) {
              var dataChannel = this.remotePeerConnection[streamId].createDataChannel(streamId, dataChannelOptions);
              this.initDataChannel(streamId, dataChannel);
            } else {
              Logger$1.warn("CreateDataChannel is not supported");
            }
          } else if (dataChannelMode == "play") {
            //in play mode, server opens the data channel
            this.remotePeerConnection[streamId].ondatachannel = ev => {
              this.initDataChannel(streamId, ev.channel);
            };
          } else {
            //for peer mode do both for now
            var _dataChannelOptions = {
              ordered: true
            };
            if (this.remotePeerConnection[streamId].createDataChannel) {
              var dataChannelPeer = this.remotePeerConnection[streamId].createDataChannel(streamId, _dataChannelOptions);
              this.initDataChannel(streamId, dataChannelPeer);
              this.remotePeerConnection[streamId].ondatachannel = ev => {
                this.initDataChannel(streamId, ev.channel);
              };
            } else {
              Logger$1.warn("CreateDataChannel is not supported");
            }
          }
        }
        this.remotePeerConnection[streamId].oniceconnectionstatechange = event => {
          var obj = {
            state: this.remotePeerConnection[streamId].iceConnectionState,
            streamId: streamId
          };
          this.oniceconnectionstatechangeCallback(obj);
        };
      }
      return this.remotePeerConnection[streamId];
    }
    oniceconnectionstatechangeCallback(obj) {
      Logger$1.debug("ice connection state is " + obj.state + " for streamId: " + obj.streamId);
      if (obj.state == "failed" || obj.state == "closed") {
        //try immediately
        Logger$1.debug("ice connection state is failed or closed for streamId: " + obj.streamId + " it will try to reconnect immediately");
        this.reconnectIfRequired(0, false);
      } else if (obj.state == "disconnected") {
        //check after 3 seconds because it may reconnect again
        this.reconnectIfRequired(3000, false);
      }
      this.notifyEventListeners("ice_connection_state_changed", obj);

      //
      if (!this.isPlayMode && !this.playStreamId.includes(obj.streamId)) {
        if (this.remotePeerConnection[obj.streamId] != null && this.remotePeerConnection[obj.streamId].iceConnectionState == "connected") {
          this.mediaManager.changeBandwidth(this.mediaManager.bandwidth, obj.streamId).then(() => {
            Logger$1.debug("Bandwidth is changed to " + this.mediaManager.bandwidth);
          }).catch(e => Logger$1.warn(e));
        }
      }
    }

    /**
     * Called internally to close PeerConnection.
     * @param {string} streamId : unique id for the stream
     */
    closePeerConnection(streamId) {
      var peerConnection = this.remotePeerConnection[streamId];
      if (peerConnection != null) {
        this.remotePeerConnection[streamId] = null;
        delete this.remotePeerConnection[streamId];
        if (peerConnection.dataChannel != null) {
          peerConnection.dataChannel.close();
        }
        if (peerConnection.signalingState != "closed") {
          peerConnection.close();
        }
        var playStreamIndex = this.playStreamId.indexOf(streamId);
        if (playStreamIndex != -1) {
          this.playStreamId.splice(playStreamIndex, 1);
        }
      }
      //this is for the stats
      if (this.remotePeerConnectionStats[streamId] != null) {
        clearInterval(this.remotePeerConnectionStats[streamId].timerId);
        delete this.remotePeerConnectionStats[streamId];
      }
      if (this.soundMeters[streamId] != null) {
        delete this.soundMeters[streamId];
      }
    }

    /**
     * Called to get the signalling state for a stream.
     * This information can be used for error handling.
     * Check: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/connectionState
     * @param {string} streamId : unique id for the stream
     */
    signallingState(streamId) {
      if (this.remotePeerConnection[streamId] != null) {
        return this.remotePeerConnection[streamId].signalingState;
      }
      return null;
    }

    /**
     * Called to get the ice connection state for a stream.
     * This information can be used for error handling.
     * Check: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState
     * @param {string} streamId : unique id for the stream
     */
    iceConnectionState(streamId) {
      if (this.remotePeerConnection[streamId] != null) {
        return this.remotePeerConnection[streamId].iceConnectionState;
      }
      return null;
    }

    /**
     * Called by browser when Local Configuration (SDP) is created successfully.
     * It is set as LocalDescription first then sent to AMS.
     * @param {object} configuration : created Local Configuration (SDP)
     * @param {string} streamId : unique id for the stream
     */
    gotDescription(configuration, streamId) {
      this.remotePeerConnection[streamId].setLocalDescription(configuration).then(responose => {
        Logger$1.debug("Set local description successfully for stream Id " + streamId);
        var jsCmd = {
          command: "takeConfiguration",
          streamId: streamId,
          type: configuration.type,
          sdp: configuration.sdp
        };
        Logger$1.debug("setLocalDescription:" + configuration.sdp);
        this.webSocketAdaptor.send(JSON.stringify(jsCmd));
      }).catch(error => {
        Logger$1.error("Cannot set local description. Error is: " + error);
      });
    }

    /**
     * Called by WebSocketAdaptor when Remote Configuration (SDP) is received from AMS.
     * It is set as RemoteDescription first then if @iceCandidateList has candidate that
     * is received bfore this message, it is added as ice candidate.
     * @param {object} configuration : received Remote Configuration (SDP)
     * @param {string} idOfStream : unique id for the stream
     * @param {string} typeOfConfiguration
     * @param {string} idMapping : stream id and track id (which is provided in SDP) mapping in MultiTrack Playback and conference.
     *                It is recorded to match stream id as new tracks are added with @onTrack
     */
    takeConfiguration(idOfStream, configuration, typeOfConfiguration, idMapping) {
      var streamId = idOfStream;
      var type = typeOfConfiguration;
      var conf = configuration;
      var isTypeOffer = type == "offer";
      var dataChannelMode = "publish";
      if (isTypeOffer) {
        dataChannelMode = "play";
      }
      this.idMapping[streamId] = idMapping;
      this.initPeerConnection(streamId, dataChannelMode);
      Logger$1.debug("setRemoteDescription:" + conf);
      this.remotePeerConnection[streamId].setRemoteDescription(new RTCSessionDescription({
        sdp: conf,
        type: type
      })).then(response => {
        if (this.debug) {
          Logger$1.debug("set remote description is succesfull with response: " + response + " for stream : " + streamId + " and type: " + type);
          Logger$1.debug(conf);
        }
        this.remoteDescriptionSet[streamId] = true;
        var length = this.iceCandidateList[streamId].length;
        Logger$1.debug("Ice candidate list size to be added: " + length);
        for (var i = 0; i < length; i++) {
          this.addIceCandidate(streamId, this.iceCandidateList[streamId][i]);
        }
        this.iceCandidateList[streamId] = [];
        if (isTypeOffer) {
          //SDP constraints may be different in play mode
          Logger$1.debug("try to create answer for stream id: " + streamId);
          this.remotePeerConnection[streamId].createAnswer(this.sdp_constraints).then(configuration => {
            Logger$1.debug("created answer for stream id: " + streamId);
            //support for stereo
            configuration.sdp = configuration.sdp.replace("useinbandfec=1", "useinbandfec=1; stereo=1");
            this.gotDescription(configuration, streamId);
          }).catch(error => {
            Logger$1.error("create answer error :" + error);
          });
        }
      }).catch(error => {
        if (this.debug) {
          Logger$1.error("set remote description is failed with error: " + error);
        }
        if (error.toString().indexOf("InvalidAccessError") > -1 || error.toString().indexOf("setRemoteDescription") > -1) {
          /**
           * This error generally occurs in codec incompatibility.
           * AMS for a now supports H.264 codec. This error happens when some browsers try to open it from VP8.
           */
          this.notifyErrorEventListeners("notSetRemoteDescription");
        }
      });
    }

    /**
     * Called by WebSocketAdaptor when new ice candidate is received from AMS.
     * If Remote Description (SDP) is already set, the candidate is added immediately,
     * otherwise stored in @iceCandidateList to add after Remote Description (SDP) set.
     * @param {string} idOfTheStream : unique id for the stream
     * @param {number|null} tmpLabel : sdpMLineIndex
     * @param {string} tmpCandidate : ice candidate
     */
    takeCandidate(idOfTheStream, tmpLabel, tmpCandidate) {
      var streamId = idOfTheStream;
      var label = tmpLabel;
      var candidateSdp = tmpCandidate;
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: label,
        candidate: candidateSdp
      });
      var dataChannelMode = "peer";
      this.initPeerConnection(streamId, dataChannelMode);
      Logger$1.debug("takeCandidate:" + candidateSdp);
      if (this.remoteDescriptionSet[streamId] == true) {
        this.addIceCandidate(streamId, candidate);
      } else {
        Logger$1.debug("Ice candidate is added to list because remote description is not set yet");
        this.iceCandidateList[streamId].push(candidate);
      }
    }
    /**
     * Called internally to add the Ice Candidate to PeerConnection
     *  @param {string} streamId : unique id for the stream
     *  @param {object} candidate : ice candidate
     */
    addIceCandidate(streamId, candidate) {
      var protocolSupported = false;
      if (candidate.candidate == "") {
        //candidate can be received and its value can be "".
        //don't compare the protocols
        protocolSupported = true;
      } else if (typeof candidate.protocol == "undefined") {
        this.candidateTypes.forEach(element => {
          if (candidate.candidate.toLowerCase().includes(element)) {
            protocolSupported = true;
          }
        });
      } else {
        protocolSupported = this.candidateTypes.includes(candidate.protocol.toLowerCase());
      }
      if (protocolSupported) {
        this.remotePeerConnection[streamId].addIceCandidate(candidate).then(response => {
          if (this.debug) {
            Logger$1.debug("Candidate is added for stream " + streamId);
          }
        }).catch(error => {
          Logger$1.error("ice candiate cannot be added for stream id: " + streamId + " error is: " + error);
          Logger$1.error(candidate);
        });
      } else {
        if (this.debug) {
          Logger$1.debug("Candidate's protocol(" + candidate.protocol + ") is not supported." + "Candidate: " + candidate.candidate + " Supported protocols:" + this.candidateTypes);
        }
      }
    }
    /**
     * Called by WebSocketAdaptor when start message is received //TODO: may be changed. this logic shouldn't be in WebSocketAdaptor
     * @param {string} idOfStream : unique id for the stream
     */
    startPublishing(idOfStream) {
      var streamId = idOfStream;
      var peerConnection = this.initPeerConnection(streamId, "publish");

      //this.remotePeerConnection[streamId]
      peerConnection.createOffer(this.sdp_constraints).then(configuration => {
        this.gotDescription(configuration, streamId);
      }).catch(error => {
        Logger$1.error("create offer error for stream id: " + streamId + " error: " + error);
      });
    }

    /**
     * Toggle video track on the server side.
     *
     * @param {string}  streamId : is the id of the stream
     * @param {string}  trackId : is the id of the track. streamId is also one of the trackId of the stream. If you are having just a single track on your
     *         stream, you need to give streamId as trackId parameter as well.
     * @param {boolean}  enabled : is the enable/disable video track. If it's true, server sends video track. If it's false, server does not send video
     */
    toggleVideo(streamId, trackId, enabled) {
      var jsCmd = {
        command: "toggleVideo",
        streamId: streamId,
        trackId: trackId,
        enabled: enabled
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Toggle audio track on the server side.
     *
     * @param {string} streamId : is the id of the stream
     * @param {string}  trackId : is the id of the track. streamId is also one of the trackId of the stream. If you are having just a single track on your
     *            stream, you need to give streamId as trackId parameter as well.
     * @param {boolean}  enabled : is the enable/disable video track. If it's true, server sends audio track. If it's false, server does not send audio
     *
     */
    toggleAudio(streamId, trackId, enabled) {
      var jsCmd = {
        command: "toggleAudio",
        streamId: streamId,
        trackId: trackId,
        enabled: enabled
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to get statistics for a PeerConnection. It can be publisher or player.
     *
     * @param {string} streamId : unique id for the stream
     */
    getStats(streamId) {
      Logger$1.debug("peerstatsgetstats = " + this.remotePeerConnectionStats[streamId]);
      return new Promise((resolve, reject) => {
        this.remotePeerConnection[streamId].getStats(null).then(stats => {
          var peerStats = this.parseStats(stats, streamId);
          this.notifyEventListeners("updated_stats", peerStats);
          resolve(peerStats);
        }).catch(err => {
          resolve(false);
        });
      });
    }
    parseStats(stats, streamId) {
      var bytesReceived = -1;
      var videoPacketsLost = -1;
      var audioPacketsLost = -1;
      var fractionLost = -1;
      var currentTime = -1;
      var bytesSent = -1;
      var videoPacketsSent = -1;
      var audioPacketsSent = -1;
      var audioLevel = -1;
      var qlr = "";
      var framesEncoded = -1;
      var width = -1;
      var height = -1;
      var fps = -1;
      var frameWidth = -1;
      var frameHeight = -1;
      var videoRoundTripTime = -1;
      var videoJitter = -1;
      var audioRoundTripTime = -1;
      var audioJitter = -1;
      var framesDecoded = -1;
      var framesDropped = -1;
      var framesReceived = -1;
      var audioJitterAverageDelay = -1;
      var videoJitterAverageDelay = -1;
      var availableOutgoingBitrate = Infinity;
      var currentRoundTripTime = -1;
      var audioPacketsReceived = -1;
      var videoPacketsReceived = -1;
      var inboundRtp = [];
      stats.forEach(value => {
        //Logger.debug(value);
        if (value.type == "inbound-rtp" && typeof value.kind != "undefined") {
          //this is coming when webrtc playing

          var inboundRtpObj = {};
          inboundRtpObj.trackIdentifier = value.trackIdentifier;
          bytesReceived += value.bytesReceived;
          if (value.kind == "audio") {
            audioPacketsLost = value.packetsLost;
            audioJitter = value.jitter;
            audioPacketsReceived = value.packetsReceived;
            inboundRtpObj.audioPacketsLost = value.packetsLost;
          } else if (value.kind == "video") {
            videoPacketsLost = value.packetsLost;
            inboundRtpObj.videoPacketsLost = value.packetsLost;
            inboundRtpObj.framesDropped = value.framesDropped;
            inboundRtpObj.framesDecoded = value.framesDecoded;
            inboundRtpObj.framesPerSecond = value.framesPerSecond;
            videoJitter = value.jitter;
            videoPacketsReceived = value.packetsReceived;
          }
          inboundRtpObj.bytesReceived = value.bytesReceived;
          inboundRtpObj.jitterBufferDelay = value.jitterBufferDelay;
          inboundRtpObj.lastPacketReceivedTimestamp = value.lastPacketReceivedTimestamp;
          fractionLost += value.fractionLost;
          inboundRtpObj.fractionLost = value.fractionLost;
          currentTime = value.timestamp;
          inboundRtpObj.currentTime = value.timestamp;
          if (typeof value.frameWidth != "undefined") {
            frameWidth = value.frameWidth;
            inboundRtpObj.frameWidth = value.frameWidth;
          }
          if (typeof value.frameHeight != "undefined") {
            frameHeight = value.frameHeight;
            inboundRtpObj.frameHeight = value.frameHeight;
          }
          if (typeof value.framesDecoded != "undefined") {
            framesDecoded = value.framesDecoded;
            inboundRtpObj.framesDecoded = value.framesDecoded;
          }
          if (typeof value.framesDropped != "undefined") {
            framesDropped = value.framesDropped;
            inboundRtpObj.framesDropped = value.framesDropped;
          }
          if (typeof value.framesReceived != "undefined") {
            framesReceived = value.framesReceived;
            inboundRtpObj.framesReceived = value.framesReceived;
          }
          inboundRtp.push(inboundRtpObj);
        } else if (value.type == "outbound-rtp") {
          //TODO: SPLIT AUDIO AND VIDEO BITRATES
          //it is for the publishing
          if (value.kind == "audio") {
            audioPacketsSent = value.packetsSent;
          } else if (value.kind == "video") {
            videoPacketsSent = value.packetsSent;
            frameWidth = value.frameWidth;
            frameHeight = value.frameHeight;
          }
          bytesSent += value.bytesSent;
          currentTime = value.timestamp;
          qlr = value.qualityLimitationReason;
          if (value.framesEncoded != null) {
            //audio tracks are undefined here
            framesEncoded += value.framesEncoded;
          }
        } else if (value.type == "track" && typeof value.kind != "undefined" && value.kind == "audio") {
          if (typeof value.audioLevel != "undefined") {
            audioLevel = value.audioLevel;
          }
          if (typeof value.jitterBufferDelay != "undefined" && typeof value.jitterBufferEmittedCount != "undefined") {
            audioJitterAverageDelay = value.jitterBufferDelay / value.jitterBufferEmittedCount;
          }
        } else if (value.type == "track" && typeof value.kind != "undefined" && value.kind == "video") {
          if (typeof value.frameWidth != "undefined") {
            frameWidth = value.frameWidth;
          }
          if (typeof value.frameHeight != "undefined") {
            frameHeight = value.frameHeight;
          }
          if (typeof value.framesDecoded != "undefined") {
            framesDecoded = value.framesDecoded;
          }
          if (typeof value.framesDropped != "undefined") {
            framesDropped = value.framesDropped;
          }
          if (typeof value.framesReceived != "undefined") {
            framesReceived = value.framesReceived;
          }
          if (typeof value.jitterBufferDelay != "undefined" && typeof value.jitterBufferEmittedCount != "undefined") {
            videoJitterAverageDelay = value.jitterBufferDelay / value.jitterBufferEmittedCount;
          }
        } else if (value.type == "remote-inbound-rtp" && typeof value.kind != "undefined") {
          //this is coming when webrtc publishing

          if (typeof value.packetsLost != "undefined") {
            if (value.kind == "video") {
              //this is the packetsLost for publishing
              videoPacketsLost = value.packetsLost;
            } else if (value.kind == "audio") {
              //this is the packetsLost for publishing
              audioPacketsLost = value.packetsLost;
            }
          }
          if (typeof value.roundTripTime != "undefined") {
            if (value.kind == "video") {
              videoRoundTripTime = value.roundTripTime;
            } else if (value.kind == "audio") {
              audioRoundTripTime = value.roundTripTime;
            }
          }
          if (typeof value.jitter != "undefined") {
            if (value.kind == "video") {
              videoJitter = value.jitter;
            } else if (value.kind == "audio") {
              audioJitter = value.jitter;
            }
          }
        } else if (value.type == "media-source") {
          if (value.kind == "video") {
            //returns video source dimensions, not necessarily dimensions being encoded by browser
            width = value.width;
            height = value.height;
            fps = value.framesPerSecond;
          }
        } else if (value.type == "candidate-pair" && value.state == "succeeded" && value.availableOutgoingBitrate != undefined) {
          availableOutgoingBitrate = value.availableOutgoingBitrate / 1000;
          //currentRoundTripTime
          currentRoundTripTime = value.currentRoundTripTime;
        }
      });
      if (typeof this.remotePeerConnectionStats[streamId] == 'undefined' || this.remotePeerConnectionStats[streamId] == null) {
        this.remotePeerConnectionStats[streamId] = new PeerStats(streamId);
      }
      this.remotePeerConnectionStats[streamId].totalBytesReceived = bytesReceived;
      this.remotePeerConnectionStats[streamId].videoPacketsLost = videoPacketsLost;
      this.remotePeerConnectionStats[streamId].audioPacketsLost = audioPacketsLost;
      this.remotePeerConnectionStats[streamId].fractionLost = fractionLost;
      this.remotePeerConnectionStats[streamId].currentTime = currentTime;
      this.remotePeerConnectionStats[streamId].totalBytesSent = bytesSent;
      this.remotePeerConnectionStats[streamId].totalVideoPacketsSent = videoPacketsSent;
      this.remotePeerConnectionStats[streamId].totalAudioPacketsSent = audioPacketsSent;
      this.remotePeerConnectionStats[streamId].videoPacketsSent = videoPacketsSent;
      this.remotePeerConnectionStats[streamId].audioPacketsSent = audioPacketsSent;
      this.remotePeerConnectionStats[streamId].audioLevel = audioLevel;
      this.remotePeerConnectionStats[streamId].qualityLimitationReason = qlr;
      this.remotePeerConnectionStats[streamId].totalFramesEncoded = framesEncoded;
      this.remotePeerConnectionStats[streamId].resWidth = width;
      this.remotePeerConnectionStats[streamId].resHeight = height;
      this.remotePeerConnectionStats[streamId].srcFps = fps;
      this.remotePeerConnectionStats[streamId].frameWidth = frameWidth;
      this.remotePeerConnectionStats[streamId].frameHeight = frameHeight;
      this.remotePeerConnectionStats[streamId].videoRoundTripTime = videoRoundTripTime;
      this.remotePeerConnectionStats[streamId].videoJitter = videoJitter;
      this.remotePeerConnectionStats[streamId].audioRoundTripTime = audioRoundTripTime;
      this.remotePeerConnectionStats[streamId].audioJitter = audioJitter;
      this.remotePeerConnectionStats[streamId].framesDecoded = framesDecoded;
      this.remotePeerConnectionStats[streamId].framesDropped = framesDropped;
      this.remotePeerConnectionStats[streamId].framesReceived = framesReceived;
      this.remotePeerConnectionStats[streamId].videoJitterAverageDelay = videoJitterAverageDelay;
      this.remotePeerConnectionStats[streamId].audioJitterAverageDelay = audioJitterAverageDelay;
      this.remotePeerConnectionStats[streamId].availableOutgoingBitrate = availableOutgoingBitrate;
      this.remotePeerConnectionStats[streamId].inboundRtpList = inboundRtp;
      this.remotePeerConnectionStats[streamId].currentRoundTripTime = currentRoundTripTime;
      this.remotePeerConnectionStats[streamId].audioPacketsReceived = audioPacketsReceived;
      this.remotePeerConnectionStats[streamId].videoPacketsReceived = videoPacketsReceived;
      return this.remotePeerConnectionStats[streamId];
    }

    /**
     * Called to start a periodic timer to get statistics periodically (5 seconds) for a specific stream.
     *
     * @param {string} streamId : unique id for the stream
     * @param {number} periodMs : period in milliseconds. Default value is 5000 ms.
     */
    enableStats(streamId) {
      var periodMs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
      if (this.remotePeerConnectionStats[streamId] == null) {
        this.remotePeerConnectionStats[streamId] = new PeerStats(streamId);
        this.remotePeerConnectionStats[streamId].timerId = setInterval(() => {
          this.getStats(streamId);
        }, periodMs);
      }
    }

    /**
     * Called to stop the periodic timer which is set by @enableStats
     *
     * @param {string} streamId : unique id for the stream
     */
    disableStats(streamId) {
      if (this.remotePeerConnectionStats[streamId] != null || typeof this.remotePeerConnectionStats[streamId] != 'undefined') {
        clearInterval(this.remotePeerConnectionStats[streamId].timerId);
        delete this.remotePeerConnectionStats[streamId];
      }
    }

    /**
     * Called to check and start Web Socket connection if it is not started
     */
    checkWebSocketConnection() {
      if (this.webSocketAdaptor == null || this.webSocketAdaptor.isConnected() == false && this.webSocketAdaptor.isConnecting() == false) {
        Logger$1.debug("websocket url : " + this.websocketURL);
        this.webSocketAdaptor = new WebSocketAdaptor({
          websocket_url: this.websocketURL,
          httpEndpointUrl: this.httpEndpointUrl,
          webrtcadaptor: this,
          callback: (info, obj) => {
            this.websocketCallback(info, obj);
          },
          callbackError: (error, message) => {
            this.notifyErrorEventListeners(error, message);
          },
          debug: this.debug
        });
      }
    }
    websocketCallback(info, obj) {
      if (info == "closed" || info == "server_will_stop") {
        Logger$1.info("Critical response from server:" + info + ". It will reconnect immediately if there is an active connection");

        //close websocket reconnect again
        if (info == "server_will_stop") {
          this.webSocketAdaptor.close();
        }
        //try with forcing reconnect because webrtc will be closed as well
        this.reconnectIfRequired(0, true);
      }
      this.notifyEventListeners(info, obj);
    }

    /**
     * Called to stop Web Socket connection
     * After calling this function, create new WebRTCAdaptor instance, don't use the the same object
     * Because all streams are closed on server side as well when websocket connection is closed.
     */
    closeWebSocket() {
      for (var key in this.remotePeerConnection) {
        this.closePeerConnection(key);
      }
      //free the remote peer connection by initializing again
      this.remotePeerConnection = new Array();
      this.webSocketAdaptor.close();
    }

    /**
     * @param {string} streamId Called to send a text message to other peer in the peer-to-peer sessionnnection is closed.
     * @param {*} definition
     * @param {*} data
     */
    peerMessage(streamId, definition, data) {
      var jsCmd = {
        command: "peerMessageCommand",
        streamId: streamId,
        definition: definition,
        data: data
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to force AMS to send the video with the specified resolution in case of Adaptive Streaming (ABR) enabled.
     * Normally the resolution is automatically determined by AMS according to the network condition.
     * @param {string}  streamId : unique id for the stream
     * @param {*}  resolution : default is auto. You can specify any height value from the ABR list.
     */
    forceStreamQuality(streamId, resolution) {
      var jsCmd = {
        command: "forceStreamQuality",
        streamId: streamId,
        streamHeight: resolution
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to send data via DataChannel. DataChannel should be enabled on AMS settings.
     * @param {string} streamId : unique id for the stream
     * @param {*}  data : data that you want to send. It may be a text (may in Json format or not) or binary
     */
    sendData(streamId, data) {
      var CHUNK_SIZE = 16000;
      if (this.remotePeerConnection[streamId] !== undefined) {
        var dataChannel = this.remotePeerConnection[streamId].dataChannel;
        if (dataChannel === undefined || dataChannel === null || typeof dataChannel === 'undefined') {
          Logger$1.warn('dataChannel is null or undefined');
          return;
        } else if (dataChannel.readyState !== 'open') {
          Logger$1.warn('dataChannel.readyState is not open: ' + dataChannel.readyState);
          return;
        }
        var length = data.length || data.size || data.byteLength;
        var sent = 0;
        if (typeof data === 'string' || data instanceof String) {
          dataChannel.send(data);
        } else {
          var token = Math.floor(Math.random() * 999999);
          var header = new Int32Array(2);
          header[0] = token;
          header[1] = length;
          dataChannel.send(header);
          var sent = 0;
          while (sent < length) {
            var size = Math.min(length - sent, CHUNK_SIZE);
            var buffer = new Uint8Array(size + 4);
            var tokenArray = new Int32Array(1);
            tokenArray[0] = token;
            buffer.set(new Uint8Array(tokenArray.buffer, 0, 4), 0);
            var chunk = data.slice(sent, sent + size);
            buffer.set(new Uint8Array(chunk), 4);
            sent += size;
            dataChannel.send(buffer);
          }
        }
      } else {
        Logger$1.warn("Send data is called for undefined peer connection with stream id: " + streamId);
      }
    }

    /**
     * Called by user
     * to add SoundMeter to a stream (remote stream)
     * to measure audio level. This sound Meters are added to a map with the key of StreamId.
     * When user called @getSoundLevelList, the instant levels are provided.
     *
     * This list can be used to add a sign to talking participant
     * in conference room. And also to determine the dominant audio to focus that player.
     * @param {MediaStream} stream
     * @param {string} streamId
     */
    enableAudioLevel(stream, streamId) {
      var soundMeter = new SoundMeter(this.mediaManager.audioContext);

      // Put variables in global scope to make them available to the
      // browser console.
      // this function fetches getSoundLevelList and this list get instant levels from soundmeter directly
      // so we don't need to fill inside of levelCallback here, just pass an empty function
      soundMeter.connectToSource(stream, () => {}, function (e) {
        if (e) {
          alert(e);
          return;
        }
        Logger$1.debug("Added sound meter for stream: " + streamId + " = " + soundMeter.instant.toFixed(2));
      });
      this.soundMeters[streamId] = soundMeter;
    }

    /**
     * Called by the user
     * to get the audio levels for the streams for the provided StreamIds
     *
     * @param {*} streamsList
     */
    getSoundLevelList(streamsList) {
      for (var i = 0; i < streamsList.length; i++) {
        this.soundLevelList[streamsList[i]] = this.soundMeters[streamsList[i]].instant.toFixed(2);
      }
      this.notifyEventListeners("gotSoundList", this.soundLevelList);
    }

    /**
     * Called media manaher to get video/audio sender for the local peer connection
     *
     * @param {string} streamId :
     * @param {string} type : "video" or "audio"
     * @returns
     */
    getSender(streamId, type) {
      var sender = null;
      if (this.remotePeerConnection[streamId] != null) {
        sender = this.remotePeerConnection[streamId].getSenders().find(function (s) {
          return s.track.kind == type;
        });
      }
      return sender;
    }

    /**
     * Called by user
     *
     * @param {string} videoTrackId : track id associated with pinned video
     * @param {string} streamId : streamId of the pinned video
     * @param {boolean} enabled : true | false
     * @returns
     */
    assignVideoTrack(videoTrackId, streamId, enabled) {
      var jsCmd = {
        command: "assignVideoTrackCommand",
        streamId: streamId,
        videoTrackId: videoTrackId,
        enabled: enabled
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called by user
     * video tracks may be less than the participants count
     * so these parameters are used for assigning video tracks to participants.
     * This message is used to make pagination in conference.
     * @param {string} streamId
     * @param {number} offset : start index for participant list to play
     * @param {number} size : number of the participants to play
     * @returns
     */
    updateVideoTrackAssignments(streamId, offset, size) {
      var jsCmd = {
        streamId: streamId,
        command: "updateVideoTrackAssignmentsCommand",
        offset: offset,
        size: size
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called by user
     * This message is used to set max video track count in a conference.
     * @param {string} streamId
     * @param {number} maxTrackCount : maximum video track count
     * @returns
     */
    setMaxVideoTrackCount(streamId, maxTrackCount) {
      var jsCmd = {
        streamId: streamId,
        command: "setMaxVideoTrackCountCommand",
        maxTrackCount: maxTrackCount
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called by user
     * This message is used to send audio level in a conference.
     *
     * IMPORTANT: AMS v2.7+ can get the audio level from the RTP header and sends audio level to the viewers the same way here.
     *  Just one difference, AMS sends the audio level in the range of 0 and 127. 0 is max, 127 is ms
    	 *  It means that likely you don't need to send UPDATE_AUDIO_LEVEL anymore
     *
     * @param {string} streamId
     * @param {*} value : audio level
     * @returns
     */
    updateAudioLevel(streamId, value) {
      var jsCmd = {
        streamId: streamId,
        eventType: "UPDATE_AUDIO_LEVEL",
        audioLevel: value
      };
      this.sendData(streamId, JSON.stringify(jsCmd));
    }

    /**
     * Called by user
     * This message is used to get debug data from server for debugging purposes in conference.
     * @param {string} streamId
     * @returns
     */
    getDebugInfo(streamId) {
      var jsCmd = {
        streamId: streamId,
        command: "getDebugInfo"
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Register user push notification token to Ant Media Server according to subscriberId and authToken
     * @param {string} subscriberId: subscriber id it can be anything that defines the user
     * @param {string} authToken: JWT token with the issuer field is the subscriberId and secret is the application's subscriberAuthenticationKey, 
     * 							  It's used to authenticate the user - token should be obtained from Ant Media Server Push Notification REST Service
     * 							  or can be generated with JWT by using the secret and issuer fields
     * 
     * @param {string} pushNotificationToken: Push Notification Token that is obtained from the Firebase or APN
     * @param {string} tokenType: It can be "fcm" or "apn" for Firebase Cloud Messaging or Apple Push Notification
     * 
     * @returns Server responds this message with a result.
     * Result message is something like 
     * {
     * 	  "command":"notification",
     *    "success":true or false
     *    "definition":"If success is false, it gives the error message",
     * 	  "information":"If succeess is false, it gives more information to debug if available"
     * 
     * }	 
     *                            
     */
    registerPushNotificationToken(subscriberId, authToken, pushNotificationToken, tokenType) {
      var jsCmd = {
        command: "registerPushNotificationToken",
        subscriberId: subscriberId,
        token: authToken,
        pnsRegistrationToken: pushNotificationToken,
        pnsType: tokenType
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Send push notification to subscribers
     * @param {string} subscriberId: subscriber id it can be anything(email, username, id) that defines the user in your applicaiton
     * @param {string} authToken: JWT token with the issuer field is the subscriberId and secret is the application's subscriberAuthenticationKey,
     *                               It's used to authenticate the user - token should be obtained from Ant Media Server Push Notification REST Service
     *                              or can be generated with JWT by using the secret and issuer fields
     * @param {string} pushNotificationContent: JSON Format - Push Notification Content. If it's not JSON, it will not parsed
     * @param {Array} subscriberIdsToNotify: Array of subscriber ids to notify
     * 
     * @returns Server responds this message with a result.
     * Result message is something like 
     * {
     * 	  "command":"notification",
     *    "success":true or false
     *    "definition":"If success is false, it gives the error message",
     * 	  "information":"If succeess is false, it gives more information to debug if available"
     * 
     * }	 
     */
    sendPushNotification(subscriberId, authToken, pushNotificationContent, subscriberIdsToNotify) {
      //type check for pushNotificationContent if json
      if (typeof pushNotificationContent !== "object") {
        Logger$1.error("Push Notification Content is not JSON format");
        throw new Error("Push Notification Content is not JSON format");
      }

      //type check if subscriberIdsToNotify is array
      if (!Array.isArray(subscriberIdsToNotify)) {
        Logger$1.error("subscriberIdsToNotify is not an array. Please put the subscriber ids to notify in an array such as [user1], [user1, user2]");
        throw new Error("subscriberIdsToNotify is not an array. Please put the subscriber ids to notify in an array such as [user1], [user1, user2]");
      }
      var jsCmd = {
        command: "sendPushNotification",
        subscriberId: subscriberId,
        token: authToken,
        pushNotificationContent: pushNotificationContent,
        subscriberIdsToNotify: subscriberIdsToNotify
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Send push notification to topic
     * @param {string} subscriberId: subscriber id it can be anything(email, username, id) that defines the user in your applicaiton
     * @param {string} authToken: JWT token with the issuer field is the subscriberId and secret is the application's subscriberAuthenticationKey,	
     *                              It's used to authenticate the user - token should be obtained from Ant Media Server Push Notification REST Service
     *                             or can be generated with JWT by using the secret and issuer fields
     * @param {string} pushNotificationContent:JSON Format - Push Notification Content. If it's not JSON, it will not parsed
     * @param {string} topic: Topic to send push notification
     * 
     * @returns Server responds this message with a result.
     * Result message is something like
     * {
     *     "command":"notification",
     *     "success":true or false
     *     "definition":"If success is false, it gives the error message",
     *     "information":"If succeess is false, it gives more information to debug if available"
     * }
     * 
     */
    sendPushNotificationToTopic(subscriberId, authToken, pushNotificationContent, topic) {
      //type check for pushNotificationContent if json
      if (typeof pushNotificationContent !== "object") {
        Logger$1.error("Push Notification Content is not JSON format");
        throw new Error("Push Notification Content is not JSON format");
      }
      var jsCmd = {
        command: "sendPushNotification",
        subscriberId: subscriberId,
        token: authToken,
        pushNotificationContent: pushNotificationContent,
        topic: topic
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to get the subscriber count for a stream. AMS responds with the subscriberCount notification.
     * Parameters:
     * @param {string} streamId : stream id to get subscribers list
     */
    getSubscriberCount(streamId) {
      var jsCmd = {
        command: "getSubscriberCount",
        streamId: streamId
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * Called to get the subscribers for a stream. AMS responds with the subscriberList notification.
     * Parameters:
     * @param {string} streamId : stream id to get subscribers list
     * @param {number} offset : offset for the subtrack list
     * @param {number} size : size for the subtrack list
     */
    getSubscriberList(streamId, offset, size) {
      var jsCmd = {
        command: "getSubscribers",
        streamId: streamId,
        offset: offset,
        size: size
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }

    /**
     * The following messages are forwarded to MediaManager. They are also kept here because of backward compatibility.
     * You can find the details about them in media_manager.js
     * @param {string} streamId
     * @returns 
     */
    turnOffLocalCamera(streamId) {
      if (typeof this.turnOffEffectCamera === 'function') {
        this.turnOffEffectCamera(streamId);
      }
      return this.mediaManager.turnOffLocalCamera(streamId);
    }
    /**
     *
     * @param {string} streamId
     * @returns
     */
    turnOnLocalCamera(streamId) {
      return this.mediaManager.turnOnLocalCamera(streamId);
    }
    muteLocalMic() {
      this.mediaManager.muteLocalMic();
    }
    unmuteLocalMic() {
      this.mediaManager.unmuteLocalMic();
    }
    /**
     *
     * @param {string} streamId
     * @returns
     */
    switchDesktopCapture(streamId) {
      return this.mediaManager.switchDesktopCapture(streamId);
    }

    /**
     * Switch to Video camera capture again. Updates the video track on the fly as well.
     * @param {string} streamId
     * @param {string} deviceId
     * @returns {Promise}
     */
    switchVideoCameraCapture(streamId, deviceId, onEndedCallback) {
      return this.mediaManager.switchVideoCameraCapture(streamId, deviceId, onEndedCallback);
    }

    /**
     * Update video track of the stream. Updates the video track on the fly as well.
     * @param {string} stream
     * @param {string} streamId
     * @param {function} onEndedCallback
     * @param {boolean} stopDesktop
     * @returns {Promise}
     */
    updateVideoTrack(stream, streamId, onEndedCallback, stopDesktop) {
      return this.mediaManager.updateVideoTrack(stream, streamId, onEndedCallback, stopDesktop);
    }

    /**
     * Update audio track of the stream. Updates the audio track on the fly as well. It just replaces the audio track with the first one in the stream
     * @param {*} stream
     * @param {*} streamId
     * @param {*} onEndedCallback
     * @returns
     */
    updateAudioTrack(stream, streamId, onEndedCallback) {
      return this.mediaManager.updateAudioTrack(stream, streamId, onEndedCallback);
    }

    /**
     * Called by User
     * to switch between front and back camera on mobile devices
     *
     * @param {string} streamId Id of the stream to be changed.
     * @param {string} facingMode it can be ""user" or "environment"
     *
     * This method is used to switch front and back camera.
     */
    switchVideoCameraFacingMode(streamId, facingMode) {
      return this.mediaManager.switchVideoCameraFacingMode(streamId, facingMode);
    }
    /**
     *
     * @param {string} streamId
     * @returns
     */
    switchDesktopCaptureWithCamera(streamId) {
      return this.mediaManager.switchDesktopCaptureWithCamera(streamId);
    }
    /**
     *
     * @param {string} streamId
     * @param {string} deviceId
     * @returns
     */
    switchAudioInputSource(streamId, deviceId) {
      return this.mediaManager.switchAudioInputSource(streamId, deviceId);
    }
    /**
     *
     * @param {number} volumeLevel
     */
    setVolumeLevel(volumeLevel) {
      this.mediaManager.setVolumeLevel(volumeLevel);
    }
    /**
     *
     * Using sound meter in order to get audio level may cause audio distortion in Windows browsers
     * @param {Function} levelCallback
     * @param {number} period
     * @returns
     */
    enableAudioLevelForLocalStream(levelCallback, period) {
      return this.mediaManager.enableAudioLevelForLocalStream(levelCallback);
    }
    disableAudioLevelForLocalStream() {
      this.mediaManager.disableAudioLevelForLocalStream();
    }
    /**
     *
     * @param {object} constraints
     * @returns
     */
    applyConstraints(constraints) {
      return this.mediaManager.applyConstraints(constraints);
    }
    /**
     *
     * @param {number} bandwidth
     * @param {string} streamId
     */
    changeBandwidth(bandwidth, streamId) {
      this.mediaManager.changeBandwidth(bandwidth, streamId);
    }
    enableAudioLevelWhenMuted() {
      return this.mediaManager.enableAudioLevelWhenMuted();
    }
    disableAudioLevelWhenMuted() {
      this.mediaManager.disableAudioLevelWhenMuted();
    }
    /**
     *
     * @param {string} streamId
     * @returns
     */
    getVideoSender(streamId) {
      return this.mediaManager.getVideoSender(streamId);
    }
    /**
     *
     * @param {MediaStreamConstraints} mediaConstraints : media constraints to be used for opening the stream
     * @param {string} streamId : id of the stream to replace tracks with
     * @returns
     */
    openStream(mediaConstraints, streamId) {
      return this.mediaManager.openStream(mediaConstraints, streamId);
    }
    closeStream() {
      return this.mediaManager.closeStream();
    }
  }

  /* The Information Callbacks Called by This Class */
  //TODO:

  /* The Error Callbacks Called by This Class */
  //TODO:
  /**
   * @type {Array<Function>}
   */
  _defineProperty(WebRTCAdaptor, "pluginInitMethods", new Array());

  var Logger = window.log;
  /**
   * This class is used to apply a video effect to the video stream.
   * It's compatible with Ant Media Server JavaScript SDK v2.5.2+
   *
   */
  var _virtualBackgroundImage = /*#__PURE__*/new WeakMap();
  var _noEffect = /*#__PURE__*/new WeakSet();
  class VideoEffect {
    /**
     *
     * @param {WebRTCAdaptor} webRTCAdaptor
     */
    constructor(webRTCAdaptor) {
      /**
       * This method is used to disable the virtual background and blur effects.
       */
      _classPrivateMethodInitSpec(this, _noEffect);
      _classPrivateFieldInitSpec(this, _virtualBackgroundImage, {
        writable: true,
        value: null
      });
      this.webRTCAdaptor = webRTCAdaptor;
      this.selfieSegmentation = null;
      this.effectCanvas = null;
      this.ctx = null;
      this.rawLocalVideo = document.createElement('video');
      this.deepAR = null;
      this.backgroundBlurRange = 3;
      this.edgeBlurRange = 4;
      this.effectName = VideoEffect.NO_EFFECT;
      this.startTime = 0;
      this.statTimerId = -1;
      this.renderedFrameCount = 0;
      this.lastRenderedFrameCount = 0;
      this.effectCanvasFPS = 0;
      this.videoCallbackPeriodMs = 0;
      this.effectStreams = [];
      this.isProcessingActive = false;
      this.initializeSelfieSegmentation();
      this.isInitialized = true;
    }

    /**
     * This method is used to initialize the video effect.
     * @param {MediaStream} stream - Original stream to be manipulated.
     * @returns {Promise<void>}
     */
    init(stream) {
      var _this = this;
      return _asyncToGenerator(function* () {
        yield _this.setRawLocalVideo(stream);
        var trackSettings = stream.getVideoTracks()[0].getSettings();
        _this.effectCanvasFPS = trackSettings.frameRate;
        _this.videoCallbackPeriodMs = 1000 / _this.effectCanvasFPS;
        _this.effectCanvas = _this.createEffectCanvas(trackSettings.width, trackSettings.height);
        _this.ctx = _this.effectCanvas.getContext("2d");
        if (_this.canvasStream) {
          _this.canvasStream.getTracks().forEach(track => track.stop());
          _this.canvasStream = null;
        }
        _this.canvasStream = _this.effectCanvas.captureStream(_this.effectCanvasFPS);
        _this.effectStreams.push(_this.canvasStream);
        return new Promise((resolve, reject) => {
          resolve(_this.canvasStream);
        });
      })();
    }

    /**
     * This method is used to set raw local video.
     * @param {MediaStream} stream
     * @returns {Promise<void>}
     */
    setRawLocalVideo(stream) {
      if (stream && stream.active) {
        this.effectStreams.push(stream);
      }
      this.rawLocalVideo.srcObject = stream;
      this.rawLocalVideo.muted = true;
      this.rawLocalVideo.autoplay = true;
      return this.rawLocalVideo.play();
    }

    /**
     * This method is used to create the canvas element which is used to apply the video effect.
     * @param {number} height
     * @param {number} width
     */
    createEffectCanvas(width, height) {
      var effectCanvas = document.createElement('canvas');
      effectCanvas.id = "effectCanvas";
      effectCanvas.width = width;
      effectCanvas.height = height;
      return effectCanvas;
    }

    /**
     * This method is used to initialize the selfie segmentation.
     */
    initializeSelfieSegmentation() {
      this.selfieSegmentation = new SelfieSegmentation({
        locateFile: file => {
          return VideoEffect.LOCATE_FILE_URL + "/" + file;
        }
      });
      this.selfieSegmentation.setOptions({
        selfieMode: false,
        // true: selfie mode, false: portrait mode
        modelSelection: 1 // 0: General Model, 1: Landscape Model - We use Landscape Model for better performance
      });

      this.selfieSegmentation.onResults(results => {
        this.onResults(results);
      });
    }
    /**
     * @param {HTMLElement} imageElement
     */
    set virtualBackgroundImage(imageElement) {
      _classPrivateFieldSet(this, _virtualBackgroundImage, imageElement);
    }
    startFpsCalculation() {
      this.statTimerId = setInterval(() => {
        var currentTime = new Date().getTime();
        var deltaTime = (currentTime - this.startTime) / 1000;
        this.startTime = currentTime;
        var fps = (this.renderedFrameCount - this.lastRenderedFrameCount) / deltaTime;
        this.renderedFrameCount = this.lastRenderedFrameCount;
        Logger.warn("Fps: " + fps + "fps");
      }, 1000);
    }
    stopFpsCalculation() {
      if (this.statTimerId !== -1) {
        clearInterval(this.statTimerId);
        this.statTimerId = -1;
      }
    }
    processFrame() {
      var _this2 = this;
      return _asyncToGenerator(function* () {
        // Check if processing is active and the video is in a valid state
        if (!_this2.isProcessingActive || !_this2.rawLocalVideo || !_this2.rawLocalVideo.srcObject || !_this2.rawLocalVideo.videoWidth || !_this2.rawLocalVideo.videoHeight) {
          return;
        }
        try {
          yield _this2.selfieSegmentation.send({
            image: _this2.rawLocalVideo
          });

          //call if the effect name is not NO_EFFECT
          if (_this2.effectName !== VideoEffect.NO_EFFECT && _this2.isProcessingActive) {
            setTimeout(() => {
              _this2.processFrame();
            }, _this2.videoCallbackPeriodMs);
          }
        } catch (error) {
          console.error("Error processing video frame:", error);
          // If there was an error, we should stop processing
          _this2.isProcessingActive = false;
        }
      })();
    }

    /**
     * Set blur effect range
     * @param {number} backgroundBlurRange
     * @param {number} edgeBlurRange
     */
    setBlurEffectRange(backgroundBlurRange, edgeBlurRange) {
      this.backgroundBlurRange = backgroundBlurRange;
      this.edgeBlurRange = edgeBlurRange;
    }

    /**
     * Enable effect
     * @param {string} effectName
     * @param {string} deepARApiKey
     * @param {*} deepARModel
     */
    enableEffect(effectName, deepARApiKey, deepARModel) {
      var _this3 = this;
      return _asyncToGenerator(function* () {
        if (!_this3.isInitialized) {
          Logger.error("VideoEffect is not initialized!");
          return;
        }
        switch (effectName) {
          case VideoEffect.DEEPAR:
          case VideoEffect.VIRTUAL_BACKGROUND:
          case VideoEffect.BLUR_BACKGROUND:
          case VideoEffect.NO_EFFECT:
            //Stop timer
            _this3.stopFpsCalculation();
            _this3.isProcessingActive = false; // Stop processing before switching effect
            yield _classPrivateMethodGet(_this3, _noEffect, _noEffect2).call(_this3);
            break;
          default:
            Logger.warn("Unknown effect name please use the constants VideoEffect.VIRTUAL_BACKGROUND,VideoEffect.BLUR_BACKGROUND or VideoEffect.NO_EFFECT ");
            return;
        }
        var currentEffectName = _this3.effectName;
        _this3.effectName = effectName;
        if (currentEffectName === VideoEffect.DEEPAR && effectName !== VideoEffect.DEEPAR) {
          _this3.deepAR.shutdown();
          _this3.deepAR = null;
        }
        if (effectName === VideoEffect.VIRTUAL_BACKGROUND || effectName === VideoEffect.BLUR_BACKGROUND) {
          //check old effect name. If it's no effect, start the process
          if (currentEffectName === VideoEffect.NO_EFFECT || currentEffectName === VideoEffect.DEEPAR) {
            if (VideoEffect.DEBUG) {
              _this3.startFpsCalculation();
            }
            //We cannot use the localStream of the webrtc adaptor because it's gets stopped when updateVideoTrack is called
            //get the video stream with current constraints and stop it when effects are disabled

            //audio:true makes the trick to play the video in the background as well otherwise it stops playing
            return navigator.mediaDevices.getUserMedia({
              video: _this3.webRTCAdaptor.mediaConstraints.video,
              audio: true
            }).then(localStream => {
              _this3.effectStreams.push(localStream);
              return _this3.init(localStream).then(processedStream => {
                return _this3.webRTCAdaptor.updateVideoTrack(processedStream, _this3.webRTCAdaptor.publishStreamId, null, true).then(() => {
                  _this3.isProcessingActive = true; // Start processing when effect is enabled
                  setTimeout(() => {
                    _this3.processFrame();
                  }, _this3.videoCallbackPeriodMs);
                });
              }).catch(err => {
                //log and throw again to let the catch in the chain it
                Logger.error(err);
                throw err;
              });
            });
          } else {
            return new Promise((resolve, reject) => {
              resolve();
            });
          }
        } else if (effectName === VideoEffect.DEEPAR) {
          if (deepARApiKey === undefined || deepARApiKey === null || deepARApiKey === "" || deepARModel === undefined || deepARModel === null || deepARModel === "") {
            Logger.error("DeepAR API key or DeepAR Model is not set!");
            return;
          }
          if (currentEffectName === VideoEffect.DEEPAR) {
            _this3.deepAR.switchEffect(0, 'slot', VideoEffect.DEEP_AR_EFFECTS_URL + deepARModel + VideoEffect.DEEP_AR_EXTENSION);
            return;
          } else if (currentEffectName === VideoEffect.BLUR_BACKGROUND || currentEffectName === VideoEffect.VIRTUAL_BACKGROUND) {
            //Stop timer
            _this3.stopFpsCalculation();
            yield _classPrivateMethodGet(_this3, _noEffect, _noEffect2).call(_this3);
          }
          var canvas = _this3.createEffectCanvas(500, 500);
          var deepAR = new DeepAR({
            licenseKey: deepARApiKey,
            canvas: canvas,
            deeparWasmPath: VideoEffect.DEEP_AR_FOLDER_ROOT_URL + '/wasm/deepar.wasm',
            callbacks: {
              onInitialize: function onInitialize() {
                deepAR.startVideo(true);
              }
            }
          });
          _this3.deepAR = deepAR;
          _this3.deepAR.callbacks.onVideoStarted = () => {
            _this3.canvasStream = canvas.captureStream(30);
            _this3.effectStreams.push(_this3.canvasStream);
            _this3.webRTCAdaptor.updateVideoTrack(_this3.canvasStream, _this3.webRTCAdaptor.publishStreamId, null, true);
            _this3.deepAR.switchEffect(0, 'slot', VideoEffect.DEEP_AR_EFFECTS_URL + deepARModel + VideoEffect.DEEP_AR_EXTENSION);
          };
          _this3.deepAR.downloadFaceTrackingModel(VideoEffect.DEEP_AR_FOLDER_ROOT_URL + "/models/face/models-68-extreme.bin");
          _this3.deepAR.setVideoElement(_this3.rawLocalVideo, true);
        } else {
          if (currentEffectName === VideoEffect.DEEPAR) {
            var localStream = yield navigator.mediaDevices.getUserMedia({
              video: _this3.webRTCAdaptor.mediaConstraints.video,
              audio: true
            });
            _this3.effectStreams.push(localStream);
            yield _this3.setRawLocalVideo(localStream);
          }
          return new Promise((resolve, reject) => {
            //Stop timer
            _this3.stopFpsCalculation();
            _classPrivateMethodGet(_this3, _noEffect, _noEffect2).call(_this3);
            resolve();
          });
        }
      })();
    }
    /**
     * This method is used to draw the segmentation mask.
     * @param {*} segmentation
     */
    drawSegmentationMask(segmentation) {
      this.ctx.drawImage(segmentation, 0, 0, this.effectCanvas.width, this.effectCanvas.height);
    }

    /**
     * This method is called by mediapipe when the segmentation mask is ready.
     * @param {*} results
     */
    onResults(results) {
      this.renderedFrameCount++;
      if (this.effectName == VideoEffect.BLUR_BACKGROUND) {
        this.drawBlurBackground(results.image, results.segmentationMask, this.backgroundBlurRange);
      } else if (this.effectName == VideoEffect.VIRTUAL_BACKGROUND) {
        this.drawVirtualBackground(results.image, results.segmentationMask, _classPrivateFieldGet(this, _virtualBackgroundImage));
      } else {
        this.drawImageDirectly(results.image);
      }
    }

    /**
     * This method is used to draw the raw frame directly to the canvas.
     * @param {*} image
     */
    drawImageDirectly(image) {
      this.ctx.save();
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.filter = "none";
      this.ctx.drawImage(image, 0, 0, image.width, image.height);
      this.ctx.restore();
    }

    /**
     * This method is used to draw the frame with virtual background effect to the canvas.
     * @param {*} image
     * @param {*} segmentation
     * @param {*} virtualBackgroundImage
     */
    drawVirtualBackground(image, segmentation, virtualBackgroundImage) {
      this.ctx.save();
      this.ctx.filter = "none";
      this.ctx.clearRect(0, 0, this.effectCanvas.width, this.effectCanvas.height);
      this.ctx.drawImage(segmentation, 0, 0, this.effectCanvas.width, this.effectCanvas.height);
      this.ctx.globalCompositeOperation = 'source-out';
      this.ctx.drawImage(virtualBackgroundImage, 0, 0, virtualBackgroundImage.naturalWidth, virtualBackgroundImage.naturalHeight, 0, 0, this.effectCanvas.width, this.effectCanvas.height);
      this.ctx.globalCompositeOperation = 'destination-atop';
      this.ctx.drawImage(image, 0, 0, this.effectCanvas.width, this.effectCanvas.height);
      this.ctx.restore();
    }

    /**
     * This method is used to draw frame with background blur effect to the canvas.
     * @param {*} image
     * @param {*} segmentation
     * @param {*} blurAmount
     */
    drawBlurBackground(image, segmentation, blurAmount) {
      this.ctx.clearRect(0, 0, this.effectCanvas.width, this.effectCanvas.height);
      this.ctx.globalCompositeOperation = "copy";
      this.ctx.filter = "none";
      this.ctx.filter = "blur(" + this.edgeBlurRange + "px)";
      this.drawSegmentationMask(segmentation);
      this.ctx.globalCompositeOperation = "source-in";
      this.ctx.filter = "none";
      this.ctx.drawImage(image, 0, 0, this.effectCanvas.width, this.effectCanvas.height);
      this.ctx.globalCompositeOperation = "destination-over";
      this.ctx.filter = "blur(" + blurAmount + "px)";
      this.ctx.drawImage(image, 0, 0, this.effectCanvas.width, this.effectCanvas.height);
      this.ctx.restore();
    }

    /**
     * This method stops all video/audio tracks that were created by this VideoEffect instance
     * and cleans up resources.
     */
    turnOffCamera() {
      Logger.debug("VideoEffect: Turning off camera and stopping all effect tracks");
      this.isProcessingActive = false;

      // Stop all tracks in all streams we've created
      if (this.effectStreams && this.effectStreams.length > 0) {
        this.effectStreams.forEach(stream => {
          if (stream && stream.active) {
            stream.getTracks().forEach(track => {
              track.stop();
            });
          }
        });
        this.effectStreams = [];
      }
      if (this.canvasStream) {
        this.canvasStream.getTracks().forEach(track => track.stop());
        this.canvasStream = null;
      }
      if (this.rawLocalVideo && this.rawLocalVideo.srcObject) {
        var stream = this.rawLocalVideo.srcObject;
        stream.getTracks().forEach(track => track.stop());
        this.rawLocalVideo.srcObject = null;
      }
      if (this.deepAR) {
        this.deepAR.shutdown();
        this.deepAR = null;
      }
      this.stopFpsCalculation();
      this.effectName = VideoEffect.NO_EFFECT;
    }

    /**
     * This method reinitializes the camera after it has been turned off.
     * It acquires a new camera stream and reconnects it to the WebRTC adaptor.
     * 
     * @param {string} streamId - The stream ID to publish to
     * @returns {Promise<void>} - A promise that resolves when the camera is turned on
     */
    turnOnCamera(streamId) {
      var _this4 = this;
      return _asyncToGenerator(function* () {
        Logger.debug("VideoEffect: Turning on camera");

        // Make sure any existing resources are cleaned up first
        _this4.turnOffCamera();
        try {
          var localStream = yield navigator.mediaDevices.getUserMedia({
            video: _this4.webRTCAdaptor.mediaConstraints.video,
            audio: _this4.webRTCAdaptor.mediaConstraints.audio
          });
          _this4.effectStreams.push(localStream);
          if (_this4.effectName !== VideoEffect.NO_EFFECT) {
            return _this4.enableEffect(_this4.effectName);
          } else {
            return _this4.webRTCAdaptor.updateVideoTrack(localStream, streamId || _this4.webRTCAdaptor.publishStreamId, null, true);
          }
        } catch (error) {
          Logger.error("Error turning on camera:", error);
          throw error;
        }
      })();
    }
  }
  function _noEffect2() {
    this.rawLocalVideo.pause();
    if (this.canvasStream != null) {
      this.canvasStream.getVideoTracks().forEach(track => track.stop());
    }
    this.turnOffCamera();
    return this.webRTCAdaptor.switchVideoCameraCapture(this.webRTCAdaptor.publishStreamId);
  }
  _defineProperty(VideoEffect, "DEEPAR", "deepar");
  _defineProperty(VideoEffect, "VIRTUAL_BACKGROUND", "virtual-background");
  _defineProperty(VideoEffect, "BLUR_BACKGROUND", "blur-background");
  _defineProperty(VideoEffect, "NO_EFFECT", "no-effect");
  _defineProperty(VideoEffect, "deepARModelList", ['flower_face', 'Ping_Pong']);
  /**
   * @type {boolean}
   */
  _defineProperty(VideoEffect, "DEBUG", false);
  /**
   * LOCATE_FILE_URL is optional, it's to give locate url of selfie segmentation
   * If you would like to use CDN,
   * Give "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/"
   * or give local file relative path "./js/external/selfie-segmentation" according to your file
   */
  //static LOCATE_FILE_URL = "./js/external/selfie-segmentation";
  _defineProperty(VideoEffect, "LOCATE_FILE_URL", "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation");
  _defineProperty(VideoEffect, "DEEP_AR_FOLDER_ROOT_URL", "https://cdn.jsdelivr.net/npm/deepar@4.0.3");
  _defineProperty(VideoEffect, "DEEP_AR_EFFECTS_URL", "../js/external/deepar-effects/");
  _defineProperty(VideoEffect, "DEEP_AR_EXTENSION", ".deepar");
  WebRTCAdaptor.register(webrtcAdaptorInstance => {
    var videoEffect = new VideoEffect(webrtcAdaptorInstance);
    Object.defineProperty(webrtcAdaptorInstance, "setBlurEffectRange", {
      value: function value(backgroundBlurRange, edgeBlurRange) {
        videoEffect.setBlurEffectRange(backgroundBlurRange, edgeBlurRange);
      }
    });
    Object.defineProperty(webrtcAdaptorInstance, "enableEffect", {
      value: function value(effectName, deepARApiKey, deepARModel) {
        return videoEffect.enableEffect(effectName, deepARApiKey, deepARModel);
      }
    });
    Object.defineProperty(webrtcAdaptorInstance, "setBackgroundImage", {
      value: function value(imageElement) {
        videoEffect.virtualBackgroundImage = imageElement;
      }
    });
    Object.defineProperty(webrtcAdaptorInstance, "turnOffEffectCamera", {
      value: function value() {
        return videoEffect.turnOffCamera();
      }
    });
    Object.defineProperty(webrtcAdaptorInstance, "turnOnEffectCamera", {
      value: function value(streamId) {
        return videoEffect.turnOnCamera(streamId);
      }
    });
  });

  exports.Logger = Logger$5;
  exports.MediaManager = MediaManager;
  exports.SoundMeter = SoundMeter;
  exports.VideoEffect = VideoEffect;
  exports.WebRTCAdaptor = WebRTCAdaptor;
  exports.WebSocketAdaptor = WebSocketAdaptor;
  exports.getUrlParameter = getUrlParameter;

}));
