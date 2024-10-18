import { privateKey } from './accounts/accounts.js';
import { proxyList } from './config/proxy_list.js';
import a0_0x2ebada from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x394c33 from './src/utils/logger.js';
async function operation(_0x2587cc, _0x131f6a, _0x3d7d22) {
  const _0x26d9c1 = new a0_0x2ebada(_0x2587cc, _0x131f6a, _0x3d7d22);
  try {
    await _0x26d9c1.connectWallet();
    await _0x26d9c1.getBalance();
    await _0x26d9c1.connectSonicDapps();
    await _0x26d9c1.getUserInfo();
    await _0x26d9c1.getUserInvite();
    await _0x26d9c1.createSession();
    await _0x26d9c1.permitContract();
    while (_0x26d9c1.limit == false) {
      await _0x26d9c1.playPlinko();
    }
    while (_0x26d9c1.wheelLimit == false) {
      await _0x26d9c1.playWheel();
    }
    while (_0x26d9c1.mineLimit == false) {
      await _0x26d9c1.playMine();
    }
    const _0x377e61 = privateKey.find(_0x5f3409 => _0x5f3409.pk == _0x2587cc);
    const _0x1ee52c = privateKey.indexOf(_0x377e61);
    await Helper.delay(43200000, _0x2587cc, "Account " + (_0x1ee52c + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(43200000), _0x26d9c1);
    await operation(_0x2587cc, _0x131f6a, _0x3d7d22);
  } catch (_0x439eb8) {
    if (_0x439eb8.message) {
      await Helper.delay(0x2710, _0x2587cc, "Error : " + _0x439eb8.message + ", Retry again after 10 Second", _0x26d9c1);
    } else {
      await Helper.delay(0x2710, _0x2587cc, "Error :" + JSON.stringify(_0x439eb8) + ", Retry again after 10 Second", _0x26d9c1);
    }
    await operation(_0x2587cc, _0x131f6a, _0x3d7d22);
  }
}
async function startBot() {
  return new Promise(async (_0xc05f64, _0x5dea67) => {
    try {
      a0_0x394c33.info("BOT STARTED");
      const _0x201e22 = [];
      if (proxyList.length != privateKey.length && proxyList.length != 0x0) {
        throw Error("You Have " + privateKey.length + " Accounts But Provide " + proxyList.length);
      }
      for (const _0x37c800 of privateKey) {
        if (!_0x37c800.pk) {
          throw Error("Your accounts.js is malformed, please fix it first, see accounts_tmp.js for the format");
        }
        const _0x84ef34 = privateKey.indexOf(_0x37c800);
        const _0x32f4af = proxyList[_0x84ef34];
        _0x201e22.push(operation(_0x37c800.pk, _0x37c800.smartWalletAddress, _0x32f4af));
      }
      await Promise.all(_0x201e22);
      _0xc05f64();
    } catch (_0xfd46e4) {
      a0_0x394c33.info("BOT STOPPED");
      a0_0x394c33.error(JSON.stringify(_0xfd46e4));
      _0x5dea67(_0xfd46e4);
    }
  });
}
(async () => {
  try {
    a0_0x394c33.clear();
    a0_0x394c33.info('');
    a0_0x394c33.info("Application Started");
    console.log("Soniclabs Arcade Testnet BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x27c854) {
    console.log("Error During executing bot", _0x27c854);
    await startBot();
  }
})();
