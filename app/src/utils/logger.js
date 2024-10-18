import { createLogger, format, transports } from 'winston';
import a8_0x18f11c from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x984f64,
  message: _0x51cbee,
  timestamp: _0x406aa7
}) => {
  return _0x406aa7 + " [" + _0x984f64 + "]: " + _0x51cbee;
});
class Logger {
  constructor() {
    this.logger = createLogger({
      'level': "debug",
      'format': combine(timestamp({
        'format': "YYYY-MM-DD HH:mm:ss"
      }), colorize(), customFormat),
      'transports': [new transports.File({
        'filename': "log/app.log"
      })],
      'exceptionHandlers': [new transports.File({
        'filename': "log/app.log"
      })],
      'rejectionHandlers': [new transports.File({
        'filename': "log/app.log"
      })]
    });
  }
  ["info"](_0x401ef6) {
    this.logger.info(_0x401ef6);
  }
  ["warn"](_0x42dac6) {
    this.logger.warn(_0x42dac6);
  }
  ['error'](_0x29450e) {
    this.logger.error(_0x29450e);
  }
  ["debug"](_0x208916) {
    this.logger.debug(_0x208916);
  }
  ['setLevel'](_0x17370b) {
    this.logger.level = _0x17370b;
  }
  ["clear"]() {
    a8_0x18f11c.truncate("log/app.log", 0x0, _0x103fb4 => {
      if (_0x103fb4) {
        this.logger.error("Failed to clear the log file: " + _0x103fb4.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();
