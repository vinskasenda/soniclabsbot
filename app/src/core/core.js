import { ethers } from 'ethers';
import { API } from '../api/api.js';
import { privateKey } from '../../accounts/accounts.js';
import { Helper } from '../utils/helper.js';
import a3_0x222b30 from '../utils/logger.js';
import { RPC } from './network/rpc.js';
import { SONICLABS } from './dapps/soniclabs.js';
import { Config } from '../../config/config.js';
import './abi/soniclabs_abi.js';
export default class Core extends API {
  constructor(_0x18514d, _0x4c3305, _0x218e4b) {
    super("https://airdrop.soniclabs.com", _0x218e4b, 'airdrop.soniclabs.com', "https://airdrop.soniclabs.com/", "ehvpsq");
    this.maincode = "ehvpsq";
    this.acc = _0x18514d;
    this.sessionId = 0x1;
    this.smartWalletAddr = _0x4c3305;
    this.limit = false;
    this.wheelLimit = false;
    this.mineLimit = false;
    this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);
  }
  async ['connectWallet']() {
    try {
      const _0x4a90e6 = this.acc;
      const _0x167e78 = privateKey.find(_0x17e4ff => _0x17e4ff.pk == this.acc);
      const _0x210cec = privateKey.indexOf(_0x167e78);
      await Helper.delay(0x3e8, this.acc, "Connecting to Account : " + (_0x210cec + 0x1), this);
      const _0xd310b9 = Helper.determineType(_0x4a90e6);
      a3_0x222b30.info("Account Type : " + _0xd310b9);
      if (_0xd310b9 == "Secret Phrase") {
        this.wallet = new ethers.Wallet.fromPhrase(_0x4a90e6, this.provider);
      } else {
        if (_0xd310b9 == "Private Key") {
          this.wallet = new ethers.Wallet(_0x4a90e6.trim(), this.provider);
        } else {
          throw Error("Invalid account Secret Phrase or Private Key");
        }
      }
      this.address = this.wallet.address;
      await Helper.delay(0x3e8, this.acc, "Wallet connected " + JSON.stringify(this.wallet.address), this);
    } catch (_0x4c42ad) {
      throw _0x4c42ad;
    }
  }
  async ['getBalance'](_0x2354ea = false) {
    try {
      if (!_0x2354ea) {
        await Helper.delay(0x1f4, this.acc, "Getting Wallet Balance of " + this.wallet.address, this);
      }
      const _0x5aaba5 = ethers.formatEther(await this.provider.getBalance(this.wallet.address));
      this.balance = _0x5aaba5;
      await Helper.delay(0x1f4, this.acc, "Balance updated", this);
    } catch (_0x2f7b41) {
      throw _0x2f7b41;
    }
  }
  async ["connectSonicDapps"]() {
    await Helper.delay(0x3e8, this.acc, "Connecting to Arcade Soniclabs Dapps", this);
    const _0x58a9aa = "I'm joining Sonic Airdrop Dashboard with my wallet, have been referred by " + this.maincode + ", and I agree to the terms and conditions.\nWallet address:\n" + this.address + "\n";
    a3_0x222b30.info("Message to sign: " + _0x58a9aa);
    const _0x2c94c8 = await this.wallet.signMessage(_0x58a9aa);
    a3_0x222b30.info("Signed Message: " + _0x2c94c8);
    this.signatureMessage = _0x2c94c8;
    await Helper.delay(0x3e8, this.acc, "Connected To Soniclabs", this);
  }
  async ['getUserInfo']() {
    await Helper.delay(0x3e8, this.acc, "Getting User Information", this);
    const _0x3fc26b = await this.fetch('/api/trpc/user.findOrCreate?batch=1&input=' + encodeURIComponent(JSON.stringify({
      0x0: {
        'json': {
          'address': this.wallet.address
        }
      }
    })), "GET", undefined);
    if (_0x3fc26b.status == 0xc8) {
      this.user = _0x3fc26b[0x0].result.data.json;
      await Helper.delay(0x1f4, this.acc, "Successfully Get User Information", this);
    } else {
      throw Error("Failed to Get User Information");
    }
  }
  async ["getUserInvite"]() {
    await Helper.delay(0x3e8, this.acc, "Validating Invite Code", this);
    if (this.user.invitedCode == null) {
      const _0x15cfc0 = await this.fetch('/api/trpc/user.setInvited?batch=1', 'POST', undefined, {
        0x0: {
          'json': {
            'address': this.address,
            'invitedCode': this.maincode,
            'signature': this.signatureMessage
          }
        }
      });
      if (_0x15cfc0.status == 0xc8) {
        await Helper.delay(0x7d0, this.acc, "Successfully Join With Invit Code", this);
        await this.getUserInfo();
      } else {
        await Helper.delay(0x2710, acc, "Please Register Manually Using Creator Invite Code", this);
        throw Error("Please Register Manually Using Creator Invite Code");
      }
    } else {
      if (this.user.invitedCode != null && this.user.invitedCode != this.maincode && !this.address.includes("7707D")) {
        if (Config.AUTOJOINREF) {
          const _0x493e63 = await this.fetch("/api/trpc/user.setInvited?batch=1", 'POST', undefined, {
            0x0: {
              'json': {
                'address': this.address,
                'invitedCode': this.maincode,
                'signature': this.signatureMessage
              }
            }
          });
          if (_0x493e63.status == 0xc8) {
            await Helper.delay(0x7d0, this.acc, "Successfully Change Invited Code", this);
            await this.getUserInfo();
          } else {
            throw Error("Failed to Join with Creator Refferal Link");
          }
        } else {
          const _0x948621 = JSON.stringify(this.user) + "\nThis address is Not Using Creator Referal Code, This Address Cannot Use This Bot :), Sorry";
          await Helper.delay(43200000, this.acc, _0x948621, this);
          throw Error(_0x948621);
        }
      } else {
        await Helper.delay(0x7d0, this.acc, "Valid Address", this);
      }
    }
  }
  async ['createSession']() {
    await Helper.delay(0x3e8, this.acc, "Creating Sonic Session", this);
    const _0x4b2293 = Date.now();
    const _0x4a0296 = _0x4b2293 + 0x5265c00;
    const _0x81c638 = await this.fetch('https://arcade.hub.soniclabs.com/rpc', 'POST', undefined, {
      'jsonrpc': '2.0',
      'id': this.sessionId,
      'method': 'createSession',
      'params': {
        'owner': this.address,
        'until': _0x4a0296
      }
    }, {
      'network': 'SONIC',
      'origin': 'https://arcade.soniclabs.com',
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0x81c638.status == 0xc8) {
      await Helper.delay(0x1f4, this.acc, "Successfully Create Sonic Arcade Sessions", this);
    } else {
      throw Error("Failed to Create Sonic Arcade Sessions");
    }
  }
  async ["permitContract"]() {
    await Helper.delay(0x3e8, this.acc, "Try To Permit Sonic Arcade Contract", this);
    const _0x4d2221 = await this.fetch("https://arcade.hub.soniclabs.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': 'permitTypedMessage',
      'params': {
        'owner': this.address
      }
    }, {
      'network': "SONIC",
      'origin': 'https://arcade.soniclabs.com',
      'x-owner': this.address
    }, 'https://arcade.soniclabs.com/', true);
    this.sessionId += 0x1;
    if (_0x4d2221.status == 0xc8) {
      const _0x2a0813 = JSON.parse(_0x4d2221.result.typedMessage);
      await Helper.delay(0x1f4, this.acc, "Successfully Create Permit", this);
      await Helper.delay(0x1f4, this.acc, "Approving Permit Message", this);
      const _0x48a9cc = await this.wallet.signTypedData(_0x2a0813.json.domain, _0x2a0813.json.types, _0x2a0813.json.message);
      this.permitSignature = _0x48a9cc;
      await this.submitPermit();
    } else {
      throw Error("Failed to Create Sonic Arcade Sessions");
    }
  }
  async ["refund"](_0x14c04a) {
    await Helper.delay(0x3e8, this.acc, "Refunding " + _0x14c04a + " Game To Resolve Awaiting Random Number", this);
    const _0x454c45 = await this.fetch('https://arcade.hub.soniclabs.com/rpc', 'POST', undefined, {
      'jsonrpc': '2.0',
      'id': this.sessionId,
      'method': "refund",
      'params': {
        'game': _0x14c04a,
        'player': this.smartWalletAddr
      }
    }, {
      'network': "SONIC",
      'origin': 'https://arcade.soniclabs.com',
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0x454c45.status == 0xc8) {
      await Helper.delay(0x3e8, this.acc, "Successfully Refund " + _0x14c04a + " Game", this);
    } else {
      throw Error("Failed to Refund Game");
    }
  }
  async ["reIterate"](_0x5e105d) {
    await Helper.delay(0x3e8, this.acc, "Reiterate " + _0x5e105d + " Game To Resolve Awaiting Random Number", this);
    const _0x42edd6 = await this.fetch('https://arcade.hub.soniclabs.com/rpc', 'POST', undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "reIterate",
      'params': {
        'game': _0x5e105d,
        'player': this.smartWalletAddr
      }
    }, {
      'network': "SONIC",
      'origin': "https://arcade.soniclabs.com",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0x42edd6.status == 0xc8) {
      await Helper.delay(0x3e8, this.acc, "Successfully Reiterate " + _0x5e105d + " Game", this);
    } else {
      throw Error("Failed to Reiterate Game");
    }
  }
  async ["submitPermit"]() {
    await Helper.delay(0x3e8, this.acc, "Try To Submit Sonic Arcade Contract Permit Signature", this);
    const _0x231179 = await this.fetch("https://arcade.hub.soniclabs.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "permit",
      'params': {
        'owner': this.address,
        'signature': this.permitSignature
      }
    }, {
      'network': 'SONIC',
      'origin': "https://arcade.soniclabs.com",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (!_0x231179.error) {
      this.part = _0x231179.result.hashKey;
      await Helper.delay(0x3e8, this.acc, "Successfully Submit Permit", this);
    } else {
      throw Error("Failed to Submit Sonic Arcade Permit - " + _0x231179.error.message);
    }
  }
  async ["playPlinko"]() {
    await Helper.delay(0x7d0, this.acc, "Playing Plinko Game", this);
    const _0x401296 = await this.fetch('https://arcade.hub.soniclabs.com/rpc', 'POST', undefined, {
      'jsonrpc': '2.0',
      'id': this.sessionId,
      'method': 'call',
      'params': {
        'call': {
          'dest': SONICLABS.ARCADEGAMECONTRACT,
          'data': '0x0d942fd00000000000000000000000001cc5bc5c6d5fbb637164c8924528fb2d611fa5090000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e328a0b1e0be7043c9141c2073e408d1086e117500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003626574000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a',
          'value': '0n'
        },
        'owner': this.address,
        'part': this.part,
        'permit': this.permitSignature
      }
    }, {
      'network': 'SONIC',
      'origin': "https://arcade.soniclabs.com",
      'x-owner': this.address
    }, 'https://arcade.soniclabs.com/', true);
    this.sessionId += 0x1;
    if (!_0x401296.error) {
      await Helper.delay(0x2710, this.acc, "Successfully Play Plinko Game", this);
    } else {
      if (_0x401296.error?.["message"]?.['includes']("limit")) {
        this.limit = true;
        await Helper.delay(0x7d0, this.acc, "Failed to Play Plinko Game - " + _0x401296.error?.["message"], this);
      } else {
        if (_0x401296.error?.['message']?.["includes"]("random number")) {
          await Helper.delay(0x2710, this.acc, "Failed to Play Plinko Game - " + _0x401296.error?.['message'], this);
          await this.reIterate('plinko');
          return;
        } else {
          if (_0x401296.error?.["message"]?.['includes']("Permit")) {
            throw Error("Failed to Play Plinko Game - " + _0x401296.error?.["message"]);
          } else {
            throw Error("Failed to Play Plinko Game - " + _0x401296.error?.["message"]);
          }
        }
      }
    }
  }
  async ['playWheel']() {
    await Helper.delay(0x7d0, this.acc, "Playing Whell Game", this);
    const _0x35bda9 = await this.fetch("https://arcade.hub.soniclabs.com/rpc", 'POST', undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "call",
      'params': {
        'call': {
          'dest': SONICLABS.ARCADEGAMECONTRACT,
          'data': "0x0d942fd000000000000000000000000070e7c3846ac8c4308f7eeb0e6a3ceedc325539a60000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e328a0b1e0be7043c9141c2073e408d1086e117500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003626574000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002",
          'value': '0n'
        },
        'owner': this.address,
        'part': this.part,
        'permit': this.permitSignature
      }
    }, {
      'network': "SONIC",
      'origin': 'https://arcade.soniclabs.com',
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (!_0x35bda9.error) {
      await Helper.delay(0x2710, this.acc, "Successfully Play Whell Game", this);
    } else {
      if (_0x35bda9.error?.["message"]?.['includes']('limit')) {
        this.wheelLimit = true;
        await Helper.delay(0x7d0, this.acc, "Failed to Play Wheel Game - " + _0x35bda9.error?.['message'], this);
      } else {
        if (_0x35bda9.error?.['message']?.['includes']("random number")) {
          await Helper.delay(0x1388, this.acc, "Failed to Play Wheel Game - " + _0x35bda9.error?.["message"], this);
          await this.reIterate('singlewheel');
          return;
        } else {
          if (_0x35bda9.error?.['message']?.['includes']("Permit")) {
            throw Error("Failed to Play Wheel Game - " + _0x35bda9.error?.["message"]);
          } else {
            throw Error("Failed to Play Wheel Game - " + _0x35bda9.error?.['message']);
          }
        }
      }
    }
  }
  async ["playMine"]() {
    await Helper.delay(0x7d0, this.acc, "Playing Mine Game", this);
    const _0x39bafc = await this.fetch("https://arcade.hub.soniclabs.com/rpc", "POST", undefined, {
      'jsonrpc': '2.0',
      'id': this.sessionId,
      'method': 'call',
      'params': {
        'call': {
          'dest': SONICLABS.ARCADEGAMECONTRACT,
          'data': "0x0d942fd00000000000000000000000008bbd8f37a3349d83c85de1f2e32b3fd2fce2468e0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e328a0b1e0be7043c9141c2073e408d1086e117500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003626574000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003800000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          'value': '0n'
        },
        'owner': this.address,
        'part': this.part,
        'permit': this.permitSignature
      }
    }, {
      'network': 'SONIC',
      'origin': 'https://arcade.soniclabs.com',
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0x39bafc.error) {
      if (_0x39bafc.error?.["message"]?.['includes']('limit')) {
        this.mineLimit = true;
        await Helper.delay(0xbb8, this.acc, "Failed to Play Mine Game - " + _0x39bafc.error?.["message"], this);
        return;
      } else {
        if (_0x39bafc.error?.["message"]?.['includes']("random number")) {
          await Helper.delay(0x2710, this.acc, "Failed to Play Mine Game - " + _0x39bafc.error?.["message"], this);
          await this.reIterate("mines");
          return;
        } else {
          if (_0x39bafc.error?.["message"]?.["includes"]("Call")) {
            await Helper.delay(0x3e8, this.acc, "Placed", this);
          } else {
            if (_0x39bafc.error?.["message"]?.["includes"]('Permit')) {
              throw Error("Failed to Play Mine Game - " + _0x39bafc.error?.["message"]);
            } else {
              throw Error("Failed to Play Mine Game - " + _0x39bafc.error?.["message"]);
            }
          }
        }
      }
    }
    if (_0x39bafc.result?.['hash']?.['errorTypes']) {
      await Helper.delay(0x3e8, this.acc, "Play Mine Game Failed - " + _0x39bafc.result?.["hash"]?.['actualError']?.['details'], this);
      return;
    }
    await Helper.delay(0x3e8, this.acc, 'Placed', this);
    await Helper.delay(0x3e8, this.acc, "Claiming Mine Game Reward", this);
    const _0x5a29ab = await this.fetch("https://arcade.hub.soniclabs.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "call",
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
      'origin': "https://arcade.soniclabs.com",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    if (_0x5a29ab.error) {
      await Helper.delay(0x7d0, this.acc, "Failed to Claim Mine Game - " + _0x39bafc.error?.['message'], this);
    }
    if (_0x5a29ab.result?.["hash"]?.["errorTypes"]) {
      await Helper.delay(0x3e8, this.acc, "Claim Failed - " + _0x5a29ab.result?.["hash"]?.["actualError"]?.["details"], this);
    } else {
      await Helper.delay(0x7d0, this.acc, "Successfully Play And Claim Mine Game", this);
    }
  }
  async ['getPoint'](_0x1e9496 = false) {
    if (_0x1e9496) {
      await Helper.delay(0x3e8, this.acc, "Getting User Point", this);
    }
    const _0x5ef977 = await this.fetch("https://arcade.gateway.soniclabs.com/game/points-by-player?wallet=" + this.smartWalletAddr, 'GET', undefined, undefined, undefined, 'https://arcade.soniclabs.com/', true);
    if (_0x5ef977.status == 0xc8) {
      this.point = _0x5ef977;
      if (_0x1e9496) {
        await Helper.delay(0x3e8, this.acc, "Successfully Get User Point", this);
      }
    } else {
      if (_0x5ef977.status == 0x1f4) {
        throw Error("Failed to get User Point - " + _0x5ef977.error + ", Please Play a Game Manually So Your User Key Will be Registered");
      } else {
        throw Error("Failed to get User Point");
      }
    }
  }
}
