import { createLogger, format, transports } from 'winston';
import a8_0x2b29f5 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x196bb1,
  message: _0x4a832d,
  timestamp: _0x55075a
}) => {
  return _0x55075a + " [" + _0x196bb1 + "]: " + _0x4a832d;
});
class Logger {
  constructor() {
    this.logger = createLogger({
      'level': 'debug',
      'format': combine(timestamp({
        'format': "YYYY-MM-DD HH:mm:ss"
      }), colorize(), customFormat),
      'transports': [new transports.File({
        'filename': 'log/app.log'
      })],
      'exceptionHandlers': [new transports.File({
        'filename': "log/app.log"
      })],
      'rejectionHandlers': [new transports.File({
        'filename': 'log/app.log'
      })]
    });
  }
  ['info'](_0x5158d3) {
    this.logger.info(_0x5158d3);
  }
  ['warn'](_0xd81339) {
    this.logger.warn(_0xd81339);
  }
  ["error"](_0xb4b1d5) {
    this.logger.error(_0xb4b1d5);
  }
  ['debug'](_0x475a83) {
    this.logger.debug(_0x475a83);
  }
  ["setLevel"](_0x5ecb68) {
    this.logger.level = _0x5ecb68;
  }
  ['clear']() {
    a8_0x2b29f5.truncate("log/app.log", 0x0, _0x33160d => {
      if (_0x33160d) {
        this.logger.error("Failed to clear the log file: " + _0x33160d.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();
