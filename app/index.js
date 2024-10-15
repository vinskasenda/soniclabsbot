import { privateKey } from './accounts/accounts.js';
import { proxyList } from './config/proxy_list.js';
import a0_0x1b6104 from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x374510 from './src/utils/logger.js';
import a0_0xf36cbe from './src/utils/twist.js';
async function operation(_0x570eb9, _0xa5c93f, _0x3d75ea) {
  const _0x55b4db = new a0_0x1b6104(_0x570eb9, _0xa5c93f, _0x3d75ea);
  try {
    await _0x55b4db.connectWallet();
    await _0x55b4db.getBalance();
    await _0x55b4db.getPoint(true);
    await _0x55b4db.connectSonicDapps();
    await _0x55b4db.getUserInfo();
    await _0x55b4db.getUserInvite();
    await _0x55b4db.createSession();
    await _0x55b4db.permitContract();
    while (_0x55b4db.limit == false) {
      await _0x55b4db.playPlinko();
      await _0x55b4db.getPoint();
    }
    while (_0x55b4db.wheelLimit == false) {
      await _0x55b4db.playWheel();
      await _0x55b4db.getPoint();
    }
    while (_0x55b4db.mineLimit == false) {
      await _0x55b4db.playMine();
      await _0x55b4db.getPoint();
    }
    const _0x1a202a = privateKey.find(_0x2b81ab => _0x2b81ab.pk == _0x570eb9);
    const _0x3e7461 = privateKey.indexOf(_0x1a202a);
    await Helper.delay(43200000, _0x570eb9, "Account " + (_0x3e7461 + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(43200000), _0x55b4db);
    await operation(_0x570eb9, _0xa5c93f, _0x3d75ea);
  } catch (_0x45d553) {
    if (_0x45d553.message) {
      await Helper.delay(0x2710, _0x570eb9, "Error : " + _0x45d553.message + ", Retry again after 10 Second", _0x55b4db);
    } else {
      await Helper.delay(0x2710, _0x570eb9, "Error :" + JSON.stringify(_0x45d553) + ", Retry again after 10 Second", _0x55b4db);
    }
    await operation(_0x570eb9, _0xa5c93f, _0x3d75ea);
  }
}
async function startBot() {
  return new Promise(async (_0x495e40, _0x33a8f8) => {
    try {
      a0_0x374510.info("BOT STARTED");
      const _0x1107b3 = [];
      if (proxyList.length != privateKey.length && proxyList.length != 0x0) {
        throw Error("You Have " + privateKey.length + " Accounts But Provide " + proxyList.length);
      }
      for (const _0x449a59 of privateKey) {
        if (!_0x449a59.pk) {
          throw Error("Your accounts.js is malformed, please fix it first, see accounts_tmp.js for the format");
        }
        const _0x12f712 = privateKey.indexOf(_0x449a59);
        const _0x4f0f15 = proxyList[_0x12f712];
        _0x1107b3.push(operation(_0x449a59.pk, _0x449a59.smartWalletAddress, _0x4f0f15));
      }
      await Promise.all(_0x1107b3);
      _0x495e40();
    } catch (_0x3e51b2) {
      a0_0x374510.info("BOT STOPPED");
      a0_0x374510.error(JSON.stringify(_0x3e51b2));
      _0x33a8f8(_0x3e51b2);
    }
  });
}
(async () => {
  try {
    a0_0x374510.clear();
    a0_0x374510.info('');
    a0_0x374510.info("Application Started");
    console.log("Soniclabs Arcade Testnet BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x1494d7) {
    a0_0xf36cbe.clear();
    a0_0xf36cbe.clearInfo();
    console.log("Error During executing bot", _0x1494d7);
    await startBot();
  }
})();
