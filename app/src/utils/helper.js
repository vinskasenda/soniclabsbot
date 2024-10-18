import a7_0x48f389 from 'bip39';
import a7_0x3da0df from 'moment-timezone';
import { ethers } from 'ethers';
import a7_0x39a29c from './bless.js';
export class Helper {
  static ["delay"] = (_0xfb417d, _0x499ca0, _0x50f81f, _0x44c9d8) => {
    return new Promise(_0x4ef45a => {
      let _0x2f34ef = _0xfb417d;
      if (_0x499ca0 != undefined) {
        a7_0x39a29c.log(_0x50f81f, _0x499ca0, _0x44c9d8, "Delaying for " + this.msToTime(_0xfb417d));
      } else {
        a7_0x39a29c.info("Delaying for " + this.msToTime(_0xfb417d));
      }
      const _0x164cad = setInterval(() => {
        _0x2f34ef -= 0x3e8;
        if (_0x499ca0 != undefined) {
          a7_0x39a29c.log(_0x50f81f, _0x499ca0, _0x44c9d8, "Delaying for " + this.msToTime(_0x2f34ef));
        } else {
          a7_0x39a29c.info("Delaying for " + this.msToTime(_0x2f34ef));
        }
        if (_0x2f34ef <= 0x0) {
          clearInterval(_0x164cad);
          _0x4ef45a();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x164cad);
        await a7_0x39a29c.clearInfo();
        if (_0x499ca0) {
          a7_0x39a29c.log(_0x50f81f, _0x499ca0, _0x44c9d8);
        }
        _0x4ef45a();
      }, _0xfb417d);
    });
  };
  static ["randomUserAgent"]() {
    const _0x3e8235 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x3e8235[Math.floor(Math.random() * _0x3e8235.length)];
  }
  static ["readTime"](_0x51e1bd) {
    const _0x258f68 = a7_0x3da0df.unix(_0x51e1bd);
    return _0x258f68.format("YYYY-MM-DD HH:mm:ss");
  }
  static ["getCurrentTimestamp"]() {
    const _0x4f8db0 = a7_0x3da0df().tz("Asia/Singapore").unix();
    return _0x4f8db0.toString();
  }
  static ["random"](_0x1e259b, _0x632bef) {
    const _0x1bc438 = Math.floor(Math.random() * (_0x632bef - _0x1e259b + 0x1)) + _0x1e259b;
    return _0x1bc438;
  }
  static ['msToTime'](_0x192b4d) {
    const _0x170072 = Math.floor(_0x192b4d / 3600000);
    const _0x41cff6 = _0x192b4d % 3600000;
    const _0x43a1d2 = Math.floor(_0x41cff6 / 60000);
    const _0x1237ec = _0x41cff6 % 60000;
    const _0x3e2caf = Math.round(_0x1237ec / 0x3e8);
    return _0x170072 + " Hours " + _0x43a1d2 + " Minutes " + _0x3e2caf + " Seconds";
  }
  static ['generateRandomString'](_0x2f77c3) {
    let _0x428d13 = '';
    const _0x17d7f6 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
    for (let _0x3a985f = 0x0; _0x3a985f < _0x2f77c3; _0x3a985f++) {
      _0x428d13 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x17d7f6));
    }
    return _0x428d13;
  }
  static ["serializeBigInt"] = _0x1b3b66 => {
    return JSON.parse(JSON.stringify(_0x1b3b66, (_0x3eaa12, _0x2660fa) => typeof _0x2660fa === 'bigint' ? _0x2660fa.toString() : _0x2660fa));
  };
  static ["isMnemonic"](_0x47fea2) {
    return a7_0x48f389.validateMnemonic(_0x47fea2);
  }
  static ["isPrivateKey"](_0x525dbd) {
    const _0x1f1786 = _0x525dbd.replace(/^0x/, '');
    const _0x20e21e = /^[a-fA-F0-9]{64}$/;
    return _0x20e21e.test(_0x1f1786);
  }
  static ['determineType'](_0xd325a0) {
    if (this.isMnemonic(_0xd325a0)) {
      return "Secret Phrase";
    } else {
      return this.isPrivateKey(_0xd325a0) ? "Private Key" : "Unknown";
    }
  }
  static ["generateNonce"]() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }
  static ['isToday'](_0x3f3be3) {
    const _0x2e9b12 = new Date(_0x3f3be3);
    const _0x48c753 = new Date();
    _0x48c753.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x3c0421 = new Date(_0x2e9b12);
    _0x3c0421.setHours(0x0, 0x0, 0x0, 0x0);
    return !!(_0x3c0421.getTime() === _0x48c753.getTime());
  }
  static ["findFunctionBySelector"](_0x2e5253, _0x4e6fa1) {
    for (const _0x475517 of _0x4e6fa1) {
      for (const _0x4a3261 of _0x475517) {
        if (_0x4a3261.type === "function") {
          const _0x5a1651 = _0x4a3261.name + '(' + _0x4a3261.inputs.map(_0x27b131 => _0x27b131.type).join(',') + ')';
          const _0x23816f = '0x' + ethers.keccak256(ethers.toUtf8Bytes(_0x5a1651)).slice(0x0, 0x8);
          if (_0x23816f.includes(_0x2e5253)) {
            console.log("Function found: " + _0x5a1651);
            return _0x5a1651;
          }
        }
      }
    }
    console.log("Function not found");
    return null;
  }
  static ["showSkelLogo"]() {
    console.log("AIRDROP INSIDERS ID");
  }
}
