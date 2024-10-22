import a7_0x2be036 from 'bip39';
import a7_0x3ea457 from 'moment-timezone';
import { ethers } from 'ethers';
import a7_0x1fe3fd from './bless.js';
export class Helper {
  static ['delay'] = (_0x3e3cb1, _0x2a43d1, _0x21c55f, _0x2227d5) => {
    return new Promise(_0x5383bc => {
      let _0x54d3d5 = _0x3e3cb1;
      if (_0x2a43d1 != undefined) {
        a7_0x1fe3fd.log(_0x21c55f, _0x2a43d1, _0x2227d5, "Delaying for " + this.msToTime(_0x3e3cb1));
      } else {
        a7_0x1fe3fd.info("Delaying for " + this.msToTime(_0x3e3cb1));
      }
      const _0x1137a0 = setInterval(() => {
        _0x54d3d5 -= 0x3e8;
        if (_0x2a43d1 != undefined) {
          a7_0x1fe3fd.log(_0x21c55f, _0x2a43d1, _0x2227d5, "Delaying for " + this.msToTime(_0x54d3d5));
        } else {
          a7_0x1fe3fd.info("Delaying for " + this.msToTime(_0x54d3d5));
        }
        if (_0x54d3d5 <= 0x0) {
          clearInterval(_0x1137a0);
          _0x5383bc();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x1137a0);
        await a7_0x1fe3fd.clearInfo();
        if (_0x2a43d1) {
          a7_0x1fe3fd.log(_0x21c55f, _0x2a43d1, _0x2227d5);
        }
        _0x5383bc();
      }, _0x3e3cb1);
    });
  };
  static async ["retryOperation"](_0x156105, _0x4dda19, _0x4c65c1, _0x53f3b9 = 0x3) {
    for (let _0x533487 = 0x1; _0x533487 <= _0x53f3b9; _0x533487++) {
      try {
        return await _0x156105();
      } catch (_0x172495) {
        if (_0x533487 === _0x53f3b9) {
          throw new Error("Failed after " + _0x53f3b9 + " retries: " + _0x172495.message);
        }
        await this.delay(0xbb8, _0x4dda19, _0x172495.message + " Retrying (" + _0x533487 + '/' + _0x53f3b9 + ')', _0x4c65c1);
      }
    }
  }
  static ["randomUserAgent"]() {
    const _0x2a17fe = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x2a17fe[Math.floor(Math.random() * _0x2a17fe.length)];
  }
  static ['readTime'](_0x26d18a) {
    const _0x1031d7 = a7_0x3ea457.unix(_0x26d18a);
    return _0x1031d7.format("YYYY-MM-DD HH:mm:ss");
  }
  static ['getCurrentTimestamp']() {
    const _0x2fa052 = a7_0x3ea457().tz('Asia/Singapore').unix();
    return _0x2fa052.toString();
  }
  static ['random'](_0x399100, _0x26f8bf) {
    const _0x1ce2a9 = Math.floor(Math.random() * (_0x26f8bf - _0x399100 + 0x1)) + _0x399100;
    return _0x1ce2a9;
  }
  static ["msToTime"](_0x3f6280) {
    const _0x553b8a = Math.floor(_0x3f6280 / 3600000);
    const _0x2d43f3 = _0x3f6280 % 3600000;
    const _0x2fc861 = Math.floor(_0x2d43f3 / 60000);
    const _0x3397de = _0x2d43f3 % 60000;
    const _0x4dd110 = Math.round(_0x3397de / 0x3e8);
    return _0x553b8a + " Hours " + _0x2fc861 + " Minutes " + _0x4dd110 + " Seconds";
  }
  static ["generateRandomString"](_0x14057a) {
    let _0x1534bd = '';
    const _0x3bd974 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length;
    for (let _0x2e155c = 0x0; _0x2e155c < _0x14057a; _0x2e155c++) {
      _0x1534bd += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * _0x3bd974));
    }
    return _0x1534bd;
  }
  static ['serializeBigInt'] = _0x40906b => {
    return JSON.parse(JSON.stringify(_0x40906b, (_0x51361e, _0x603bf6) => typeof _0x603bf6 === "bigint" ? _0x603bf6.toString() : _0x603bf6));
  };
  static ['isMnemonic'](_0x2503fa) {
    return a7_0x2be036.validateMnemonic(_0x2503fa);
  }
  static ["isPrivateKey"](_0x5468b4) {
    const _0x49c3ca = _0x5468b4.replace(/^0x/, '');
    const _0x14db41 = /^[a-fA-F0-9]{64}$/;
    return _0x14db41.test(_0x49c3ca);
  }
  static ['determineType'](_0x1b0be5) {
    if (this.isMnemonic(_0x1b0be5)) {
      return "Secret Phrase";
    } else {
      if (this.isPrivateKey(_0x1b0be5)) {
        return "Private Key";
      } else {
        return "Unknown";
      }
    }
  }
  static ["generateNonce"]() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }
  static ["isToday"](_0x49586f) {
    const _0x50c7ba = new Date(_0x49586f);
    const _0x22ff4c = new Date();
    _0x22ff4c.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x48eae8 = new Date(_0x50c7ba);
    _0x48eae8.setHours(0x0, 0x0, 0x0, 0x0);
    if (_0x48eae8.getTime() === _0x22ff4c.getTime()) {
      return true;
    } else {
      return false;
    }
  }
  static ['findFunctionBySelector'](_0x2b6efc, _0x54c96c) {
    for (const _0x5e856b of _0x54c96c) {
      for (const _0x1aa979 of _0x5e856b) {
        if (_0x1aa979.type === "function") {
          const _0x2c4ef4 = _0x1aa979.name + '(' + _0x1aa979.inputs.map(_0x1ee39f => _0x1ee39f.type).join(',') + ')';
          const _0x40e3e3 = '0x' + ethers.keccak256(ethers.toUtf8Bytes(_0x2c4ef4)).slice(0x0, 0x8);
          if (_0x40e3e3.includes(_0x2b6efc)) {
            console.log("Function found: " + _0x2c4ef4);
            return _0x2c4ef4;
          }
        }
      }
    }
    console.log("Function not found");
    return null;
  }
  static ["showSkelLogo"]() {
    console.log("AIRDROP INSIDERS");
  }
}
