import { privateKey } from './accounts/accounts.js';
import { proxyList } from './config/proxy_list.js';
import a0_0x31881c from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x47ed64 from './src/utils/logger.js';
async function operation(_0x5310a6, _0x14a08b, _0x3bc245) {
  const _0x4a209a = new a0_0x31881c(_0x5310a6, _0x14a08b, _0x3bc245);
  try {
    await _0x4a209a.connectWallet();
    await _0x4a209a.getBalance();
    await _0x4a209a.getPoint(true);
    await _0x4a209a.connectSonicDapps();
    await _0x4a209a.getUserInfo();
    await _0x4a209a.getUserInvite();
    await _0x4a209a.createSession();
    await _0x4a209a.permitContract();
    while (_0x4a209a.limit == false) {
      await _0x4a209a.playPlinko();
      await _0x4a209a.getPoint();
    }
    while (_0x4a209a.wheelLimit == false) {
      await _0x4a209a.playWheel();
      await _0x4a209a.getPoint();
    }
    while (_0x4a209a.mineLimit == false) {
      await _0x4a209a.playMine();
      await _0x4a209a.getPoint();
    }
    const _0x4963d1 = privateKey.find(_0x1e6bb8 => _0x1e6bb8.pk == _0x5310a6);
    const _0x5bf050 = privateKey.indexOf(_0x4963d1);
    await Helper.delay(43200000, _0x5310a6, "Account " + (_0x5bf050 + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(43200000), _0x4a209a);
    await operation(_0x5310a6, _0x14a08b, _0x3bc245);
  } catch (_0x54ffd5) {
    if (_0x54ffd5.message) {
      await Helper.delay(0x2710, _0x5310a6, "Error : " + _0x54ffd5.message + ", Retry again after 10 Second", _0x4a209a);
    } else {
      await Helper.delay(0x2710, _0x5310a6, "Error :" + JSON.stringify(_0x54ffd5) + ", Retry again after 10 Second", _0x4a209a);
    }
    await operation(_0x5310a6, _0x14a08b, _0x3bc245);
  }
}
async function startBot() {
  return new Promise(async (_0x78005b, _0x42b8bc) => {
    try {
      a0_0x47ed64.info("BOT STARTED");
      const _0x5b2fa1 = [];
      if (proxyList.length != privateKey.length && proxyList.length != 0x0) {
        throw Error("You Have " + privateKey.length + " Accounts But Provide " + proxyList.length);
      }
      for (const _0x177973 of privateKey) {
        if (!_0x177973.pk) {
          throw Error("Your accounts.js is malformed, please fix it first, see accounts_tmp.js for the format");
        }
        const _0x154402 = privateKey.indexOf(_0x177973);
        const _0x2d36a0 = proxyList[_0x154402];
        _0x5b2fa1.push(operation(_0x177973.pk, _0x177973.smartWalletAddress, _0x2d36a0));
      }
      await Promise.all(_0x5b2fa1);
      _0x78005b();
    } catch (_0x4b4164) {
      a0_0x47ed64.info("BOT STOPPED");
      a0_0x47ed64.error(JSON.stringify(_0x4b4164));
      _0x42b8bc(_0x4b4164);
    }
  });
}
(async () => {
  try {
    a0_0x47ed64.clear();
    a0_0x47ed64.info('');
    a0_0x47ed64.info("Application Started");
    console.log("Soniclabs Arcade Testnet BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x11fe99) {
    console.log("Error During executing bot", _0x11fe99);
    await startBot();
  }
})();
