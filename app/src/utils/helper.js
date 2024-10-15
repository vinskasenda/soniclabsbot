import 'fs';
import 'path';
import a6_0x310f73 from 'bip39';
import 'querystring';
import a6_0xd6867d from './twist.js';
import a6_0x46da4d from 'moment-timezone';
import { ethers } from 'ethers';
export class Helper {
  static ["delay"] = (_0x445ada, _0x197b4b, _0x3552c, _0x3e3251) => {
    return new Promise(_0x4e5d96 => {
      let _0x12cb5b = _0x445ada;
      if (_0x197b4b != undefined) {
        a6_0xd6867d.log(_0x3552c, _0x197b4b, _0x3e3251, "Delaying for " + this.msToTime(_0x445ada));
      } else {
        a6_0xd6867d.info("Delaying for " + this.msToTime(_0x445ada));
      }
      const _0x37ac35 = setInterval(() => {
        _0x12cb5b -= 0x3e8;
        if (_0x197b4b != undefined) {
          a6_0xd6867d.log(_0x3552c, _0x197b4b, _0x3e3251, "Delaying for " + this.msToTime(_0x12cb5b));
        } else {
          a6_0xd6867d.info("Delaying for " + this.msToTime(_0x12cb5b));
        }
        if (_0x12cb5b <= 0x0) {
          clearInterval(_0x37ac35);
          _0x4e5d96();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x37ac35);
        await a6_0xd6867d.clearInfo();
        if (_0x197b4b) {
          a6_0xd6867d.log(_0x3552c, _0x197b4b, _0x3e3251);
        }
        _0x4e5d96();
      }, _0x445ada);
    });
  };
  static ["randomUserAgent"]() {
    const _0x295578 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x295578[Math.floor(Math.random() * _0x295578.length)];
  }
  static ["readTime"](_0x3708bc) {
    const _0x4cd6ab = a6_0x46da4d.unix(_0x3708bc);
    return _0x4cd6ab.format("YYYY-MM-DD HH:mm:ss");
  }
  static ["getCurrentTimestamp"]() {
    const _0x3a1a22 = a6_0x46da4d().tz('Asia/Singapore').unix();
    return _0x3a1a22.toString();
  }
  static ["random"](_0x148329, _0x1132ee) {
    const _0x3bf66f = Math.floor(Math.random() * (_0x1132ee - _0x148329 + 0x1)) + _0x148329;
    return _0x3bf66f;
  }
  static ["msToTime"](_0x57160b) {
    const _0x17ed80 = Math.floor(_0x57160b / 3600000);
    const _0x256ab7 = _0x57160b % 3600000;
    const _0x8e104f = Math.floor(_0x256ab7 / 60000);
    const _0x2a7429 = _0x256ab7 % 60000;
    const _0x181fa7 = Math.round(_0x2a7429 / 0x3e8);
    return _0x17ed80 + " Hours " + _0x8e104f + " Minutes " + _0x181fa7 + " Seconds";
  }
  static ["generateRandomString"](_0x23bbaf) {
    let _0x1af053 = '';
    const _0x11025d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
    for (let _0x4ce713 = 0x0; _0x4ce713 < _0x23bbaf; _0x4ce713++) {
      _0x1af053 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x11025d));
    }
    return _0x1af053;
  }
  static ["serializeBigInt"] = _0x5a7ff7 => {
    return JSON.parse(JSON.stringify(_0x5a7ff7, (_0x586903, _0x58a727) => typeof _0x58a727 === "bigint" ? _0x58a727.toString() : _0x58a727));
  };
  static ['isMnemonic'](_0x39a64a) {
    return a6_0x310f73.validateMnemonic(_0x39a64a);
  }
  static ["isPrivateKey"](_0x54717c) {
    const _0x142c75 = /^[a-fA-F0-9]{64}$/;
    return _0x142c75.test(_0x54717c);
  }
  static ['determineType'](_0x5ac911) {
    if (this.isMnemonic(_0x5ac911)) {
      return "Secret Phrase";
    } else {
      return this.isPrivateKey(_0x5ac911) ? "Private Key" : 'Unknown';
    }
  }
  static ["generateNonce"]() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }
  static ["isToday"](_0x69b23e) {
    const _0x1c3809 = new Date(_0x69b23e);
    const _0xbe9b2f = new Date();
    _0xbe9b2f.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x31421f = new Date(_0x1c3809);
    _0x31421f.setHours(0x0, 0x0, 0x0, 0x0);
    return !!(_0x31421f.getTime() === _0xbe9b2f.getTime());
  }
  static ["findFunctionBySelector"](_0x1f9e41, _0x5eb90b) {
    for (const _0x4287ba of _0x5eb90b) {
      for (const _0x2567e of _0x4287ba) {
        if (_0x2567e.type === "function") {
          const _0x3248f1 = _0x2567e.name + '(' + _0x2567e.inputs.map(_0x4fa5e8 => _0x4fa5e8.type).join(',') + ')';
          const _0x3b4ca4 = '0x' + ethers.keccak256(ethers.toUtf8Bytes(_0x3248f1)).slice(0x0, 0x8);
          if (_0x3b4ca4.includes(_0x1f9e41)) {
            console.log("Function found: " + _0x3248f1);
            return _0x3248f1;
          }
        }
      }
    }
    console.log("Function not found");
    return null;
  }
  static ['showSkelLogo']() {
    console.log("INSIDERS");
  }
}
