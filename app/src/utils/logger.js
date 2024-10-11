import { createLogger, format, transports } from 'winston';
import a7_0x2fdfdc from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x2f0e61,
  message: _0x41472e,
  timestamp: _0x4f27b1
}) => {
  return _0x4f27b1 + " [" + _0x2f0e61 + "]: " + _0x41472e;
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
        'filename': "log/app.log"
      })]
    });
  }
  ["info"](_0x550524) {
    this.logger.info(_0x550524);
  }
  ["warn"](_0x25fee5) {
    this.logger.warn(_0x25fee5);
  }
  ["error"](_0x4ce2d7) {
    this.logger.error(_0x4ce2d7);
  }
  ["debug"](_0x5699b1) {
    this.logger.debug(_0x5699b1);
  }
  ['setLevel'](_0x2f2f23) {
    this.logger.level = _0x2f2f23;
  }
  ["clear"]() {
    a7_0x2fdfdc.truncate("log/app.log", 0x0, _0x5ee33c => {
      if (_0x5ee33c) {
        this.logger.error("Failed to clear the log file: " + _0x5ee33c.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();