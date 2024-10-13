import { createLogger, format, transports } from 'winston';
import a7_0x4ee2c8 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x278411,
  message: _0x84a27c,
  timestamp: _0x4d537e
}) => {
  return _0x4d537e + " [" + _0x278411 + "]: " + _0x84a27c;
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
  ['info'](_0x56f8bb) {
    this.logger.info(_0x56f8bb);
  }
  ["warn"](_0x5c5446) {
    this.logger.warn(_0x5c5446);
  }
  ["error"](_0x5b1123) {
    this.logger.error(_0x5b1123);
  }
  ["debug"](_0x41586b) {
    this.logger.debug(_0x41586b);
  }
  ["setLevel"](_0x2af251) {
    this.logger.level = _0x2af251;
  }
  ["clear"]() {
    a7_0x4ee2c8.truncate("log/app.log", 0x0, _0x43f684 => {
      if (_0x43f684) {
        this.logger.error("Failed to clear the log file: " + _0x43f684.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();
