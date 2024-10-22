import { privateKey } from './accounts/accounts.js';
import { Config } from './config/config.js';
import { proxyList } from './config/proxy_list.js';
import a0_0x3c7582 from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x23b1d9 from './src/utils/logger.js';
async function operation(_0x3fd3ea, _0x558e18, _0x2b69df) {
  const _0x5deb10 = new a0_0x3c7582(_0x3fd3ea, _0x558e18, _0x2b69df);
  try {
    await _0x5deb10.connectWallet();
    await _0x5deb10.getBalance();
    if (Config.DISPLAYPOINT) {
      await Helper.retryOperation(_0x5deb10.getPoint.bind(_0x5deb10, false), _0x3fd3ea, _0x5deb10);
    }
    await Helper.retryOperation(_0x5deb10.connectSonicDapps.bind(_0x5deb10, false), _0x3fd3ea, _0x5deb10);
    await Helper.retryOperation(_0x5deb10.getUserInfo.bind(_0x5deb10, false), _0x3fd3ea, _0x5deb10);
    await Helper.retryOperation(_0x5deb10.getUserInvite.bind(_0x5deb10, false), _0x3fd3ea, _0x5deb10);
    await Helper.retryOperation(_0x5deb10.createSession.bind(_0x5deb10, false), _0x3fd3ea, _0x5deb10);
    await Helper.retryOperation(_0x5deb10.permitContract.bind(_0x5deb10, false), _0x3fd3ea, _0x5deb10);
    while (_0x5deb10.limit == false) {
      await Helper.retryOperation(_0x5deb10.playPlinko.bind(_0x5deb10, false), _0x3fd3ea, _0x5deb10);
      if (Config.DISPLAYPOINT) {
        await Helper.retryOperation(_0x5deb10.getPoint.bind(_0x5deb10, false), _0x3fd3ea, _0x5deb10);
      }
    }
    while (_0x5deb10.wheelLimit == false) {
      await Helper.retryOperation(_0x5deb10.playWheel.bind(_0x5deb10, false), _0x3fd3ea, _0x5deb10);
      if (Config.DISPLAYPOINT) {
        await Helper.retryOperation(_0x5deb10.getPoint.bind(_0x5deb10, false), _0x3fd3ea, _0x5deb10);
      }
    }
    while (_0x5deb10.mineLimit == false) {
      await Helper.retryOperation(_0x5deb10.playMine.bind(_0x5deb10, false), _0x3fd3ea, _0x5deb10);
      if (Config.DISPLAYPOINT) {
        await Helper.retryOperation(_0x5deb10.getPoint.bind(_0x5deb10, false), _0x3fd3ea, _0x5deb10);
      }
    }
    const _0x1c23c3 = privateKey.find(_0x56e610 => _0x56e610.pk == _0x3fd3ea);
    const _0x5428f4 = privateKey.indexOf(_0x1c23c3);
    await Helper.delay(43200000, _0x3fd3ea, "Account " + (_0x5428f4 + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(43200000), _0x5deb10);
    await operation(_0x3fd3ea, _0x558e18, _0x2b69df);
  } catch (_0x2ba9a3) {
    if (_0x2ba9a3.message) {
      await Helper.delay(0x2710, _0x3fd3ea, "Error : " + _0x2ba9a3.message + ", Retry again after 10 Second", _0x5deb10);
    } else {
      await Helper.delay(0x2710, _0x3fd3ea, "Error :" + JSON.stringify(_0x2ba9a3) + ", Retry again after 10 Second", _0x5deb10);
    }
    await operation(_0x3fd3ea, _0x558e18, _0x2b69df);
  }
}
async function startBot() {
  return new Promise(async (_0xf5abe0, _0xca11db) => {
    try {
      a0_0x23b1d9.info("BOT STARTED");
      const _0x19cd86 = [];
      if (proxyList.length != privateKey.length && proxyList.length != 0x0) {
        throw Error("You Have " + privateKey.length + " Accounts But Provide " + proxyList.length);
      }
      for (const _0x391d30 of privateKey) {
        if (!_0x391d30.pk) {
          throw Error("Your accounts.js is malformed, please fix it first, see accounts_tmp.js for the format");
        }
        const _0x4c9576 = privateKey.indexOf(_0x391d30);
        const _0x5af089 = proxyList[_0x4c9576];
        _0x19cd86.push(operation(_0x391d30.pk, _0x391d30.smartWalletAddress, _0x5af089));
      }
      await Promise.all(_0x19cd86);
      _0xf5abe0();
    } catch (_0x492d39) {
      a0_0x23b1d9.info("BOT STOPPED");
      a0_0x23b1d9.error(JSON.stringify(_0x492d39));
      _0xca11db(_0x492d39);
    }
  });
}
(async () => {
  try {
    a0_0x23b1d9.clear();
    a0_0x23b1d9.info('');
    a0_0x23b1d9.info("Application Started");
    console.log("Soniclabs Arcade Testnet BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x48bb28) {
    console.log("Error During executing bot", _0x48bb28);
    await startBot();
  }
})();
