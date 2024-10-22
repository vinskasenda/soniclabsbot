const a8_0x237ba0 = function () {
  let _0x10654f = true;
  return function (_0x589fbf, _0x1c97ab) {
    const _0x5cfd9b = _0x10654f ? function () {
      if (_0x1c97ab) {
        const _0x33f97a = _0x1c97ab.apply(_0x589fbf, arguments);
        _0x1c97ab = null;
        return _0x33f97a;
      }
    } : function () {};
    _0x10654f = false;
    return _0x5cfd9b;
  };
}();
const a8_0xb7183f = a8_0x237ba0(this, function () {
  return a8_0xb7183f.toString().search('(((.+)+)+)+$').toString().constructor(a8_0xb7183f).search('(((.+)+)+)+$');
});
a8_0xb7183f();
const a8_0x3fe679 = function () {
  let _0x154453 = true;
  return function (_0x7e1295, _0x2355f4) {
    const _0x19930f = _0x154453 ? function () {
      if (_0x2355f4) {
        const _0x183c83 = _0x2355f4.apply(_0x7e1295, arguments);
        _0x2355f4 = null;
        return _0x183c83;
      }
    } : function () {};
    _0x154453 = false;
    return _0x19930f;
  };
}();
const a8_0x506694 = a8_0x3fe679(this, function () {
  let _0xdd0c90;
  try {
    const _0x450c27 = Function("return (function() {}.constructor(\"return this\")( ));");
    _0xdd0c90 = _0x450c27();
  } catch (_0x3f4015) {
    _0xdd0c90 = window;
  }
  const _0x2a27b2 = _0xdd0c90.console = _0xdd0c90.console || {};
  const _0x49c1d1 = ["log", 'warn', "info", 'error', 'exception', "table", 'trace'];
  for (let _0x265a57 = 0x0; _0x265a57 < _0x49c1d1.length; _0x265a57++) {
    const _0x381fc8 = a8_0x3fe679.constructor.prototype.bind(a8_0x3fe679);
    const _0x55f39f = _0x49c1d1[_0x265a57];
    const _0x38925d = _0x2a27b2[_0x55f39f] || _0x381fc8;
    _0x381fc8.__proto__ = a8_0x3fe679.bind(a8_0x3fe679);
    _0x381fc8.toString = _0x38925d.toString.bind(_0x38925d);
    _0x2a27b2[_0x55f39f] = _0x381fc8;
  }
});
a8_0x506694();
import { createLogger, format, transports } from 'winston';
import a8_0x12f590 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x496e3a,
  message: _0x5a0363,
  timestamp: _0xad16a6
}) => {
  return _0xad16a6 + " [" + _0x496e3a + "]: " + _0x5a0363;
});
class Logger {
  constructor() {
    this.logger = createLogger({
      'level': 'debug',
      'format': combine(timestamp({
        'format': "YYYY-MM-DD HH:mm:ss"
      }), colorize(), customFormat),
      'transports': [new transports.File({
        'filename': "log/app.log"
      })],
      'exceptionHandlers': [new transports.File({
        'filename': 'log/app.log'
      })],
      'rejectionHandlers': [new transports.File({
        'filename': 'log/app.log'
      })]
    });
  }
  ["info"](_0xcf8ec0) {
    this.logger.info(_0xcf8ec0);
  }
  ['warn'](_0x30cf60) {
    this.logger.warn(_0x30cf60);
  }
  ['error'](_0x3092ec) {
    this.logger.error(_0x3092ec);
  }
  ['debug'](_0x5f4f9f) {
    this.logger.debug(_0x5f4f9f);
  }
  ['setLevel'](_0x36a62e) {
    this.logger.level = _0x36a62e;
  }
  ["clear"]() {
    a8_0x12f590.truncate('log/app.log', 0x0, _0x557ba4 => {
      if (_0x557ba4) {
        this.logger.error("Failed to clear the log file: " + _0x557ba4.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();
