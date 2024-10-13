import { Twisters } from 'twisters';
import './helper.js';
import a8_0x2b848d from './logger.js';
import a8_0x4fdc4d from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ['log'](_0x473819 = '', _0x19fcde = '', _0x552abc = new a8_0x4fdc4d(), _0x5e0f7d) {
    if (_0x5e0f7d == undefined) {
      a8_0x2b848d.info("Account " + (privateKey.indexOf(_0x19fcde) + 0x1) + " - " + _0x473819);
      _0x5e0f7d = '-';
    }
    const _0x256172 = _0x552abc.address ?? '-';
    const _0x22977f = _0x552abc.balance ?? '-';
    const _0x4efdd1 = _0x552abc.point ?? {};
    const _0x3dce94 = _0x4efdd1.totalPoints ?? '-';
    const _0x1fcfc9 = _0x4efdd1.today ?? '-';
    this.twisters.put(_0x19fcde, {
      'text': "\n================== Account " + (privateKey.indexOf(_0x19fcde) + 0x1) + " =================\nAddress      : " + _0x256172 + "\nBalance      : " + _0x22977f + " " + RPC.SYMBOL + "\nPoint        : Total " + _0x3dce94 + " | Today " + _0x1fcfc9 + "\n\nStatus : " + _0x473819 + "\nDelay : " + _0x5e0f7d + "\n=============================================="
    });
  }
  ["info"](_0x25250f = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0x25250f + "\n=============================================="
    });
    return;
  }
  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }
  ["clear"](_0x2cffe2) {
    this.twisters.remove(_0x2cffe2);
  }
}
export default new Twist();
