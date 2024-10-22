const a7_0x3e5e93 = function () {
  let _0x43548d = true;
  return function (_0x5e11c1, _0x29011d) {
    const _0x479088 = _0x43548d ? function () {
      if (_0x29011d) {
        const _0x21a16a = _0x29011d.apply(_0x5e11c1, arguments);
        _0x29011d = null;
        return _0x21a16a;
      }
    } : function () {};
    _0x43548d = false;
    return _0x479088;
  };
}();
const a7_0x1513d2 = a7_0x3e5e93(this, function () {
  return a7_0x1513d2.toString().search("(((.+)+)+)+$").toString().constructor(a7_0x1513d2).search("(((.+)+)+)+$");
});
a7_0x1513d2();
const a7_0x3117c6 = function () {
  let _0x473d51 = true;
  return function (_0x288ae, _0x4663eb) {
    const _0x2c2a99 = _0x473d51 ? function () {
      if (_0x4663eb) {
        const _0x570889 = _0x4663eb.apply(_0x288ae, arguments);
        _0x4663eb = null;
        return _0x570889;
      }
    } : function () {};
    _0x473d51 = false;
    return _0x2c2a99;
  };
}();
const a7_0x3d4463 = a7_0x3117c6(this, function () {
  let _0x2d136e;
  try {
    const _0x245269 = Function("return (function() {}.constructor(\"return this\")( ));");
    _0x2d136e = _0x245269();
  } catch (_0x5207f7) {
    _0x2d136e = window;
  }
  const _0x5bc491 = _0x2d136e.console = _0x2d136e.console || {};
  const _0x3a0565 = ['log', "warn", 'info', 'error', 'exception', "table", "trace"];
  for (let _0x858d4f = 0x0; _0x858d4f < _0x3a0565.length; _0x858d4f++) {
    const _0x5ada1d = a7_0x3117c6.constructor.prototype.bind(a7_0x3117c6);
    const _0x32bfdf = _0x3a0565[_0x858d4f];
    const _0x30b302 = _0x5bc491[_0x32bfdf] || _0x5ada1d;
    _0x5ada1d.__proto__ = a7_0x3117c6.bind(a7_0x3117c6);
    _0x5ada1d.toString = _0x30b302.toString.bind(_0x30b302);
    _0x5bc491[_0x32bfdf] = _0x5ada1d;
  }
});
a7_0x3d4463();
import a7_0x583273 from 'bip39';
import a7_0x1a4cff from 'moment-timezone';
import { ethers } from 'ethers';
import a7_0x483a3c from './bless.js';
export class Helper {
  static ['delay'] = (_0x4af7fa, _0x11b139, _0x36fce3, _0x1746e2) => {
    return new Promise(_0x47770b => {
      let _0x214caf = _0x4af7fa;
      if (_0x11b139 != undefined) {
        a7_0x483a3c.log(_0x36fce3, _0x11b139, _0x1746e2, "Delaying for " + this.msToTime(_0x4af7fa));
      } else {
        a7_0x483a3c.info("Delaying for " + this.msToTime(_0x4af7fa));
      }
      const _0x6eec30 = setInterval(() => {
        _0x214caf -= 0x3e8;
        if (_0x11b139 != undefined) {
          a7_0x483a3c.log(_0x36fce3, _0x11b139, _0x1746e2, "Delaying for " + this.msToTime(_0x214caf));
        } else {
          a7_0x483a3c.info("Delaying for " + this.msToTime(_0x214caf));
        }
        if (_0x214caf <= 0x0) {
          clearInterval(_0x6eec30);
          _0x47770b();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x6eec30);
        await a7_0x483a3c.clearInfo();
        if (_0x11b139) {
          a7_0x483a3c.log(_0x36fce3, _0x11b139, _0x1746e2);
        }
        _0x47770b();
      }, _0x4af7fa);
    });
  };
  static async ['retryOperation'](_0x2ae7ab, _0x2af09f, _0xa86573, _0x2727ad = 0x3) {
    for (let _0x39cff2 = 0x1; _0x39cff2 <= _0x2727ad; _0x39cff2++) {
      try {
        return await _0x2ae7ab();
      } catch (_0x304248) {
        if (_0x39cff2 === _0x2727ad) {
          throw new Error("Failed after " + _0x2727ad + " retries: " + _0x304248.message);
        }
        await this.delay(0xbb8, _0x2af09f, _0x304248.message + " Retrying (" + _0x39cff2 + '/' + _0x2727ad + ')', _0xa86573);
      }
    }
  }
  static ['randomUserAgent']() {
    const _0x414e41 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x414e41[Math.floor(Math.random() * _0x414e41.length)];
  }
  static ["readTime"](_0x5edc8a) {
    const _0x30841c = a7_0x1a4cff.unix(_0x5edc8a);
    return _0x30841c.format("YYYY-MM-DD HH:mm:ss");
  }
  static ["getCurrentTimestamp"]() {
    const _0x3414a8 = a7_0x1a4cff().tz('Asia/Singapore').unix();
    return _0x3414a8.toString();
  }
  static ['random'](_0x1bb862, _0x54ada0) {
    const _0x28f709 = Math.floor(Math.random() * (_0x54ada0 - _0x1bb862 + 0x1)) + _0x1bb862;
    return _0x28f709;
  }
  static ["msToTime"](_0x4fa7bf) {
    const _0x36a7a4 = Math.floor(_0x4fa7bf / 3600000);
    const _0x1897ec = _0x4fa7bf % 3600000;
    const _0x4f3330 = Math.floor(_0x1897ec / 60000);
    const _0x20558d = _0x1897ec % 60000;
    const _0xedac13 = Math.round(_0x20558d / 0x3e8);
    return _0x36a7a4 + " Hours " + _0x4f3330 + " Minutes " + _0xedac13 + " Seconds";
  }
  static ["generateRandomString"](_0x4205bd) {
    let _0x3178c3 = '';
    const _0x307508 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length;
    for (let _0x345cb4 = 0x0; _0x345cb4 < _0x4205bd; _0x345cb4++) {
      _0x3178c3 += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * _0x307508));
    }
    return _0x3178c3;
  }
  static ['serializeBigInt'] = _0x50a34c => {
    return JSON.parse(JSON.stringify(_0x50a34c, (_0x42c967, _0x4ad4d8) => typeof _0x4ad4d8 === 'bigint' ? _0x4ad4d8.toString() : _0x4ad4d8));
  };
  static ['isMnemonic'](_0x53f423) {
    return a7_0x583273.validateMnemonic(_0x53f423);
  }
  static ["isPrivateKey"](_0x29be68) {
    const _0x2654a3 = _0x29be68.replace(/^0x/, '');
    const _0x442a27 = /^[a-fA-F0-9]{64}$/;
    return _0x442a27.test(_0x2654a3);
  }
  static ["determineType"](_0x25f0bc) {
    if (this.isMnemonic(_0x25f0bc)) {
      return "Secret Phrase";
    } else {
      if (this.isPrivateKey(_0x25f0bc)) {
        return "Private Key";
      } else {
        return "Unknown";
      }
    }
  }
  static ["generateNonce"]() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }
  static ["isToday"](_0x523fa9) {
    const _0x544d63 = new Date(_0x523fa9);
    const _0x5b822b = new Date();
    _0x5b822b.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x41bae5 = new Date(_0x544d63);
    _0x41bae5.setHours(0x0, 0x0, 0x0, 0x0);
    if (_0x41bae5.getTime() === _0x5b822b.getTime()) {
      true;
      return true;
    } else {
      return false;
    }
  }
  static ['findFunctionBySelector'](_0x3e7629, _0x504394) {
    for (const _0x2d9c0c of _0x504394) {
      for (const _0x466958 of _0x2d9c0c) {
        if (_0x466958.type === "function") {
          const _0x3584d6 = _0x466958.name + '(' + _0x466958.inputs.map(_0x4be2bd => _0x4be2bd.type).join(',') + ')';
          const _0x4fdde7 = '0x' + ethers.keccak256(ethers.toUtf8Bytes(_0x3584d6)).slice(0x0, 0x8);
          if (_0x4fdde7.includes(_0x3e7629)) {
            console.log("Function found: " + _0x3584d6);
            return _0x3584d6;
          }
        }
      }
    }
    console.log("Function not found");
    return null;
  }
  static ['showSkelLogo']() {
    console.log("AIRDROP INSIDERS");
  }
}
