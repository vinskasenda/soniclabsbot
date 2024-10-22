import a7_0x23af4d from 'bip39';
import a7_0x3f590d from 'moment-timezone';
import { ethers } from 'ethers';
import a7_0x20f989 from './bless.js';
export class Helper {
  static ["delay"] = (_0x27ae48, _0x4b7696, _0x225929, _0x781a6) => {
    return new Promise(_0x3315cb => {
      let _0x1e6d11 = _0x27ae48;
      if (_0x4b7696 != undefined) {
        a7_0x20f989.log(_0x225929, _0x4b7696, _0x781a6, "Delaying for " + this.msToTime(_0x27ae48));
      } else {
        a7_0x20f989.info("Delaying for " + this.msToTime(_0x27ae48));
      }
      const _0x2cd60f = setInterval(() => {
        _0x1e6d11 -= 0x3e8;
        if (_0x4b7696 != undefined) {
          a7_0x20f989.log(_0x225929, _0x4b7696, _0x781a6, "Delaying for " + this.msToTime(_0x1e6d11));
        } else {
          a7_0x20f989.info("Delaying for " + this.msToTime(_0x1e6d11));
        }
        if (_0x1e6d11 <= 0x0) {
          clearInterval(_0x2cd60f);
          _0x3315cb();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x2cd60f);
        await a7_0x20f989.clearInfo();
        if (_0x4b7696) {
          a7_0x20f989.log(_0x225929, _0x4b7696, _0x781a6);
        }
        _0x3315cb();
      }, _0x27ae48);
    });
  };
  static async ["retryOperation"](_0x26d6c6, _0x593523, _0xebb0b8, _0x5b8d3e = 0x3) {
    for (let _0x2210e6 = 0x1; _0x2210e6 <= _0x5b8d3e; _0x2210e6++) {
      try {
        return await _0x26d6c6();
      } catch (_0x806ccd) {
        if (_0x2210e6 === _0x5b8d3e) {
          throw new Error("Failed after " + _0x5b8d3e + " retries: " + _0x806ccd.message);
        }
        await this.delay(0xbb8, _0x593523, _0x806ccd.message + " Retrying (" + _0x2210e6 + '/' + _0x5b8d3e + ')', _0xebb0b8);
      }
    }
  }
  static ['randomUserAgent']() {
    const _0x201646 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x201646[Math.floor(Math.random() * _0x201646.length)];
  }
  static ['readTime'](_0x4f2a03) {
    const _0x3ac88c = a7_0x3f590d.unix(_0x4f2a03);
    return _0x3ac88c.format("YYYY-MM-DD HH:mm:ss");
  }
  static ["getCurrentTimestamp"]() {
    const _0x4ee430 = a7_0x3f590d().tz('Asia/Singapore').unix();
    return _0x4ee430.toString();
  }
  static ["random"](_0x20e132, _0x9d19ab) {
    const _0x1273da = Math.floor(Math.random() * (_0x9d19ab - _0x20e132 + 0x1)) + _0x20e132;
    return _0x1273da;
  }
  static ["msToTime"](_0x5390c9) {
    const _0x2c9d91 = Math.floor(_0x5390c9 / 3600000);
    const _0x52e109 = _0x5390c9 % 3600000;
    const _0x104364 = Math.floor(_0x52e109 / 60000);
    const _0x1c9931 = _0x52e109 % 60000;
    const _0x58ec9a = Math.round(_0x1c9931 / 0x3e8);
    return _0x2c9d91 + " Hours " + _0x104364 + " Minutes " + _0x58ec9a + " Seconds";
  }
  static ["generateRandomString"](_0x3467d2) {
    let _0x10553e = '';
    const _0xa8b0bc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
    for (let _0x410703 = 0x0; _0x410703 < _0x3467d2; _0x410703++) {
      _0x10553e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0xa8b0bc));
    }
    return _0x10553e;
  }
  static ["serializeBigInt"] = _0x50586a => {
    return JSON.parse(JSON.stringify(_0x50586a, (_0x574e3e, _0x128707) => typeof _0x128707 === "bigint" ? _0x128707.toString() : _0x128707));
  };
  static ["isMnemonic"](_0x571e1d) {
    return a7_0x23af4d.validateMnemonic(_0x571e1d);
  }
  static ["isPrivateKey"](_0x5c9f68) {
    const _0x4dcb05 = _0x5c9f68.replace(/^0x/, '');
    const _0x43abaa = /^[a-fA-F0-9]{64}$/;
    return _0x43abaa.test(_0x4dcb05);
  }
  static ["determineType"](_0x3d4d8a) {
    if (this.isMnemonic(_0x3d4d8a)) {
      return "Secret Phrase";
    } else {
      return this.isPrivateKey(_0x3d4d8a) ? "Private Key" : "Unknown";
    }
  }
  static ["generateNonce"]() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }
  static ["isToday"](_0x4dd4c1) {
    const _0x3a30cc = new Date(_0x4dd4c1);
    const _0x4465a3 = new Date();
    _0x4465a3.setHours(0x0, 0x0, 0x0, 0x0);
    const _0xab63bb = new Date(_0x3a30cc);
    _0xab63bb.setHours(0x0, 0x0, 0x0, 0x0);
    return !!(_0xab63bb.getTime() === _0x4465a3.getTime());
  }
  static ["findFunctionBySelector"](_0x357638, _0x206332) {
    for (const _0x265644 of _0x206332) {
      for (const _0x2da41a of _0x265644) {
        if (_0x2da41a.type === "function") {
          const _0x4b2b25 = _0x2da41a.name + '(' + _0x2da41a.inputs.map(_0x88cf3a => _0x88cf3a.type).join(',') + ')';
          const _0x385118 = '0x' + ethers.keccak256(ethers.toUtf8Bytes(_0x4b2b25)).slice(0x0, 0x8);
          if (_0x385118.includes(_0x357638)) {
            console.log("Function found: " + _0x4b2b25);
            return _0x4b2b25;
          }
        }
      }
    }
    console.log("Function not found");
    return null;
  }
  static ["showSkelLogo"]() {
    console.log("AIRDROP INSIDER");
  }
}
