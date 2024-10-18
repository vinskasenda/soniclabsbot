import a7_0x4b9209 from 'bip39';
import a7_0xd9bedf from 'moment-timezone';
import { ethers } from 'ethers';
import a7_0x2b7fc8 from './bless.js';
export class Helper {
  static ["delay"] = (_0x3b785c, _0x13f355, _0x4df09b, _0x1c5b18) => {
    return new Promise(_0xb5e3e4 => {
      let _0x5ff634 = _0x3b785c;
      if (_0x13f355 != undefined) {
        a7_0x2b7fc8.log(_0x4df09b, _0x13f355, _0x1c5b18, "Delaying for " + this.msToTime(_0x3b785c));
      } else {
        a7_0x2b7fc8.info("Delaying for " + this.msToTime(_0x3b785c));
      }
      const _0x28eb7e = setInterval(() => {
        _0x5ff634 -= 0x3e8;
        if (_0x13f355 != undefined) {
          a7_0x2b7fc8.log(_0x4df09b, _0x13f355, _0x1c5b18, "Delaying for " + this.msToTime(_0x5ff634));
        } else {
          a7_0x2b7fc8.info("Delaying for " + this.msToTime(_0x5ff634));
        }
        if (_0x5ff634 <= 0x0) {
          clearInterval(_0x28eb7e);
          _0xb5e3e4();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x28eb7e);
        await a7_0x2b7fc8.clearInfo();
        if (_0x13f355) {
          a7_0x2b7fc8.log(_0x4df09b, _0x13f355, _0x1c5b18);
        }
        _0xb5e3e4();
      }, _0x3b785c);
    });
  };
  static ["randomUserAgent"]() {
    const _0xccdfd4 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0xccdfd4[Math.floor(Math.random() * _0xccdfd4.length)];
  }
  static ["readTime"](_0x2152dd) {
    const _0x13a381 = a7_0xd9bedf.unix(_0x2152dd);
    return _0x13a381.format("YYYY-MM-DD HH:mm:ss");
  }
  static ['getCurrentTimestamp']() {
    const _0x25aa64 = a7_0xd9bedf().tz('Asia/Singapore').unix();
    return _0x25aa64.toString();
  }
  static ["random"](_0xf55a8, _0x1a3bc9) {
    const _0x2c2c49 = Math.floor(Math.random() * (_0x1a3bc9 - _0xf55a8 + 0x1)) + _0xf55a8;
    return _0x2c2c49;
  }
  static ["msToTime"](_0x55e141) {
    const _0x26801a = Math.floor(_0x55e141 / 3600000);
    const _0x1938fc = _0x55e141 % 3600000;
    const _0x133fbf = Math.floor(_0x1938fc / 60000);
    const _0xe131cd = _0x1938fc % 60000;
    const _0x2caafa = Math.round(_0xe131cd / 0x3e8);
    return _0x26801a + " Hours " + _0x133fbf + " Minutes " + _0x2caafa + " Seconds";
  }
  static ["generateRandomString"](_0x2c55cc) {
    let _0x6fe5e2 = '';
    const _0x1d57e6 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length;
    for (let _0x2e7f69 = 0x0; _0x2e7f69 < _0x2c55cc; _0x2e7f69++) {
      _0x6fe5e2 += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * _0x1d57e6));
    }
    return _0x6fe5e2;
  }
  static ['serializeBigInt'] = _0x36a59c => {
    return JSON.parse(JSON.stringify(_0x36a59c, (_0x306121, _0x4a35cd) => typeof _0x4a35cd === "bigint" ? _0x4a35cd.toString() : _0x4a35cd));
  };
  static ["isMnemonic"](_0x2a536d) {
    return a7_0x4b9209.validateMnemonic(_0x2a536d);
  }
  static ["isPrivateKey"](_0x72127d) {
    const _0xa54c = _0x72127d.replace(/^0x/, '');
    const _0x34b2af = /^[a-fA-F0-9]{64}$/;
    return _0x34b2af.test(_0xa54c);
  }
  static ["determineType"](_0x512362) {
    if (this.isMnemonic(_0x512362)) {
      return "Secret Phrase";
    } else {
      return this.isPrivateKey(_0x512362) ? "Private Key" : "Unknown";
    }
  }
  static ["generateNonce"]() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }
  static ['isToday'](_0x4d808b) {
    const _0x18f3e5 = new Date(_0x4d808b);
    const _0x7018eb = new Date();
    _0x7018eb.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x30428a = new Date(_0x18f3e5);
    _0x30428a.setHours(0x0, 0x0, 0x0, 0x0);
    return !!(_0x30428a.getTime() === _0x7018eb.getTime());
  }
  static ["findFunctionBySelector"](_0x18fd4a, _0x597f80) {
    for (const _0x3e7545 of _0x597f80) {
      for (const _0x37e1d6 of _0x3e7545) {
        if (_0x37e1d6.type === "function") {
          const _0x502a1b = _0x37e1d6.name + '(' + _0x37e1d6.inputs.map(_0x535451 => _0x535451.type).join(',') + ')';
          const _0x41cc83 = '0x' + ethers.keccak256(ethers.toUtf8Bytes(_0x502a1b)).slice(0x0, 0x8);
          if (_0x41cc83.includes(_0x18fd4a)) {
            console.log("Function found: " + _0x502a1b);
            return _0x502a1b;
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
