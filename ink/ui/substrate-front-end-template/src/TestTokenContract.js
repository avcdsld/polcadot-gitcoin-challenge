import metadata from './TestTokenMetadata.json';
import { Abi, ContractPromise } from '@polkadot/api-contract';

export const defaultGasLimit = 300000n * 1000000n;
const contractAddress = '5FZcVYdtXpsrzgPaFykarXPtKLA7DihUvcfNtHnEuGDQGRrC';

export default function TestTokenContract(api) {
    const abi = new Abi(metadata);
    return new ContractPromise(api, abi, contractAddress);
}

export function displayTestToken(balance) {
    return balance.toString() + ' TEST';
}