import { privateKey } from './accounts/accounts.js';
import { proxyList } from './config/proxy_list.js';
import a0_0x479e5e from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x19bbf7 from './src/utils/logger.js';
import a0_0x393f2a from './src/utils/twist.js';
async function operation(_0x29134e, _0x50e1c1) {
  const _0x168807 = new a0_0x479e5e(_0x29134e, _0x50e1c1);
  try {
    await _0x168807.connectWallet();
    await _0x168807.getBalance();
    await _0x168807.connectSonicDapps();
    await _0x168807.getUserInfo();
    await _0x168807.getUserInvite();
    await _0x168807.createSession();
    await _0x168807.permitContract();
    while (_0x168807.limit == false) {
      await _0x168807.playPlinko();
    }
    while (_0x168807.wheelLimit == false) {
      await _0x168807.playWheel();
    }
    while (_0x168807.mineLimit == false) {
      await _0x168807.playMine();
    }
    await Helper.delay(43200000, _0x29134e, "Account " + (privateKey.indexOf(_0x29134e) + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(43200000), _0x168807);
    await operation(_0x29134e, _0x50e1c1);
  } catch (_0x50c73f) {
    if (_0x50c73f.message) {
      await Helper.delay(0x2710, _0x29134e, "Error : " + _0x50c73f.message + ", Retry again after 10 Second", _0x168807);
    } else {
      await Helper.delay(0x2710, _0x29134e, "Error :" + JSON.stringify(_0x50c73f) + ", Retry again after 10 Second", _0x168807);
    }
    await operation(_0x29134e, _0x50e1c1);
  }
}
async function startBot() {
  return new Promise(async (_0x435178, _0x3f8676) => {
    try {
      a0_0x19bbf7.info("BOT STARTED");
      const _0x15ac38 = [];
      if (proxyList.length != privateKey.length && proxyList.length != 0x0) {
        throw Error("You Have " + privateKey.length + " Accounts But Provide " + proxyList.length);
      }
      for (const _0x4f50e3 of privateKey) {
        const _0x10c790 = privateKey.indexOf(_0x4f50e3);
        const _0x34b521 = proxyList[_0x10c790];
        _0x15ac38.push(operation(_0x4f50e3, _0x34b521));
      }
      await Promise.all(_0x15ac38);
      _0x435178();
    } catch (_0x4cd5e0) {
      a0_0x19bbf7.info("BOT STOPPED");
      a0_0x19bbf7.error(JSON.stringify(_0x4cd5e0));
      _0x3f8676(_0x4cd5e0);
    }
  });
}
(async () => {
  try {
    a0_0x19bbf7.clear();
    a0_0x19bbf7.info('');
    a0_0x19bbf7.info("Application Started");
    console.log("Soniclabs Arcade Testnet BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0xd3fec3) {
    a0_0x393f2a.clear();
    a0_0x393f2a.clearInfo();
    console.log("Error During executing bot", _0xd3fec3);
    await startBot();
  }
})();