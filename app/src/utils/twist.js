import { Twisters } from 'twisters';
import './helper.js';
import a8_0x4a7f81 from './logger.js';
import a8_0x4076a3 from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ["log"](_0x2c25ae = '', _0x5d7cc6 = '', _0xa2ace7 = new a8_0x4076a3(), _0x15f230) {
    const _0x34d3ea = privateKey.find(_0x4109a9 => _0x4109a9.pk == _0x5d7cc6);
    const _0x3d3371 = privateKey.indexOf(_0x34d3ea);
    if (_0x15f230 == undefined) {
      a8_0x4a7f81.info("Account " + (_0x3d3371 + 0x1) + " - " + _0x2c25ae);
      _0x15f230 = '-';
    }
    const _0x4117e6 = _0xa2ace7.address ?? '-';
    const _0x4bbd22 = _0xa2ace7.balance ?? '-';
    const _0x31f99b = _0xa2ace7.point ?? {};
    const _0x315b6f = _0x31f99b.totalPoints ?? '-';
    const _0x312116 = _0x31f99b.today ?? '-';
    this.twisters.put(_0x5d7cc6, {
      'text': "\n================== Account " + (_0x3d3371 + 0x1) + " =================\nAddress      : " + _0x4117e6 + "\nBalance      : " + _0x4bbd22 + " " + RPC.SYMBOL + "\nPoint        : Total " + _0x315b6f + " | Today " + _0x312116 + "\n\nStatus : " + _0x2c25ae + "\nDelay : " + _0x15f230 + "\n=============================================="
    });
  }
  ['info'](_0x52d71d = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0x52d71d + "\n=============================================="
    });
    return;
  }
  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }
  ['clear'](_0x2d0cee) {
    this.twisters.remove(_0x2d0cee);
  }
}
export default new Twist();
