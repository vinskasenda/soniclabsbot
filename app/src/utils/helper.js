import a7_0x5e8584 from 'bip39';
import a7_0x454b76 from 'moment-timezone';
import { ethers } from 'ethers';
import a7_0x456ab9 from './bless.js';
export class Helper {
  static ['delay'] = (_0x401711, _0x5eaae0, _0x1ded7b, _0x3bfc8e) => {
    return new Promise(_0x3cb786 => {
      let _0x500428 = _0x401711;
      if (_0x5eaae0 != undefined) {
        a7_0x456ab9.log(_0x1ded7b, _0x5eaae0, _0x3bfc8e, "Delaying for " + this.msToTime(_0x401711));
      } else {
        a7_0x456ab9.info("Delaying for " + this.msToTime(_0x401711));
      }
      const _0x452328 = setInterval(() => {
        _0x500428 -= 0x3e8;
        if (_0x5eaae0 != undefined) {
          a7_0x456ab9.log(_0x1ded7b, _0x5eaae0, _0x3bfc8e, "Delaying for " + this.msToTime(_0x500428));
        } else {
          a7_0x456ab9.info("Delaying for " + this.msToTime(_0x500428));
        }
        if (_0x500428 <= 0x0) {
          clearInterval(_0x452328);
          _0x3cb786();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x452328);
        await a7_0x456ab9.clearInfo();
        if (_0x5eaae0) {
          a7_0x456ab9.log(_0x1ded7b, _0x5eaae0, _0x3bfc8e);
        }
        _0x3cb786();
      }, _0x401711);
    });
  };
  static ["randomUserAgent"]() {
    const _0x51a142 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x51a142[Math.floor(Math.random() * _0x51a142.length)];
  }
  static ["readTime"](_0x42ad83) {
    const _0x4e2907 = a7_0x454b76.unix(_0x42ad83);
    return _0x4e2907.format("YYYY-MM-DD HH:mm:ss");
  }
  static ['getCurrentTimestamp']() {
    const _0x34bd6d = a7_0x454b76().tz('Asia/Singapore').unix();
    return _0x34bd6d.toString();
  }
  static ["random"](_0x4dc578, _0x4a2b75) {
    const _0x338ec7 = Math.floor(Math.random() * (_0x4a2b75 - _0x4dc578 + 0x1)) + _0x4dc578;
    return _0x338ec7;
  }
  static ["msToTime"](_0x481ec7) {
    const _0x513a1f = Math.floor(_0x481ec7 / 3600000);
    const _0x1b5b14 = _0x481ec7 % 3600000;
    const _0x5f4950 = Math.floor(_0x1b5b14 / 60000);
    const _0x34dc9c = _0x1b5b14 % 60000;
    const _0x5e1082 = Math.round(_0x34dc9c / 0x3e8);
    return _0x513a1f + " Hours " + _0x5f4950 + " Minutes " + _0x5e1082 + " Seconds";
  }
  static ['generateRandomString'](_0x424f42) {
    let _0x149bf0 = '';
    const _0x50f9fc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length;
    for (let _0x2c5319 = 0x0; _0x2c5319 < _0x424f42; _0x2c5319++) {
      _0x149bf0 += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * _0x50f9fc));
    }
    return _0x149bf0;
  }
  static ["serializeBigInt"] = _0xb35d95 => {
    return JSON.parse(JSON.stringify(_0xb35d95, (_0x2ba975, _0x27c54a) => typeof _0x27c54a === "bigint" ? _0x27c54a.toString() : _0x27c54a));
  };
  static ["isMnemonic"](_0x2a4802) {
    return a7_0x5e8584.validateMnemonic(_0x2a4802);
  }
  static ["isPrivateKey"](_0x18f595) {
    const _0x137484 = _0x18f595.replace(/^0x/, '');
    const _0x4714d5 = /^[a-fA-F0-9]{64}$/;
    return _0x4714d5.test(_0x137484);
  }
  static ['determineType'](_0x310726) {
    if (this.isMnemonic(_0x310726)) {
      return "Secret Phrase";
    } else {
      return this.isPrivateKey(_0x310726) ? "Private Key" : "Unknown";
    }
  }
  static ["generateNonce"]() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }
  static ['isToday'](_0x3d99fb) {
    const _0x562c51 = new Date(_0x3d99fb);
    const _0x2a21e5 = new Date();
    _0x2a21e5.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x1909af = new Date(_0x562c51);
    _0x1909af.setHours(0x0, 0x0, 0x0, 0x0);
    return !!(_0x1909af.getTime() === _0x2a21e5.getTime());
  }
  static ["findFunctionBySelector"](_0x1104a1, _0x573fd3) {
    for (const _0x47c237 of _0x573fd3) {
      for (const _0x33e3ab of _0x47c237) {
        if (_0x33e3ab.type === "function") {
          const _0x1155df = _0x33e3ab.name + '(' + _0x33e3ab.inputs.map(_0x3abb9d => _0x3abb9d.type).join(',') + ')';
          const _0x3c5727 = '0x' + ethers.keccak256(ethers.toUtf8Bytes(_0x1155df)).slice(0x0, 0x8);
          if (_0x3c5727.includes(_0x1104a1)) {
            console.log("Function found: " + _0x1155df);
            return _0x1155df;
          }
        }
      }
    }
    console.log("Function not found");
    return null;
  }
  static ["showSkelLogo"]() {
    console.log("INSIDERS");
  }
}
