import { createLogger, format, transports } from 'winston';
import a8_0x395c75 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x44f682,
  message: _0x3dc992,
  timestamp: _0x4356d2
}) => {
  return _0x4356d2 + " [" + _0x44f682 + "]: " + _0x3dc992;
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
  ["info"](_0x7cb3c7) {
    this.logger.info(_0x7cb3c7);
  }
  ["warn"](_0x4b59e0) {
    this.logger.warn(_0x4b59e0);
  }
  ['error'](_0x5e2165) {
    this.logger.error(_0x5e2165);
  }
  ["debug"](_0x13bdfb) {
    this.logger.debug(_0x13bdfb);
  }
  ["setLevel"](_0x2692b9) {
    this.logger.level = _0x2692b9;
  }
  ["clear"]() {
    a8_0x395c75.truncate("log/app.log", 0x0, _0x38d570 => {
      if (_0x38d570) {
        this.logger.error("Failed to clear the log file: " + _0x38d570.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();
