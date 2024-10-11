import { ethers } from 'ethers';
import { API } from '../api/api.js';
import { privateKey } from '../../accounts/accounts.js';
import { Helper } from '../utils/helper.js';
import a3_0x53f61f from '../utils/logger.js';
import { RPC } from './network/rpc.js';
import { SONICLABS } from './dapps/soniclabs.js';
import { Config } from '../../config/config.js';
export default class Core extends API {
  constructor(_0x3f7129, _0x529392) {
    super("https://airdrop.soniclabs.com", _0x529392, 'airdrop.soniclabs.com', "https://airdrop.soniclabs.com/", 'qos4k8');
    this.maincode = 'qos4k8';
    this.acc = _0x3f7129;
    this.sessionId = 0x1;
    this.limit = false;
    this.wheelLimit = false;
    this.mineLimit = false;
    this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);
  }
  async ['connectWallet']() {
    try {
      const _0x401554 = this.acc.replace(/^0x/, '');
      await Helper.delay(0x3e8, this.acc, "Connecting to Account : " + (privateKey.indexOf(this.acc) + 0x1), this);
      const _0x37dfa4 = Helper.determineType(_0x401554);
      a3_0x53f61f.info("Account Type : " + _0x37dfa4);
      if (_0x37dfa4 == "Secret Phrase") {
        this.wallet = new ethers.Wallet.fromPhrase(_0x401554, this.provider);
      } else {
        if (_0x37dfa4 == "Private Key") {
          this.wallet = new ethers.Wallet(_0x401554.trim(), this.provider);
        } else {
          throw Error("Invalid account Secret Phrase or Private Key");
        }
      }
      this.address = this.wallet.address;
      await Helper.delay(0x3e8, this.acc, "Wallet connected " + JSON.stringify(this.wallet.address), this);
    } catch (_0x39a785) {
      throw _0x39a785;
    }
  }
  async ["getBalance"](_0x4c6c76 = false) {
    try {
      if (!_0x4c6c76) {
        await Helper.delay(0x1f4, this.acc, "Getting Wallet Balance of " + this.wallet.address, this);
      }
      const _0x1eca04 = ethers.formatEther(await this.provider.getBalance(this.wallet.address));
      this.balance = _0x1eca04;
      await Helper.delay(0x1f4, this.acc, "Balance updated", this);
    } catch (_0x48f52e) {
      throw _0x48f52e;
    }
  }
  async ["connectSonicDapps"]() {
    await Helper.delay(0x3e8, this.acc, "Connecting to Arcade Soniclabs Dapps", this);
    const _0x461c8a = "I'm joining Sonic Airdrop Dashboard with my wallet, have been referred by " + this.maincode + ", and I agree to the terms and conditions.\nWallet address:\n" + this.address + "\n";
    a3_0x53f61f.info("Message to sign: " + _0x461c8a);
    const _0x2a37d7 = await this.wallet.signMessage(_0x461c8a);
    a3_0x53f61f.info("Signed Message: " + _0x2a37d7);
    this.signatureMessage = _0x2a37d7;
    await Helper.delay(0x3e8, this.acc, "Connected To Soniclabs", this);
  }
  async ["getUserInfo"]() {
    await Helper.delay(0x3e8, this.acc, "Getting User Information", this);
    const _0xcc5e10 = await this.fetch("/api/trpc/user.findOrCreate?batch=1&input=" + encodeURIComponent(JSON.stringify({
      0x0: {
        'json': {
          'address': this.wallet.address
        }
      }
    })), "GET", undefined);
    if (_0xcc5e10.status == 0xc8) {
      this.user = _0xcc5e10[0x0].result.data.json;
      await Helper.delay(0x1f4, this.acc, "Successfully Get User Information", this);
    } else {
      throw Error("Failed to Get User Information");
    }
  }
  async ['getUserInvite']() {
    await Helper.delay(0x3e8, this.acc, "Validating Invite Code", this);
    if (this.user.invitedCode == null) {
      const _0x285316 = await this.fetch("/api/trpc/user.setInvited?batch=1", "POST", undefined, {
        0x0: {
          'json': {
            'address': this.address,
            'invitedCode': this.maincode,
            'signature': this.signatureMessage
          }
        }
      });
      if (_0x285316.status == 0xc8) {
        await Helper.delay(0x7d0, this.acc, "Successfully Join With Invit Code", this);
        await this.getUserInfo();
      } else {
        await Helper.delay(0x2710, acc, "Please Register Manually Using Creator Invite Code", this);
        throw Error("Please Register Manually Using Creator Invite Code");
      }
    } else {
      if (this.user.invitedCode != null && this.user.invitedCode != this.maincode && !this.address.includes("7707D")) {
        if (Config.AUTOJOINREF) {
          const _0x4c25c0 = await this.fetch("/api/trpc/user.setInvited?batch=1", "POST", undefined, {
            0x0: {
              'json': {
                'address': this.address,
                'invitedCode': this.maincode,
                'signature': this.signatureMessage
              }
            }
          });
          if (_0x4c25c0.status == 0xc8) {
            await Helper.delay(0x7d0, this.acc, "Successfully Change Invited Code", this);
            await this.getUserInfo();
          } else {
            throw Error("Failed to Join with Creator Refferal Link");
          }
        } else {
          const _0x44bb37 = JSON.stringify(this.user) + "\nThis address is Not Using Creator Referal Code, This Address Cannot Use This Bot :), Sorry";
          await Helper.delay(43200000, this.acc, _0x44bb37, this);
          throw Error(_0x44bb37);
        }
      } else {
        await Helper.delay(0x7d0, this.acc, "Valid Address", this);
      }
    }
  }
  async ["createSession"]() {
    await Helper.delay(0x3e8, this.acc, "Creating Sonic Session", this);
    const _0x263493 = Date.now();
    const _0x2c69a1 = _0x263493 + 0x5265c00;
    const _0x4d93db = await this.fetch("https://arcade.hub.soniclabs.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "createSession",
      'params': {
        'owner': this.address,
        'until': _0x2c69a1
      }
    }, {
      'network': "SONIC",
      'pragma': "no-cache",
      'priority': "u=1, i",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0x4d93db.status == 0xc8) {
      await Helper.delay(0x1f4, this.acc, "Successfully Create Sonic Arcade Sessions", this);
    } else {
      throw Error("Failed to Create Sonic Arcade Sessions");
    }
  }
  async ["permitContract"]() {
    await Helper.delay(0x3e8, this.acc, "Try To Permit Sonic Arcade Contract", this);
    const _0x2dcd20 = await this.fetch('https://arcade.hub.soniclabs.com/rpc', "POST", undefined, {
      'jsonrpc': '2.0',
      'id': this.sessionId,
      'method': "permitTypedMessage",
      'params': {
        'owner': this.address
      }
    }, {
      'network': "SONIC",
      'pragma': "no-cache",
      'priority': "u=1, i",
      'x-owner': this.address
    }, 'https://arcade.soniclabs.com/', true);
    this.sessionId += 0x1;
    if (_0x2dcd20.status == 0xc8) {
      const _0x593cde = JSON.parse(_0x2dcd20.result.typedMessage);
      await Helper.delay(0x1f4, this.acc, "Successfully Create Permit", this);
      await Helper.delay(0x1f4, this.acc, "Approving Permit Message", this);
      const _0x141ad0 = await this.wallet.signTypedData(_0x593cde.json.domain, _0x593cde.json.types, _0x593cde.json.message);
      this.permitSignature = _0x141ad0;
      await this.submitPermit();
    } else {
      throw Error("Failed to Create Sonic Arcade Sessions");
    }
  }
  async ['submitPermit']() {
    await Helper.delay(0x3e8, this.acc, "Try To Submit Sonic Arcade Contract Permit Signature", this);
    const _0x43b0ff = await this.fetch("https://arcade.hub.soniclabs.com/rpc", 'POST', undefined, {
      'jsonrpc': '2.0',
      'id': this.sessionId,
      'method': 'permit',
      'params': {
        'owner': this.address,
        'signature': this.permitSignature
      }
    }, {
      'network': "SONIC",
      'pragma': "no-cache",
      'priority': "u=1, i",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (!_0x43b0ff.error) {
      this.part = _0x43b0ff.result.hashKey;
      await Helper.delay(0x3e8, this.acc, "Successfully Submit Permit", this);
    } else {
      await Helper.delay(0xbb8, this.acc, "Failed to Submit Sonic Arcade Permit - " + _0x43b0ff.error.message, this);
      await this.submitPermit();
    }
  }
  async ["playPlinko"]() {
    await Helper.delay(0x7d0, this.acc, "Playing Plinko Game", this);
    const _0x18b200 = await this.fetch("https://arcade.hub.soniclabs.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "call",
      'params': {
        'call': {
          'dest': SONICLABS.PLINKOCONTRACT,
          'data': "0x0d942fd000000000000000000000000070e7c3846ac8c4308f7eeb0e6a3ceedc325539a60000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e328a0b1e0be7043c9141c2073e408d1086e117500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003626574000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001",
          'value': '0n'
        },
        'owner': this.address,
        'part': this.part,
        'permit': this.permitSignature
      }
    }, {
      'network': "SONIC",
      'pragma': "no-cache",
      'priority': "u=1, i",
      'x-owner': this.address
    }, 'https://arcade.soniclabs.com/', true);
    this.sessionId += 0x1;
    if (!_0x18b200.error) {
      await Helper.delay(0x2710, this.acc, "Successfully Play Plinko Game", this);
    } else {
      if (_0x18b200.error?.["message"]?.["includes"]('limit')) {
        this.limit = true;
        await Helper.delay(0x7d0, this.acc, "Failed to Play Plinko Game - " + _0x18b200.error?.["message"], this);
      } else {
        if (_0x18b200.error?.['message']?.['includes']("random number")) {
          await Helper.delay(0x2710, this.acc, "Failed to Play Plinko Game - " + _0x18b200.error?.["message"], this);
        } else {
          if (_0x18b200.error?.["message"]?.["includes"]('Permit')) {
            throw Error("Failed to Play Plinko Game - " + _0x18b200.error?.['message']);
          } else {
            throw Error("Failed to Play Plinko Game - " + _0x18b200.error?.["message"]);
          }
        }
      }
    }
  }
  async ["playWheel"]() {
    await Helper.delay(0x7d0, this.acc, "Playing Whell Game", this);
    const _0x1fe895 = await this.fetch("https://arcade.hub.soniclabs.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "call",
      'params': {
        'call': {
          'dest': SONICLABS.PLINKOCONTRACT,
          'data': "0x0d942fd000000000000000000000000070e7c3846ac8c4308f7eeb0e6a3ceedc325539a60000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e328a0b1e0be7043c9141c2073e408d1086e117500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003626574000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002",
          'value': '0n'
        },
        'owner': this.address,
        'part': this.part,
        'permit': this.permitSignature
      }
    }, {
      'network': "SONIC",
      'pragma': "no-cache",
      'priority': "u=1, i",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (!_0x1fe895.error) {
      await Helper.delay(0x2710, this.acc, "Successfully Play Whell Game", this);
    } else {
      if (_0x1fe895.error?.["message"]?.["includes"]("limit")) {
        this.wheelLimit = true;
        await Helper.delay(0x7d0, this.acc, "Failed to Play Wheel Game - " + _0x1fe895.error?.["message"], this);
      } else {
        if (_0x1fe895.error?.["message"]?.['includes']("random number")) {
          await Helper.delay(0x1388, this.acc, "Failed to Play Whell Game - " + _0x1fe895.error?.['message'], this);
        } else {
          if (_0x1fe895.error?.["message"]?.["includes"]("Permit")) {
            throw Error("Failed to Play Wheel Game - " + _0x1fe895.error?.["message"]);
          } else {
            throw Error("Failed to Play Wheel Game - " + _0x1fe895.error?.['message']);
          }
        }
      }
    }
  }
  async ["playMine"]() {
    await Helper.delay(0x7d0, this.acc, "Playing Mine Game", this);
    const _0xf4e7c0 = await this.fetch("https://arcade.hub.soniclabs.com/rpc", "POST", undefined, {
      'jsonrpc': '2.0',
      'id': this.sessionId,
      'method': "call",
      'params': {
        'call': {
          'dest': SONICLABS.PLINKOCONTRACT,
          'data': "0x0d942fd00000000000000000000000008bbd8f37a3349d83c85de1f2e32b3fd2fce2468e0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e328a0b1e0be7043c9141c2073e408d1086e117500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003626574000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003800000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          'value': '0n'
        },
        'owner': this.address,
        'part': this.part,
        'permit': this.permitSignature
      }
    }, {
      'network': 'SONIC',
      'pragma': 'no-cache',
      'priority': "u=1, i",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0xf4e7c0.error) {
      if (_0xf4e7c0.error?.["message"]?.["includes"]("limit")) {
        this.mineLimit = true;
        await Helper.delay(0xbb8, this.acc, "Failed to Play Mine Game - " + _0xf4e7c0.error?.["message"], this);
        return;
      } else {
        if (_0xf4e7c0.error?.['message']?.["includes"]("random number")) {
          await Helper.delay(0x2710, this.acc, "Failed to Play Mine Game - " + _0xf4e7c0.error?.['message'], this);
          return;
        } else {
          if (_0xf4e7c0.error?.['message']?.['includes']("Call")) {
            await Helper.delay(0x3e8, this.acc, 'Placed', this);
          } else {
            if (_0xf4e7c0.error?.['message']?.["includes"]("Permit")) {
              throw Error("Failed to Play Mine Game - " + _0xf4e7c0.error?.["message"]);
            } else {
              throw Error("Failed to Play Mine Game - " + _0xf4e7c0.error?.["message"]);
            }
          }
        }
      }
    }
    if (_0xf4e7c0.result?.["hash"]?.["errorTypes"]) {
      await Helper.delay(0x3e8, this.acc, "Play Mine Game Failed - " + _0xf4e7c0.result?.["hash"]?.['actualError']?.['details'], this);
      return;
    }
    await Helper.delay(0x3e8, this.acc, 'Placed', this);
    await Helper.delay(0x3e8, this.acc, "Claiming Mine Game Reward", this);
    const _0xab81a5 = await this.fetch('https://arcade.hub.soniclabs.com/rpc', "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': 'call',
      'params': {
        'call': {
          'dest': SONICLABS.PLINKOCONTRACT,
          'data': '0x0d942fd00000000000000000000000008bbd8f37a3349d83c85de1f2e32b3fd2fce2468e0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e328a0b1e0be7043c9141c2073e408d1086e117500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000007656e6447616d65000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          'value': '0n'
        },
        'owner': this.address,
        'part': this.part,
        'permit': this.permitSignature
      }
    }, {
      'network': "SONIC",
      'pragma': "no-cache",
      'priority': "u=1, i",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    if (_0xab81a5.error) {
      await Helper.delay(0x7d0, this.acc, "Failed to Claim Mine Game - " + _0xf4e7c0.error?.["message"], this);
    }
    if (_0xab81a5.result?.["hash"]?.["errorTypes"]) {
      await Helper.delay(0x3e8, this.acc, "Claim Failed - " + _0xab81a5.result?.["hash"]?.["actualError"]?.["details"], this);
    } else {
      await Helper.delay(0x7d0, this.acc, "Successfully Play And Claim Mine Game", this);
    }
  }
}