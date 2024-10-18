import { privateKey } from './accounts/accounts.js';
import { proxyList } from './config/proxy_list.js';
import a0_0x207f1a from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x1f7f87 from './src/utils/logger.js';
async function operation(_0xe2d3f3, _0x312c36, _0x433cfa) {
  const _0x34dac7 = new a0_0x207f1a(_0xe2d3f3, _0x312c36, _0x433cfa);
  try {
    await _0x34dac7.connectWallet();
    await _0x34dac7.getBalance();
    await _0x34dac7.getPoint(true);
    await _0x34dac7.connectSonicDapps();
    await _0x34dac7.getUserInfo();
    await _0x34dac7.getUserInvite();
    await _0x34dac7.createSession();
    await _0x34dac7.permitContract();
    while (_0x34dac7.limit == false) {
      await _0x34dac7.playPlinko();
      await _0x34dac7.getPoint();
    }
    while (_0x34dac7.wheelLimit == false) {
      await _0x34dac7.playWheel();
      await _0x34dac7.getPoint();
    }
    while (_0x34dac7.mineLimit == false) {
      await _0x34dac7.playMine();
      await _0x34dac7.getPoint();
    }
    const _0xc27df0 = privateKey.find(_0x58b073 => _0x58b073.pk == _0xe2d3f3);
    const _0x244ce2 = privateKey.indexOf(_0xc27df0);
    await Helper.delay(43200000, _0xe2d3f3, "Account " + (_0x244ce2 + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(43200000), _0x34dac7);
    await operation(_0xe2d3f3, _0x312c36, _0x433cfa);
  } catch (_0x4f8d44) {
    if (_0x4f8d44.message) {
      await Helper.delay(0x2710, _0xe2d3f3, "Error : " + _0x4f8d44.message + ", Retry again after 10 Second", _0x34dac7);
    } else {
      await Helper.delay(0x2710, _0xe2d3f3, "Error :" + JSON.stringify(_0x4f8d44) + ", Retry again after 10 Second", _0x34dac7);
    }
    await operation(_0xe2d3f3, _0x312c36, _0x433cfa);
  }
}
async function startBot() {
  return new Promise(async (_0xd28a6a, _0xe2ee3) => {
    try {
      a0_0x1f7f87.info("BOT STARTED");
      const _0x366c93 = [];
      if (proxyList.length != privateKey.length && proxyList.length != 0x0) {
        throw Error("You Have " + privateKey.length + " Accounts But Provide " + proxyList.length);
      }
      for (const _0x55692c of privateKey) {
        if (!_0x55692c.pk) {
          throw Error("Your accounts.js is malformed, please fix it first, see accounts_tmp.js for the format");
        }
        const _0x48cea0 = privateKey.indexOf(_0x55692c);
        const _0x2bf79a = proxyList[_0x48cea0];
        _0x366c93.push(operation(_0x55692c.pk, _0x55692c.smartWalletAddress, _0x2bf79a));
      }
      await Promise.all(_0x366c93);
      _0xd28a6a();
    } catch (_0x421e77) {
      a0_0x1f7f87.info("BOT STOPPED");
      a0_0x1f7f87.error(JSON.stringify(_0x421e77));
      _0xe2ee3(_0x421e77);
    }
  });
}
(async () => {
  try {
    a0_0x1f7f87.clear();
    a0_0x1f7f87.info('');
    a0_0x1f7f87.info("Application Started");
    console.log("Soniclabs Arcade Testnet BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x3c95e0) {
    console.log("Error During executing bot", _0x3c95e0);
    await startBot();
  }
})();
