const a3_0x3b79f7 = function () {
  let _0x4673f0 = true;
  return function (_0x350493, _0x3f5fb1) {
    const _0x3375fb = _0x4673f0 ? function () {
      if (_0x3f5fb1) {
        const _0x4374ab = _0x3f5fb1.apply(_0x350493, arguments);
        _0x3f5fb1 = null;
        return _0x4374ab;
      }
    } : function () {};
    _0x4673f0 = false;
    return _0x3375fb;
  };
}();
const a3_0xd1ae48 = a3_0x3b79f7(this, function () {
  return a3_0xd1ae48.toString().search("(((.+)+)+)+$").toString().constructor(a3_0xd1ae48).search('(((.+)+)+)+$');
});
a3_0xd1ae48();
const a3_0x13e625 = function () {
  let _0x2ea37e = true;
  return function (_0x3eddac, _0x8d2798) {
    const _0x4173ad = _0x2ea37e ? function () {
      if (_0x8d2798) {
        const _0x4718ac = _0x8d2798.apply(_0x3eddac, arguments);
        _0x8d2798 = null;
        return _0x4718ac;
      }
    } : function () {};
    _0x2ea37e = false;
    return _0x4173ad;
  };
}();
const a3_0x19f7f5 = a3_0x13e625(this, function () {
  let _0xcb2ec;
  try {
    const _0x2975f3 = Function("return (function() {}.constructor(\"return this\")( ));");
    _0xcb2ec = _0x2975f3();
  } catch (_0x2c9b0f) {
    _0xcb2ec = window;
  }
  const _0x454377 = _0xcb2ec.console = _0xcb2ec.console || {};
  const _0xeffb4c = ["log", 'warn', "info", 'error', 'exception', "table", 'trace'];
  for (let _0x57c578 = 0x0; _0x57c578 < _0xeffb4c.length; _0x57c578++) {
    const _0x5c148c = a3_0x13e625.constructor.prototype.bind(a3_0x13e625);
    const _0x372689 = _0xeffb4c[_0x57c578];
    const _0x2d1472 = _0x454377[_0x372689] || _0x5c148c;
    _0x5c148c.__proto__ = a3_0x13e625.bind(a3_0x13e625);
    _0x5c148c.toString = _0x2d1472.toString.bind(_0x2d1472);
    _0x454377[_0x372689] = _0x5c148c;
  }
});
a3_0x19f7f5();
import { ethers } from 'ethers';
import { API } from '../api/api.js';
import { privateKey } from '../../accounts/accounts.js';
import { Helper } from '../utils/helper.js';
import a3_0x2f0c52 from '../utils/logger.js';
import { RPC } from './network/rpc.js';
import { SONICLABS } from './dapps/soniclabs.js';
import { Config } from '../../config/config.js';
import './abi/soniclabs_abi.js';
export default class Core extends API {
  constructor(_0x4a7c21, _0x5d686e, _0x2b32a9) {
    super('https://airdrop.soniclabs.com', _0x2b32a9, "airdrop.soniclabs.com", 'https://airdrop.soniclabs.com/', 'ehvpsq');
    this.maincode = "ehvpsq";
    this.acc = _0x4a7c21;
    this.sessionId = 0x1;
    this.smartWalletAddr = _0x5d686e;
    this.limit = false;
    this.wheelLimit = false;
    this.mineLimit = false;
    this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);
  }
  async ['connectWallet']() {
    try {
      const _0x4aac04 = this.acc;
      const _0x13887a = privateKey.find(_0x5d742b => _0x5d742b.pk == this.acc);
      const _0x2761ca = privateKey.indexOf(_0x13887a);
      await Helper.delay(0x3e8, this.acc, "Connecting to Account : " + (_0x2761ca + 0x1), this);
      const _0xafd5cb = Helper.determineType(_0x4aac04);
      a3_0x2f0c52.info("Account Type : " + _0xafd5cb);
      if (_0xafd5cb == "Secret Phrase") {
        this.wallet = new ethers.Wallet.fromPhrase(_0x4aac04, this.provider);
      } else {
        if (_0xafd5cb == "Private Key") {
          this.wallet = new ethers.Wallet(_0x4aac04.trim(), this.provider);
        } else {
          throw Error("Invalid account Secret Phrase or Private Key");
        }
      }
      this.address = this.wallet.address;
      await Helper.delay(0x3e8, this.acc, "Wallet connected " + JSON.stringify(this.wallet.address), this);
    } catch (_0x52c81c) {
      throw _0x52c81c;
    }
  }
  async ['getBalance'](_0x10a3e3 = false) {
    try {
      if (!_0x10a3e3) {
        await Helper.delay(0x1f4, this.acc, "Getting Wallet Balance of " + this.wallet.address, this);
      }
      const _0x38d9c3 = ethers.formatEther(await this.provider.getBalance(this.wallet.address));
      this.balance = _0x38d9c3;
      await Helper.delay(0x1f4, this.acc, "Balance updated", this);
    } catch (_0x15d899) {
      throw _0x15d899;
    }
  }
  async ['connectSonicDapps']() {
    await Helper.delay(0x3e8, this.acc, "Connecting to Arcade Soniclabs Dapps", this);
    const _0x55bf4d = "I'm joining Sonic Airdrop Dashboard with my wallet, have been referred by " + this.maincode + ", and I agree to the terms and conditions.\nWallet address:\n" + this.address + "\n";
    a3_0x2f0c52.info("Message to sign: " + _0x55bf4d);
    const _0xcc323d = await this.wallet.signMessage(_0x55bf4d);
    a3_0x2f0c52.info("Signed Message: " + _0xcc323d);
    this.signatureMessage = _0xcc323d;
    await Helper.delay(0x3e8, this.acc, "Connected To Soniclabs", this);
  }
  async ["getUserInfo"]() {
    await Helper.delay(0x3e8, this.acc, "Getting User Information", this);
    const _0x2e37e4 = await this.fetch('/api/trpc/user.findOrCreate?batch=1&input=' + encodeURIComponent(JSON.stringify({
      0x0: {
        'json': {
          'address': this.wallet.address
        }
      }
    })), 'GET', undefined);
    if (_0x2e37e4.status == 0xc8) {
      this.user = _0x2e37e4[0x0].result.data.json;
      await Helper.delay(0x1f4, this.acc, "Successfully Get User Information", this);
    } else {
      throw Error("Failed to Get User Information");
    }
  }
  async ['getUserInvite']() {
    await Helper.delay(0x3e8, this.acc, "Validating Invite Code", this);
    if (this.user.invitedCode == null) {
      const _0x539c23 = await this.fetch("/api/trpc/user.setInvited?batch=1", "POST", undefined, {
        0x0: {
          'json': {
            'address': this.address,
            'invitedCode': this.maincode,
            'signature': this.signatureMessage
          }
        }
      });
      if (_0x539c23.status == 0xc8) {
        await Helper.delay(0x7d0, this.acc, "Successfully Join With Invit Code", this);
        await this.getUserInfo();
      } else {
        await Helper.delay(0x2710, acc, "Please Register Manually Using Creator Invite Code", this);
        throw Error("Please Register Manually Using Creator Invite Code");
      }
    } else {
      if (this.user.invitedCode != null && this.user.invitedCode != this.maincode && !this.address.includes('7707D')) {
        if (Config.AUTOJOINREF) {
          const _0x2a0b56 = await this.fetch("/api/trpc/user.setInvited?batch=1", "POST", undefined, {
            0x0: {
              'json': {
                'address': this.address,
                'invitedCode': this.maincode,
                'signature': this.signatureMessage
              }
            }
          });
          if (_0x2a0b56.status == 0xc8) {
            await Helper.delay(0x7d0, this.acc, "Successfully Change Invited Code", this);
            await this.getUserInfo();
          } else {
            throw Error("Failed to Join with Creator Refferal Link");
          }
        } else {
          const _0x24d21e = JSON.stringify(this.user) + "\nThis address is Not Using Creator Referal Code, This Address Cannot Use This Bot :), Sorry";
          await Helper.delay(43200000, this.acc, _0x24d21e, this);
          throw Error(_0x24d21e);
        }
      } else {
        await Helper.delay(0x7d0, this.acc, "Valid Address", this);
      }
    }
  }
  async ['createSession']() {
    await Helper.delay(0x3e8, this.acc, "Creating Sonic Session", this);
    const _0x4b4cda = Date.now();
    const _0x1e8790 = _0x4b4cda + 0x5265c00;
    const _0x1d77e7 = await this.fetch("https://sonic-hub1.joinrebellion.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "createSession",
      'params': {
        'owner': this.address,
        'until': _0x1e8790
      }
    }, {
      'network': "SONIC",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0x1d77e7.status == 0xc8) {
      await Helper.delay(0x1f4, this.acc, "Successfully Create Sonic Arcade Sessions", this);
    } else {
      throw Error("Failed to Create Sonic Arcade Sessions");
    }
  }
  async ["permitContract"]() {
    await Helper.delay(0x3e8, this.acc, "Try To Permit Sonic Arcade Contract", this);
    const _0x40bf0b = await this.fetch('https://sonic-hub1.joinrebellion.com/rpc', 'POST', undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': 'permitTypedMessage',
      'params': {
        'owner': this.address
      }
    }, {
      'network': 'SONIC',
      'x-owner': this.address
    }, 'https://arcade.soniclabs.com/', true);
    this.sessionId += 0x1;
    if (_0x40bf0b.status == 0xc8) {
      const _0x16042e = JSON.parse(_0x40bf0b.result.typedMessage);
      await Helper.delay(0x1f4, this.acc, "Successfully Create Permit", this);
      await Helper.delay(0x1f4, this.acc, "Approving Permit Message", this);
      const _0x20595e = await this.wallet.signTypedData(_0x16042e.json.domain, _0x16042e.json.types, _0x16042e.json.message);
      this.permitSignature = _0x20595e;
      await this.submitPermit();
    } else {
      throw Error("Failed to Create Sonic Arcade Sessions");
    }
  }
  async ['refund'](_0x578f19) {
    await Helper.delay(0x3e8, this.acc, "Refunding " + _0x578f19 + " Game To Resolve Awaiting Random Number", this);
    const _0x9351d7 = await this.fetch("https://sonic-hub1.joinrebellion.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': 'refund',
      'params': {
        'game': _0x578f19,
        'player': this.smartWalletAddr
      }
    }, {
      'network': "SONIC",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0x9351d7.status == 0xc8) {
      await Helper.delay(0x3e8, this.acc, "Successfully Refund " + _0x578f19 + " Game", this);
    } else {
      throw Error("Failed to Refund Game");
    }
  }
  async ["reIterate"](_0x5f2210) {
    await Helper.delay(0x3e8, this.acc, "Reiterate " + _0x5f2210 + " Game To Resolve Awaiting Random Number", this);
    const _0x5842c1 = await this.fetch('https://sonic-hub1.joinrebellion.com/rpc', "POST", undefined, {
      'jsonrpc': '2.0',
      'id': this.sessionId,
      'method': "reIterate",
      'params': {
        'game': _0x5f2210,
        'player': this.smartWalletAddr
      }
    }, {
      'network': "SONIC",
      'x-owner': this.address
    }, 'https://arcade.soniclabs.com/', true);
    this.sessionId += 0x1;
    if (_0x5842c1.status == 0xc8) {
      await Helper.delay(0x3e8, this.acc, "Successfully Reiterate " + _0x5f2210 + " Game", this);
    } else {
      throw Error("Failed to Reiterate Game");
    }
  }
  async ["submitPermit"]() {
    await Helper.delay(0x3e8, this.acc, "Try To Submit Sonic Arcade Contract Permit Signature", this);
    const _0x554d27 = await this.fetch('https://sonic-hub1.joinrebellion.com/rpc', 'POST', undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "permit",
      'params': {
        'owner': this.address,
        'signature': this.permitSignature
      }
    }, {
      'network': "SONIC",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (!_0x554d27.error) {
      this.part = _0x554d27.result.hashKey;
      await Helper.delay(0x3e8, this.acc, "Successfully Submit Permit", this);
    } else {
      throw Error("Failed to Submit Sonic Arcade Permit - " + _0x554d27.error.message);
    }
  }
  async ['playPlinko']() {
    await Helper.delay(0x7d0, this.acc, "Playing Plinko Game", this);
    const _0x44f01f = await this.fetch('https://sonic-hub1.joinrebellion.com/rpc', "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': 'call',
      'params': {
        'call': {
          'dest': SONICLABS.ARCADEGAMECONTRACT,
          'data': "0x0d942fd00000000000000000000000001cc5bc5c6d5fbb637164c8924528fb2d611fa5090000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e328a0b1e0be7043c9141c2073e408d1086e117500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003626574000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a",
          'value': '0n'
        },
        'owner': this.address,
        'part': this.part,
        'permit': this.permitSignature
      }
    }, {
      'network': 'SONIC',
      'x-owner': this.address
    }, 'https://arcade.soniclabs.com/', true);
    this.sessionId += 0x1;
    if (!_0x44f01f.error) {
      await Helper.delay(0x2710, this.acc, "Successfully Play Plinko Game", this);
    } else {
      if (_0x44f01f.error?.['message']?.['includes']("limit")) {
        this.limit = true;
        await Helper.delay(0x7d0, this.acc, "Failed to Play Plinko Game - " + _0x44f01f.error?.['message'], this);
      } else {
        if (_0x44f01f.error?.["message"]?.["includes"]("random number")) {
          await Helper.delay(0x2710, this.acc, "Failed to Play Plinko Game - " + _0x44f01f.error?.['message'], this);
          await this.reIterate('plinko');
          return;
        } else {
          if (_0x44f01f.error?.["message"]?.["includes"]('Permit')) {
            throw Error("Failed to Play Plinko Game - " + _0x44f01f.error?.['message']);
          } else {
            throw Error("Failed to Play Plinko Game - " + _0x44f01f.error?.["message"]);
          }
        }
      }
    }
  }
  async ['playWheel']() {
    await Helper.delay(0x7d0, this.acc, "Playing Whell Game", this);
    const _0x3700cf = await this.fetch("https://sonic-hub1.joinrebellion.com/rpc", 'POST', undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "call",
      'params': {
        'call': {
          'dest': SONICLABS.ARCADEGAMECONTRACT,
          'data': '0x0d942fd000000000000000000000000070e7c3846ac8c4308f7eeb0e6a3ceedc325539a60000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e328a0b1e0be7043c9141c2073e408d1086e117500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003626574000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002',
          'value': '0n'
        },
        'owner': this.address,
        'part': this.part,
        'permit': this.permitSignature
      }
    }, {
      'network': 'SONIC',
      'x-owner': this.address
    }, 'https://arcade.soniclabs.com/', true);
    this.sessionId += 0x1;
    if (!_0x3700cf.error) {
      await Helper.delay(0x2710, this.acc, "Successfully Play Whell Game", this);
    } else {
      if (_0x3700cf.error?.['message']?.['includes']('limit')) {
        this.wheelLimit = true;
        await Helper.delay(0x7d0, this.acc, "Failed to Play Wheel Game - " + _0x3700cf.error?.['message'], this);
      } else {
        if (_0x3700cf.error?.["message"]?.["includes"]("random number")) {
          await Helper.delay(0x1388, this.acc, "Failed to Play Wheel Game - " + _0x3700cf.error?.['message'], this);
          await this.reIterate("singlewheel");
          return;
        } else {
          if (_0x3700cf.error?.['message']?.['includes']('Permit')) {
            throw Error("Failed to Play Wheel Game - " + _0x3700cf.error?.["message"]);
          } else {
            throw Error("Failed to Play Wheel Game - " + _0x3700cf.error?.['message']);
          }
        }
      }
    }
  }
  async ['playMine']() {
    await Helper.delay(0x7d0, this.acc, "Playing Mine Game", this);
    const _0x1fb051 = await this.fetch('https://sonic-hub1.joinrebellion.com/rpc', "POST", undefined, {
      'jsonrpc': '2.0',
      'id': this.sessionId,
      'method': 'call',
      'params': {
        'call': {
          'dest': SONICLABS.ARCADEGAMECONTRACT,
          'data': '0x0d942fd00000000000000000000000008bbd8f37a3349d83c85de1f2e32b3fd2fce2468e0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e328a0b1e0be7043c9141c2073e408d1086e117500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003626574000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003800000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          'value': '0n'
        },
        'owner': this.address,
        'part': this.part,
        'permit': this.permitSignature
      }
    }, {
      'network': "SONIC",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0x1fb051.error) {
      if (_0x1fb051.error?.["message"]?.['includes']('limit')) {
        this.mineLimit = true;
        await Helper.delay(0xbb8, this.acc, "Failed to Play Mine Game - " + _0x1fb051.error?.['message'], this);
        return;
      } else {
        if (_0x1fb051.error?.["message"]?.["includes"]("random number")) {
          await Helper.delay(0x2710, this.acc, "Failed to Play Mine Game - " + _0x1fb051.error?.["message"], this);
          await this.reIterate("mines");
          return;
        } else {
          if (_0x1fb051.error?.["message"]?.['includes']("Call")) {
            await Helper.delay(0x3e8, this.acc, "Placed", this);
          } else {
            if (_0x1fb051.error?.["message"]?.["includes"]('Permit')) {
              throw Error("Failed to Play Mine Game - " + _0x1fb051.error?.["message"]);
            } else {
              throw Error("Failed to Play Mine Game - " + _0x1fb051.error?.["message"]);
            }
          }
        }
      }
    }
    if (_0x1fb051.result?.["hash"]?.["errorTypes"]) {
      await Helper.delay(0x3e8, this.acc, "Play Mine Game Failed - " + _0x1fb051.result?.["hash"]?.["actualError"]?.["details"], this);
      return;
    }
    await Helper.delay(0x3e8, this.acc, "Placed", this);
    await Helper.delay(0x3e8, this.acc, "Claiming Mine Game Reward", this);
    const _0x3cb3b7 = await this.fetch('https://sonic-hub1.joinrebellion.com/rpc', "POST", undefined, {
      'jsonrpc': '2.0',
      'id': this.sessionId,
      'method': 'call',
      'params': {
        'call': {
          'dest': SONICLABS.ARCADEGAMECONTRACT,
          'data': '0x0d942fd00000000000000000000000008bbd8f37a3349d83c85de1f2e32b3fd2fce2468e0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e328a0b1e0be7043c9141c2073e408d1086e117500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000007656e6447616d65000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          'value': '0n'
        },
        'owner': this.address,
        'part': this.part,
        'permit': this.permitSignature
      }
    }, {
      'network': 'SONIC',
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    if (_0x3cb3b7.error) {
      await Helper.delay(0x7d0, this.acc, "Failed to Claim Mine Game - " + _0x1fb051.error?.["message"], this);
    }
    if (_0x3cb3b7.result?.['hash']?.['errorTypes']) {
      await Helper.delay(0x3e8, this.acc, "Claim Failed - " + _0x3cb3b7.result?.["hash"]?.['actualError']?.["details"], this);
    } else {
      await Helper.delay(0x7d0, this.acc, "Successfully Play And Claim Mine Game", this);
    }
  }
  async ["getPoint"](_0x161623 = false) {
    if (_0x161623) {
      await Helper.delay(0x3e8, this.acc, "Getting User Point", this);
    }
    const _0x32ccdb = await this.fetch('https://arcade.gateway.soniclabs.com/game/points-by-player?wallet=' + this.smartWalletAddr, "GET", undefined, undefined, undefined, 'https://arcade.soniclabs.com/', true);
    if (_0x32ccdb.status == 0xc8) {
      this.point = _0x32ccdb;
      if (_0x161623) {
        await Helper.delay(0x3e8, this.acc, "Successfully Get User Point", this);
      }
    } else {
      if (_0x32ccdb.status == 0x1f4) {
        throw Error("Failed to get User Point - " + _0x32ccdb.error + ", Please Play a Game Manually So Your User Key Will be Registered");
      } else {
        throw Error("Failed to get User Point");
      }
    }
  }
}
