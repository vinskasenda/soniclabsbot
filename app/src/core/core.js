import { ethers } from 'ethers';
import { API } from '../api/api.js';
import { privateKey } from '../../accounts/accounts.js';
import { Helper } from '../utils/helper.js';
import a3_0x4c87c1 from '../utils/logger.js';
import { RPC } from './network/rpc.js';
import { SONICLABS } from './dapps/soniclabs.js';
import { Config } from '../../config/config.js';
import './abi/soniclabs_abi.js';
export default class Core extends API {
  constructor(_0x333bb5, _0x2d4d02, _0x39eeac) {
    super('https://airdrop.soniclabs.com', _0x39eeac, "airdrop.soniclabs.com", 'https://airdrop.soniclabs.com/', "4K0I6S");
    this.maincode = "4K0I6S";
    this.acc = _0x333bb5;
    this.sessionId = 0x1;
    this.smartWalletAddr = _0x2d4d02;
    this.limit = false;
    this.wheelLimit = false;
    this.mineLimit = false;
    this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);
  }
  async ["connectWallet"]() {
    try {
      const _0xa7ed23 = this.acc;
      const _0x323a36 = privateKey.find(_0xe2fd80 => _0xe2fd80.pk == this.acc);
      const _0x93be47 = privateKey.indexOf(_0x323a36);
      await Helper.delay(0x3e8, this.acc, "Connecting to Account : " + (_0x93be47 + 0x1), this);
      const _0x2688c5 = Helper.determineType(_0xa7ed23);
      a3_0x4c87c1.info("Account Type : " + _0x2688c5);
      if (_0x2688c5 == "Secret Phrase") {
        this.wallet = new ethers.Wallet.fromPhrase(_0xa7ed23, this.provider);
      } else {
        if (_0x2688c5 == "Private Key") {
          this.wallet = new ethers.Wallet(_0xa7ed23.trim(), this.provider);
        } else {
          throw Error("Invalid account Secret Phrase or Private Key");
        }
      }
      this.address = this.wallet.address;
      await Helper.delay(0x3e8, this.acc, "Wallet connected " + JSON.stringify(this.wallet.address), this);
    } catch (_0x461727) {
      throw _0x461727;
    }
  }
  async ["getBalance"](_0x6155d4 = false) {
    try {
      if (!_0x6155d4) {
        await Helper.delay(0x1f4, this.acc, "Getting Wallet Balance of " + this.wallet.address, this);
      }
      const _0x187feb = ethers.formatEther(await this.provider.getBalance(this.wallet.address));
      this.balance = _0x187feb;
      await Helper.delay(0x1f4, this.acc, "Balance updated", this);
    } catch (_0x5a71ff) {
      throw _0x5a71ff;
    }
  }
  async ["connectSonicDapps"]() {
    await Helper.delay(0x3e8, this.acc, "Connecting to Arcade Soniclabs Dapps", this);
    const _0x5e2083 = "I'm joining Sonic Airdrop Dashboard with my wallet, have been referred by " + this.maincode + ", and I agree to the terms and conditions.\nWallet address:\n" + this.address + "\n";
    a3_0x4c87c1.info("Message to sign: " + _0x5e2083);
    const _0x4167ff = await this.wallet.signMessage(_0x5e2083);
    a3_0x4c87c1.info("Signed Message: " + _0x4167ff);
    this.signatureMessage = _0x4167ff;
    await Helper.delay(0x3e8, this.acc, "Connected To Soniclabs", this);
  }
  async ['getUserInfo']() {
    await Helper.delay(0x3e8, this.acc, "Getting User Information", this);
    const _0x43df90 = await this.fetch("/api/trpc/user.findOrCreate?batch=1&input=" + encodeURIComponent(JSON.stringify({
      0x0: {
        'json': {
          'address': this.wallet.address
        }
      }
    })), "GET", undefined);
    if (_0x43df90.status == 0xc8) {
      this.user = _0x43df90[0x0].result.data.json;
      await Helper.delay(0x1f4, this.acc, "Successfully Get User Information", this);
    } else {
      throw Error("Failed to Get User Information");
    }
  }
  async ['getUserInvite']() {
    await Helper.delay(0x3e8, this.acc, "Validating Invite Code", this);
    if (this.user.invitedCode == null) {
      const _0x106a01 = await this.fetch("/api/trpc/user.setInvited?batch=1", "POST", undefined, {
        0x0: {
          'json': {
            'address': this.address,
            'invitedCode': this.maincode,
            'signature': this.signatureMessage
          }
        }
      });
      if (_0x106a01.status == 0xc8) {
        await Helper.delay(0x7d0, this.acc, "Successfully Join With Invit Code", this);
        await this.getUserInfo();
      } else {
        await Helper.delay(0x2710, acc, "Please Register Manually Using Creator Invite Code", this);
        throw Error("Please Register Manually Using Creator Invite Code");
      }
    } else {
      if (this.user.invitedCode != null && this.user.invitedCode != this.maincode && !this.address.includes("7707D")) {
        if (Config.AUTOJOINREF) {
          const _0x1a0672 = await this.fetch('/api/trpc/user.setInvited?batch=1', 'POST', undefined, {
            0x0: {
              'json': {
                'address': this.address,
                'invitedCode': this.maincode,
                'signature': this.signatureMessage
              }
            }
          });
          if (_0x1a0672.status == 0xc8) {
            await Helper.delay(0x7d0, this.acc, "Successfully Change Invited Code", this);
            await this.getUserInfo();
          } else {
            throw Error("Failed to Join with Creator Refferal Link");
          }
        } else {
          const _0x4ebb78 = JSON.stringify(this.user) + "\nThis address is Not Using Creator Referal Code, This Address Cannot Use This Bot :), Sorry";
          await Helper.delay(43200000, this.acc, _0x4ebb78, this);
          throw Error(_0x4ebb78);
        }
      } else {
        await Helper.delay(0x7d0, this.acc, "Valid Address", this);
      }
    }
  }
  async ["createSession"]() {
    await Helper.delay(0x3e8, this.acc, "Creating Sonic Session", this);
    const _0x36c01b = Date.now();
    const _0x5c9a70 = _0x36c01b + 0x5265c00;
    const _0x41bfba = await this.fetch("https://sonic-hub1.joinrebellion.com/rpc", 'POST', undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "createSession",
      'params': {
        'owner': this.address,
        'until': _0x5c9a70
      }
    }, {
      'network': "SONIC",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0x41bfba.status == 0xc8) {
      await Helper.delay(0x1f4, this.acc, "Successfully Create Sonic Arcade Sessions", this);
    } else {
      throw Error("Failed to Create Sonic Arcade Sessions");
    }
  }
  async ["registUserKey"]() {
    try {
      await Helper.delay(0x3e8, this.acc, "Registering User Key", this);
      const _0x50d4fe = new ethers.Interface([{
        'inputs': [{
          'internalType': "address",
          'name': 'spender',
          'type': "address"
        }, {
          'internalType': "uint256",
          'name': "amount",
          'type': "uint256"
        }],
        'name': "approve",
        'outputs': [{
          'internalType': "bool",
          'name': '',
          'type': "bool"
        }],
        'stateMutability': "nonpayable",
        'type': "function"
      }]);
      const _0xa18fe = _0x50d4fe.encodeFunctionData("approve", [this.address, ethers.MaxUint256]);
      const _0x3304eb = await this.fetch("https://sonic-hub1.joinrebellion.com/rpc", "POST", undefined, {
        'jsonrpc': '2.0',
        'id': 0x7,
        'method': "call",
        'params': {
          'call': {
            'dest': SONICLABS.ARCADEGAMECONTRACT,
            'data': _0xa18fe,
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
      if (_0x3304eb.status == 0xc8) {
        await Helper.delay(0x3e8, this.acc, "Successfully Registering User Key", this);
        await this.getPoint();
      } else {
        await Helper.delay(0x7d0, this.acc, "Failed to Register User Key", this);
        await this.registUserKey();
      }
    } catch (_0x4c9c89) {
      await this.registUserKey();
    }
  }
  async ["permitContract"]() {
    await Helper.delay(0x3e8, this.acc, "Try To Permit Sonic Arcade Contract", this);
    const _0x10936c = await this.fetch("https://sonic-hub1.joinrebellion.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': 'permitTypedMessage',
      'params': {
        'owner': this.address
      }
    }, {
      'network': "SONIC",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0x10936c.status == 0xc8) {
      const _0x3cf958 = JSON.parse(_0x10936c.result.typedMessage);
      await Helper.delay(0x1f4, this.acc, "Successfully Create Permit", this);
      await Helper.delay(0x1f4, this.acc, "Approving Permit Message", this);
      const _0x1e77b3 = await this.wallet.signTypedData(_0x3cf958.json.domain, _0x3cf958.json.types, _0x3cf958.json.message);
      this.permitSignature = _0x1e77b3;
      await this.submitPermit();
    } else {
      throw Error("Failed to Create Sonic Arcade Sessions");
    }
  }
  async ["refund"](_0x5b6d8c) {
    await Helper.delay(0x3e8, this.acc, "Refunding " + _0x5b6d8c + " Game To Resolve Awaiting Random Number", this);
    const _0x4d50a1 = await this.fetch("https://sonic-hub1.joinrebellion.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "refund",
      'params': {
        'game': _0x5b6d8c,
        'player': this.smartWalletAddr
      }
    }, {
      'network': "SONIC",
      'x-owner': this.address
    }, 'https://arcade.soniclabs.com/', true);
    this.sessionId += 0x1;
    if (_0x4d50a1.status == 0xc8) {
      await Helper.delay(0x3e8, this.acc, "Successfully Refund " + _0x5b6d8c + " Game", this);
    } else {
      throw Error("Failed to Refund Game");
    }
  }
  async ["reIterate"](_0x4ff66f) {
    await Helper.delay(0x3e8, this.acc, "Reiterate " + _0x4ff66f + " Game To Resolve Awaiting Random Number", this);
    const _0x4be097 = await this.fetch("https://sonic-hub1.joinrebellion.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': 'reIterate',
      'params': {
        'game': _0x4ff66f,
        'player': this.smartWalletAddr
      }
    }, {
      'network': "SONIC",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0x4be097.status == 0xc8) {
      await Helper.delay(0x3e8, this.acc, "Successfully Reiterate " + _0x4ff66f + " Game", this);
    } else {
      throw Error("Failed to Reiterate Game");
    }
  }
  async ['submitPermit']() {
    await Helper.delay(0x3e8, this.acc, "Try To Submit Sonic Arcade Contract Permit Signature", this);
    const _0x5d933a = await this.fetch("https://sonic-hub1.joinrebellion.com/rpc", 'POST', undefined, {
      'jsonrpc': '2.0',
      'id': this.sessionId,
      'method': "permit",
      'params': {
        'owner': this.address,
        'signature': this.permitSignature
      }
    }, {
      'network': 'SONIC',
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (!_0x5d933a.error) {
      this.part = _0x5d933a.result.hashKey;
      await Helper.delay(0x3e8, this.acc, "Successfully Submit Permit", this);
    } else {
      throw Error("Failed to Submit Sonic Arcade Permit - " + _0x5d933a.error.message);
    }
  }
  async ["playPlinko"]() {
    await Helper.delay(0x7d0, this.acc, "Playing Plinko Game", this);
    const _0x19b494 = await this.fetch("https://sonic-hub1.joinrebellion.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "call",
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
      'network': "SONIC",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (!_0x19b494.error) {
      await Helper.delay(0x2710, this.acc, "Successfully Play Plinko Game", this);
    } else {
      if (_0x19b494.error?.['message']?.["includes"]('limit')) {
        this.limit = true;
        await Helper.delay(0x7d0, this.acc, "Failed to Play Plinko Game - " + _0x19b494.error?.["message"], this);
      } else {
        if (_0x19b494.error?.['message']?.["includes"]("random number")) {
          await Helper.delay(0x2710, this.acc, "Failed to Play Plinko Game - " + _0x19b494.error?.["message"], this);
          await this.reIterate("plinko");
          return;
        } else {
          if (_0x19b494.error?.["message"]?.["includes"]("Permit")) {
            throw Error("Failed to Play Plinko Game - " + _0x19b494.error?.['message']);
          } else {
            throw Error("Failed to Play Plinko Game - " + _0x19b494.error?.["message"]);
          }
        }
      }
    }
  }
  async ["playWheel"]() {
    await Helper.delay(0x7d0, this.acc, "Playing Whell Game", this);
    const _0x316c17 = await this.fetch("https://sonic-hub1.joinrebellion.com/rpc", "POST", undefined, {
      'jsonrpc': '2.0',
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
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (!_0x316c17.error) {
      await Helper.delay(0x2710, this.acc, "Successfully Play Whell Game", this);
    } else {
      if (_0x316c17.error?.["message"]?.["includes"]("limit")) {
        this.wheelLimit = true;
        await Helper.delay(0x7d0, this.acc, "Failed to Play Wheel Game - " + _0x316c17.error?.["message"], this);
      } else {
        if (_0x316c17.error?.["message"]?.["includes"]("random number")) {
          await Helper.delay(0x1388, this.acc, "Failed to Play Wheel Game - " + _0x316c17.error?.["message"], this);
          await this.reIterate("singlewheel");
          return;
        } else {
          if (_0x316c17.error?.["message"]?.["includes"]("Permit")) {
            throw Error("Failed to Play Wheel Game - " + _0x316c17.error?.['message']);
          } else {
            throw Error("Failed to Play Wheel Game - " + _0x316c17.error?.["message"]);
          }
        }
      }
    }
  }
  async ["playMine"]() {
    await Helper.delay(0x7d0, this.acc, "Playing Mine Game", this);
    const _0x5d497a = await this.fetch("https://sonic-hub1.joinrebellion.com/rpc", "POST", undefined, {
      'jsonrpc': "2.0",
      'id': this.sessionId,
      'method': "call",
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
      'network': "SONIC",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    this.sessionId += 0x1;
    if (_0x5d497a.error) {
      if (_0x5d497a.error?.["message"]?.["includes"]('limit')) {
        this.mineLimit = true;
        await Helper.delay(0xbb8, this.acc, "Failed to Play Mine Game - " + _0x5d497a.error?.["message"], this);
        return;
      } else {
        if (_0x5d497a.error?.["message"]?.["includes"]("random number")) {
          await Helper.delay(0x2710, this.acc, "Failed to Play Mine Game - " + _0x5d497a.error?.["message"], this);
          await this.reIterate('mines');
          return;
        } else {
          if (_0x5d497a.error?.['message']?.['includes']("Call")) {
            await Helper.delay(0x3e8, this.acc, "Placed", this);
          } else {
            if (_0x5d497a.error?.["message"]?.['includes']("Permit")) {
              throw Error("Failed to Play Mine Game - " + _0x5d497a.error?.["message"]);
            } else {
              throw Error("Failed to Play Mine Game - " + _0x5d497a.error?.["message"]);
            }
          }
        }
      }
    }
    if (_0x5d497a.result?.["hash"]?.['errorTypes']) {
      await Helper.delay(0x3e8, this.acc, "Play Mine Game Failed - " + _0x5d497a.result?.["hash"]?.['actualError']?.["details"], this);
      return;
    }
    await Helper.delay(0x3e8, this.acc, 'Placed', this);
    await Helper.delay(0x3e8, this.acc, "Claiming Mine Game Reward", this);
    const _0xa4ec38 = await this.fetch('https://sonic-hub1.joinrebellion.com/rpc', "POST", undefined, {
      'jsonrpc': "2.0",
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
      'network': "SONIC",
      'x-owner': this.address
    }, "https://arcade.soniclabs.com/", true);
    if (_0xa4ec38.error) {
      await Helper.delay(0x7d0, this.acc, "Failed to Claim Mine Game - " + _0x5d497a.error?.["message"], this);
    }
    if (_0xa4ec38.result?.["hash"]?.["errorTypes"]) {
      await Helper.delay(0x3e8, this.acc, "Claim Failed - " + _0xa4ec38.result?.['hash']?.['actualError']?.["details"], this);
    } else {
      await Helper.delay(0x7d0, this.acc, "Successfully Play And Claim Mine Game", this);
    }
  }
  async ["getPoint"](_0x2da586 = false) {
    if (_0x2da586) {
      await Helper.delay(0x3e8, this.acc, "Getting User Point", this);
    }
    const _0x4cd72e = await this.fetch("https://arcade.gateway.soniclabs.com/game/points-by-player?wallet=" + this.smartWalletAddr, "GET", undefined, undefined, undefined, "https://arcade.soniclabs.com/", true);
    if (_0x4cd72e.status == 0xc8) {
      this.point = _0x4cd72e;
      if (_0x2da586) {
        await Helper.delay(0x3e8, this.acc, "Successfully Get User Point", this);
      }
    } else {
      if (_0x4cd72e.status == 0x1f4) {
        throw Error("Failed to get User Point - " + _0x4cd72e.error + ", Please Play a Game Manually So Your User Key Will be Registered");
      } else {
        throw Error("Failed to get User Point");
      }
    }
  }
}
