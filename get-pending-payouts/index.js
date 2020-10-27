const request = require('request');

const baseUrl = 'http://127.0.0.1:8080';
const ksmUnit = Math.pow(10, 12);
const defaultDepth = 5;

const queryStakingPayouts = async (accountId, depth) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${baseUrl}/accounts/${accountId}/staking-payouts?depth=${depth}`;
      request(url, { json: true }, (err, res, body) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        return resolve(body);
      });
    } catch(e) {
      return reject(e);
    }
  });
}

const calcTotalPayouts = (stakingPayoutsResult) => {
  if (!stakingPayoutsResult || !stakingPayoutsResult.erasPayouts) {
    return 0;
  }

  let total = 0;
  for (const { payouts, era } of stakingPayoutsResult.erasPayouts) {
    for (const { nominatorStakingPayout } of payouts) {
      const value = parseInt(nominatorStakingPayout);
      console.log(`Era ${era}: ${value / ksmUnit} KSM`);
      total += value;
    }
  }

  return total / ksmUnit;
}

const getPendingPayputs = async (accountId, depth) => {
  const res = await queryStakingPayouts(accountId, depth);
  const total = calcTotalPayouts(res);
  console.log(`Total: ${total} KSM`);
}

(async () => {
  const accountId = process.argv[2];
  const depth = process.argv[3] || defaultDepth;
  await getPendingPayputs(accountId, depth);
})()
