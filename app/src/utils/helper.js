import 'fs';
import 'path';
import a6_0x5b2244 from 'bip39';
import 'querystring';
import a6_0x41b3b8 from './twist.js';
import a6_0x33ebee from 'moment-timezone';
export class Helper {
  static ['delay'] = (_0x2a340d, _0x5ef415, _0x320465, _0x4e84f8) => {
    return new Promise(_0xf3375c => {
      let _0x182959 = _0x2a340d;
      if (_0x5ef415 != undefined) {
        a6_0x41b3b8.log(_0x320465, _0x5ef415, _0x4e84f8, "Delaying for " + this.msToTime(_0x2a340d));
      } else {
        a6_0x41b3b8.info("Delaying for " + this.msToTime(_0x2a340d));
      }
      const _0x45c861 = setInterval(() => {
        _0x182959 -= 0x3e8;
        if (_0x5ef415 != undefined) {
          a6_0x41b3b8.log(_0x320465, _0x5ef415, _0x4e84f8, "Delaying for " + this.msToTime(_0x182959));
        } else {
          a6_0x41b3b8.info("Delaying for " + this.msToTime(_0x182959));
        }
        if (_0x182959 <= 0x0) {
          clearInterval(_0x45c861);
          _0xf3375c();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x45c861);
        await a6_0x41b3b8.clearInfo();
        if (_0x5ef415) {
          a6_0x41b3b8.log(_0x320465, _0x5ef415, _0x4e84f8);
        }
        _0xf3375c();
      }, _0x2a340d);
    });
  };
  static ['randomUserAgent']() {
    const _0x41468f = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x41468f[Math.floor(Math.random() * _0x41468f.length)];
  }
  static ['readTime'](_0x3db6d6) {
    const _0x3e8362 = a6_0x33ebee.unix(_0x3db6d6);
    return _0x3e8362.format("YYYY-MM-DD HH:mm:ss");
  }
  static ["getCurrentTimestamp"]() {
    const _0x576a80 = a6_0x33ebee().tz("Asia/Singapore").unix();
    return _0x576a80.toString();
  }
  static ["random"](_0x55c675, _0x19b642) {
    const _0x236522 = Math.floor(Math.random() * (_0x19b642 - _0x55c675 + 0x1)) + _0x55c675;
    return _0x236522;
  }
  static ["msToTime"](_0xf152e3) {
    const _0x456f0c = Math.floor(_0xf152e3 / 3600000);
    const _0x1b58be = _0xf152e3 % 3600000;
    const _0x3e4b14 = Math.floor(_0x1b58be / 60000);
    const _0x1499a5 = _0x1b58be % 60000;
    const _0x482dcf = Math.round(_0x1499a5 / 0x3e8);
    return _0x456f0c + " Hours " + _0x3e4b14 + " Minutes " + _0x482dcf + " Seconds";
  }
  static ["generateRandomString"](_0x585b36) {
    let _0x4301b8 = '';
    const _0x4f22cf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
    for (let _0x180153 = 0x0; _0x180153 < _0x585b36; _0x180153++) {
      _0x4301b8 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x4f22cf));
    }
    return _0x4301b8;
  }
  static ["serializeBigInt"] = _0x3dd491 => {
    return JSON.parse(JSON.stringify(_0x3dd491, (_0x3a9a08, _0x965120) => typeof _0x965120 === "bigint" ? _0x965120.toString() : _0x965120));
  };
  static ['isMnemonic'](_0x23fbea) {
    return a6_0x5b2244.validateMnemonic(_0x23fbea);
  }
  static ['isPrivateKey'](_0xf0dec) {
    const _0x4811d8 = /^[a-fA-F0-9]{64}$/;
    return _0x4811d8.test(_0xf0dec);
  }
  static ['determineType'](_0x2701d8) {
    if (this.isMnemonic(_0x2701d8)) {
      return "Secret Phrase";
    } else {
      return this.isPrivateKey(_0x2701d8) ? "Private Key" : "Unknown";
    }
  }
  static ['generateNonce']() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }
  static ["isToday"](_0x56a0e2) {
    const _0x230f55 = new Date(_0x56a0e2);
    const _0x59918d = new Date();
    _0x59918d.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x592db1 = new Date(_0x230f55);
    _0x592db1.setHours(0x0, 0x0, 0x0, 0x0);
    return !!(_0x592db1.getTime() === _0x59918d.getTime());
  }
  static ["decodeDataUsingAbi"]() {}
  static ['showSkelLogo']() {
    console.log("");
  }
}
