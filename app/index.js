import { privateKey } from './accounts/accounts.js';
import { Config } from './config/config.js';
import { proxyList } from './config/proxy_list.js';
import a0_0x589c60 from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x44ed0d from './src/utils/logger.js';
async function operation(_0x56decf, _0x3424a6, _0x4921db) {
  const _0x5213e4 = new a0_0x589c60(_0x56decf, _0x3424a6, _0x4921db);
  try {
    await _0x5213e4.connectWallet();
    await _0x5213e4.getBalance();
    if (Config.DISPLAYPOINT) {
      await Helper.retryOperation(_0x5213e4.getPoint.bind(_0x5213e4, false), _0x56decf, _0x5213e4);
    }
    await Helper.retryOperation(_0x5213e4.connectSonicDapps.bind(_0x5213e4, false), _0x56decf, _0x5213e4);
    await Helper.retryOperation(_0x5213e4.getUserInfo.bind(_0x5213e4, false), _0x56decf, _0x5213e4);
    await Helper.retryOperation(_0x5213e4.getUserInvite.bind(_0x5213e4, false), _0x56decf, _0x5213e4);
    await Helper.retryOperation(_0x5213e4.createSession.bind(_0x5213e4, false), _0x56decf, _0x5213e4);
    await Helper.retryOperation(_0x5213e4.permitContract.bind(_0x5213e4, false), _0x56decf, _0x5213e4);
    while (_0x5213e4.limit == false) {
      await Helper.retryOperation(_0x5213e4.playPlinko.bind(_0x5213e4, false), _0x56decf, _0x5213e4);
      if (Config.DISPLAYPOINT) {
        await Helper.retryOperation(_0x5213e4.getPoint.bind(_0x5213e4, false), _0x56decf, _0x5213e4);
      }
    }
    while (_0x5213e4.wheelLimit == false) {
      await Helper.retryOperation(_0x5213e4.playWheel.bind(_0x5213e4, false), _0x56decf, _0x5213e4);
      if (Config.DISPLAYPOINT) {
        await Helper.retryOperation(_0x5213e4.getPoint.bind(_0x5213e4, false), _0x56decf, _0x5213e4);
      }
    }
    while (_0x5213e4.mineLimit == false) {
      await Helper.retryOperation(_0x5213e4.playMine.bind(_0x5213e4, false), _0x56decf, _0x5213e4);
      if (Config.DISPLAYPOINT) {
        await Helper.retryOperation(_0x5213e4.getPoint.bind(_0x5213e4, false), _0x56decf, _0x5213e4);
      }
    }
    const _0x1dbd0a = privateKey.find(_0x339e43 => _0x339e43.pk == _0x56decf);
    const _0x564570 = privateKey.indexOf(_0x1dbd0a);
    await Helper.delay(43200000, _0x56decf, "Account " + (_0x564570 + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(43200000), _0x5213e4);
    await operation(_0x56decf, _0x3424a6, _0x4921db);
  } catch (_0x323cc2) {
    if (_0x323cc2.message) {
      await Helper.delay(0x2710, _0x56decf, "Error : " + _0x323cc2.message + ", Retry again after 10 Second", _0x5213e4);
    } else {
      await Helper.delay(0x2710, _0x56decf, "Error :" + JSON.stringify(_0x323cc2) + ", Retry again after 10 Second", _0x5213e4);
    }
    await operation(_0x56decf, _0x3424a6, _0x4921db);
  }
}
async function startBot() {
  return new Promise(async (_0xc05774, _0x2dde29) => {
    try {
      a0_0x44ed0d.info("BOT STARTED");
      const _0x32bdd9 = [];
      if (proxyList.length != privateKey.length && proxyList.length != 0x0) {
        throw Error("You Have " + privateKey.length + " Accounts But Provide " + proxyList.length);
      }
      for (const _0x4c9646 of privateKey) {
        if (!_0x4c9646.pk) {
          throw Error("Your accounts.js is malformed, please fix it first, see accounts_tmp.js for the format");
        }
        const _0x3cf49e = privateKey.indexOf(_0x4c9646);
        const _0x5bd235 = proxyList[_0x3cf49e];
        _0x32bdd9.push(operation(_0x4c9646.pk, _0x4c9646.smartWalletAddress, _0x5bd235));
      }
      await Promise.all(_0x32bdd9);
      _0xc05774();
    } catch (_0x2d91ed) {
      a0_0x44ed0d.info("BOT STOPPED");
      a0_0x44ed0d.error(JSON.stringify(_0x2d91ed));
      _0x2dde29(_0x2d91ed);
    }
  });
}
(async () => {
  try {
    a0_0x44ed0d.clear();
    a0_0x44ed0d.info('');
    a0_0x44ed0d.info("Application Started");
    console.log("Soniclabs Arcade Testnet BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x8275a3) {
    console.log("Error During executing bot", _0x8275a3);
    await startBot();
  }
})();
