const { ApiPromise, WsProvider } = require('@polkadot/api');

const execute = async (targetBlockNumberOrHash = null) => {
  try{
    const provider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider });

    let blockHash;
    if (targetBlockNumberOrHash) {
      if (targetBlockNumberOrHash.startsWith('0x')) {
        blockHash = targetBlockNumberOrHash;
      } else {
        blockHash = await api.rpc.chain.getBlockHash(targetBlockNumberOrHash);
      }
    } else {
      blockHash = await api.rpc.chain.getBlockHash();
    }

    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    const blockInfo = signedBlock.toHuman();

    console.log('--- Block Info ---');
    console.log('block number    : ' + blockInfo.block.header.number);
    console.log('block hash      : ' + blockHash);
    console.log('parent hash     : ' + blockInfo.block.header.parentHash);
    console.log('state root      : ' + blockInfo.block.header.stateRoot);
    console.log('extrinsics root : ' + blockInfo.block.header.extrinsicsRoot);

    console.log('events          :');

    const allEvents = await api.query.system.events();

    signedBlock.block.extrinsics.forEach((extrinsic, index) => {
      const eventStrs = allEvents
                          .filter((event) => event.phase.isApplyExtrinsic && event.phase.asApplyExtrinsic.eq(index))
                          .map(event => `${event.event.section}.${event.event.method}`);
      const section = extrinsic.method.section;
      const method = extrinsic.method.method;
      console.log(`  ${section}.${method}:  ${eventStrs.join(', ') || 'no events'}`);
    });
  } catch(e) {
    console.log(e);
  }
}

console.log('USAGE: node getBlockInfo.js [<block number> | <block hash>]');
const targetBlockNumberOrHash = process.argv[2];
execute(targetBlockNumberOrHash)
  .then(() => process.exit(0))
  .catch(e => console.log);
