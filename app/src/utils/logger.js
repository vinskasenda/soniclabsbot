import { createLogger, format, transports } from 'winston';
import a7_0x2eddf2 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x116e70,
  message: _0x42afd2,
  timestamp: _0x370b43
}) => {
  return _0x370b43 + " [" + _0x116e70 + "]: " + _0x42afd2;
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
  ["info"](_0x180620) {
    this.logger.info(_0x180620);
  }
  ['warn'](_0x23a3be) {
    this.logger.warn(_0x23a3be);
  }
  ["error"](_0x6bcd6d) {
    this.logger.error(_0x6bcd6d);
  }
  ["debug"](_0x363660) {
    this.logger.debug(_0x363660);
  }
  ["setLevel"](_0x470a0c) {
    this.logger.level = _0x470a0c;
  }
  ["clear"]() {
    a7_0x2eddf2.truncate("log/app.log", 0x0, _0x165984 => {
      if (_0x165984) {
        this.logger.error("Failed to clear the log file: " + _0x165984.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();
