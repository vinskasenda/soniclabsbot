import 'fs';
import 'path';
import a6_0x2ab2c8 from 'bip39';
import 'querystring';
import a6_0x314924 from './twist.js';
import a6_0x588615 from 'moment-timezone';
export class Helper {
  static ["delay"] = (_0x442e17, _0x32cc45, _0x510b20, _0x56d950) => {
    return new Promise(_0x5547c4 => {
      let _0x1ad492 = _0x442e17;
      if (_0x32cc45 != undefined) {
        a6_0x314924.log(_0x510b20, _0x32cc45, _0x56d950, "Delaying for " + this.msToTime(_0x442e17));
      } else {
        a6_0x314924.info("Delaying for " + this.msToTime(_0x442e17));
      }
      const _0x5359f5 = setInterval(() => {
        _0x1ad492 -= 0x3e8;
        if (_0x32cc45 != undefined) {
          a6_0x314924.log(_0x510b20, _0x32cc45, _0x56d950, "Delaying for " + this.msToTime(_0x1ad492));
        } else {
          a6_0x314924.info("Delaying for " + this.msToTime(_0x1ad492));
        }
        if (_0x1ad492 <= 0x0) {
          clearInterval(_0x5359f5);
          _0x5547c4();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x5359f5);
        await a6_0x314924.clearInfo();
        if (_0x32cc45) {
          a6_0x314924.log(_0x510b20, _0x32cc45, _0x56d950);
        }
        _0x5547c4();
      }, _0x442e17);
    });
  };
  static ["randomUserAgent"]() {
    const _0x9693c7 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x9693c7[Math.floor(Math.random() * _0x9693c7.length)];
  }
  static ["readTime"](_0x55cfda) {
    const _0xbf1773 = a6_0x588615.unix(_0x55cfda);
    return _0xbf1773.format("YYYY-MM-DD HH:mm:ss");
  }
  static ['getCurrentTimestamp']() {
    const _0x4089ca = a6_0x588615().tz("Asia/Singapore").unix();
    return _0x4089ca.toString();
  }
  static ["random"](_0x24554f, _0x28da0a) {
    const _0x41578d = Math.floor(Math.random() * (_0x28da0a - _0x24554f + 0x1)) + _0x24554f;
    return _0x41578d;
  }
  static ["msToTime"](_0x153fa9) {
    const _0x1e0b28 = Math.floor(_0x153fa9 / 3600000);
    const _0x255aa8 = _0x153fa9 % 3600000;
    const _0x349b03 = Math.floor(_0x255aa8 / 60000);
    const _0x14baff = _0x255aa8 % 60000;
    const _0x4742b9 = Math.round(_0x14baff / 0x3e8);
    return _0x1e0b28 + " Hours " + _0x349b03 + " Minutes " + _0x4742b9 + " Seconds";
  }
  static ['generateRandomString'](_0x1a84e4) {
    let _0x1894e8 = '';
    const _0x31d1da = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
    for (let _0x139313 = 0x0; _0x139313 < _0x1a84e4; _0x139313++) {
      _0x1894e8 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x31d1da));
    }
    return _0x1894e8;
  }
  static ["serializeBigInt"] = _0x248dad => {
    return JSON.parse(JSON.stringify(_0x248dad, (_0x188581, _0x4096a5) => typeof _0x4096a5 === "bigint" ? _0x4096a5.toString() : _0x4096a5));
  };
  static ["isMnemonic"](_0x2a6db6) {
    return a6_0x2ab2c8.validateMnemonic(_0x2a6db6);
  }
  static ["isPrivateKey"](_0x4e74bb) {
    const _0x470b53 = /^[a-fA-F0-9]{64}$/;
    return _0x470b53.test(_0x4e74bb);
  }
  static ["determineType"](_0xdd26cc) {
    if (this.isMnemonic(_0xdd26cc)) {
      return "Secret Phrase";
    } else {
      return this.isPrivateKey(_0xdd26cc) ? "Private Key" : "Unknown";
    }
  }
  static ["generateNonce"]() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }
  static ["isToday"](_0x526f08) {
    const _0xa5ac2e = new Date(_0x526f08);
    const _0x5c7529 = new Date();
    _0x5c7529.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x3bfc69 = new Date(_0xa5ac2e);
    _0x3bfc69.setHours(0x0, 0x0, 0x0, 0x0);
    return !!(_0x3bfc69.getTime() === _0x5c7529.getTime());
  }
  static ['decodeDataUsingAbi']() {}
  static ["showSkelLogo"]() {
    console.log("");
  }
}