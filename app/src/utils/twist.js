import { Twisters } from 'twisters';
import './helper.js';
import a8_0x544916 from './logger.js';
import a8_0x26de30 from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ["log"](_0x4d429d = '', _0x1699ce = '', _0x1f937c = new a8_0x26de30(), _0x52eb05) {
    if (_0x52eb05 == undefined) {
      a8_0x544916.info("Account " + (privateKey.indexOf(_0x1699ce) + 0x1) + " - " + _0x4d429d);
      _0x52eb05 = '-';
    }
    const _0xd50cc0 = _0x1f937c.address ?? '-';
    const _0x307e0a = _0x1f937c.balance ?? '-';
    this.twisters.put(_0x1699ce, {
      'text': "\n================== Account " + (privateKey.indexOf(_0x1699ce) + 0x1) + " =================\nAddress      : " + _0xd50cc0 + "\nBalance      : " + _0x307e0a + " " + RPC.SYMBOL + "\n\nStatus : " + _0x4d429d + "\nDelay : " + _0x52eb05 + "\n=============================================="
    });
  }
  ["info"](_0x52685e = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0x52685e + "\n=============================================="
    });
    return;
  }
  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }
  ["clear"](_0x527e1e) {
    this.twisters.remove(_0x527e1e);
  }
}
export default new Twist();