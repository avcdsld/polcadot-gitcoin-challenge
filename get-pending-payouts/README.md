# Get Pending Payouts - REST API

## Preparing

### Install NPM Packages
- Install Node 12 or later
- Install yarn
- `yarn install`

### Run Kusama Node
- `docker run --rm -p 30333:30333 -p 9944:9944 -p 9933:9933 -it chevdor/polkadot:latest  polkadot --ws-external --chain=kusama`
or
- Use `wss://kusama-rpc.polkadot.io` (by Parity) or `wss://cc3-5.kusama.network` (by Web3 Faundation)

### Run Sidecar (REST service for Substrate)
- `yarn global add @substrate/api-sidecar`
- `SAS_SUBSTRATE_WS_URL=<Kusama Node WebSocket URL> substrate-api-sidecar`
  + e.g. `SAS_SUBSTRATE_WS_URL=wss://kusama-rpc.polkadot.io substrate-api-sidecar`

## Usage
- `node index <stash address> [<era window (default=5)>]`

### Example
```
$ node index H1goFxDh9EqcKBc94JwCGJUSod6aFd657aXe2P3c4JaSkZe 3
Era 1451: 0.035693772452 KSM
Era 1452: 0.042734586251 KSM
Total: 0.078428358703 KSM
```
