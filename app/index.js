import { privateKey } from './accounts/accounts.js';
import { proxyList } from './config/proxy_list.js';
import a0_0x31c372 from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x44df79 from './src/utils/logger.js';
import a0_0x2a97b9 from './src/utils/twist.js';
async function operation(_0x51c204, _0x4ac656, _0x3d3664) {
  const _0x3ef4b2 = new a0_0x31c372(_0x51c204, _0x4ac656, _0x3d3664);
  try {
    await _0x3ef4b2.connectWallet();
    await _0x3ef4b2.getBalance();
    await _0x3ef4b2.getPoint();
    await _0x3ef4b2.connectSonicDapps();
    await _0x3ef4b2.getUserInfo();
    await _0x3ef4b2.getUserInvite();
    await _0x3ef4b2.createSession();
    await _0x3ef4b2.permitContract();
    while (_0x3ef4b2.limit == false) {
      await _0x3ef4b2.playPlinko();
      await _0x3ef4b2.getPoint();
    }
    while (_0x3ef4b2.wheelLimit == false) {
      await _0x3ef4b2.playWheel();
      await _0x3ef4b2.getPoint();
    }
    while (_0x3ef4b2.mineLimit == false) {
      await _0x3ef4b2.playMine();
      await _0x3ef4b2.getPoint();
    }
    await Helper.delay(43200000, _0x51c204, "Account " + (privateKey.indexOf(_0x51c204) + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(43200000), _0x3ef4b2);
    await operation(_0x51c204, _0x4ac656, _0x3d3664);
  } catch (_0x3bcc5c) {
    if (_0x3bcc5c.message) {
      await Helper.delay(0x2710, _0x51c204, "Error : " + _0x3bcc5c.message + ", Retry again after 10 Second", _0x3ef4b2);
    } else {
      await Helper.delay(0x2710, _0x51c204, "Error :" + JSON.stringify(_0x3bcc5c) + ", Retry again after 10 Second", _0x3ef4b2);
    }
    await operation(_0x51c204, _0x4ac656, _0x3d3664);
  }
}
async function startBot() {
  return new Promise(async (_0x40222a, _0x237873) => {
    try {
      a0_0x44df79.info("BOT STARTED");
      const _0x359441 = [];
      if (proxyList.length != privateKey.length && proxyList.length != 0x0) {
        throw Error("You Have " + privateKey.length + " Accounts But Provide " + proxyList.length);
      }
      for (const _0x343bce of privateKey) {
        const _0xe2abfc = privateKey.indexOf(_0x343bce);
        const _0x41f762 = proxyList[_0xe2abfc];
        _0x359441.push(operation(_0x343bce.pk, _0x343bce.smartWalletAddress, _0x41f762));
      }
      await Promise.all(_0x359441);
      _0x40222a();
    } catch (_0x4664f9) {
      a0_0x44df79.info("BOT STOPPED");
      a0_0x44df79.error(JSON.stringify(_0x4664f9));
      _0x237873(_0x4664f9);
    }
  });
}
(async () => {
  try {
    a0_0x44df79.clear();
    a0_0x44df79.info('');
    a0_0x44df79.info("Application Started");
    console.log("Soniclabs Arcade Testnet BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x4b89c0) {
    a0_0x2a97b9.clear();
    a0_0x2a97b9.clearInfo();
    console.log("Error During executing bot", _0x4b89c0);
    await startBot();
  }
})();
