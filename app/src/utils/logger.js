import { createLogger, format, transports } from 'winston';
import a8_0x526e9b from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x5390d2,
  message: _0x45b540,
  timestamp: _0x33f2d1
}) => {
  return _0x33f2d1 + " [" + _0x5390d2 + "]: " + _0x45b540;
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
        'filename': 'log/app.log'
      })]
    });
  }
  ["info"](_0x15e80d) {
    this.logger.info(_0x15e80d);
  }
  ["warn"](_0x2f3152) {
    this.logger.warn(_0x2f3152);
  }
  ["error"](_0x23269b) {
    this.logger.error(_0x23269b);
  }
  ['debug'](_0xf21483) {
    this.logger.debug(_0xf21483);
  }
  ['setLevel'](_0x2f17a6) {
    this.logger.level = _0x2f17a6;
  }
  ["clear"]() {
    a8_0x526e9b.truncate("log/app.log", 0x0, _0x69dac8 => {
      if (_0x69dac8) {
        this.logger.error("Failed to clear the log file: " + _0x69dac8.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();
