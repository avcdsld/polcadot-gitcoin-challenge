import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Grid, Label, Icon } from 'semantic-ui-react';
import { TxButton } from './substrate-lib/components';

import { useSubstrate } from './substrate-lib';
import TestTokenContract, { defaultGasLimit } from "./TestTokenContract";

function Main (props) {
  const [status, setStatus] = useState(null);
  const [balance, setBalance] = useState(0);
  const [formState, setFormState] = useState({ addressTo: null, amount: 0 });
  const { accountPair } = props;
  const testTokenContract = TestTokenContract(api);

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }));

  const { addressTo, amount } = formState;

  const transfer = () => {
    console.log(11111)
    console.log(11111)
    console.log(11111)
    console.log(11111)
    console.log(11111, 0, defaultGasLimit, addressTo, amount)
    testTokenContract.tx.transfer(0, defaultGasLimit, addressTo, amount).signAndSend(accountPair, (result) => {
      updateBalance();
    });
  }

  const updateBalance = () => {
    testTokenContract.query.balanceOf(accountPair.address, 0, defaultGasLimit, accountPair.address).then((balance) => {
      setBalance(balance.output.toNumber());
    })
  }

  useEffect(() => {
    let unsubscribe;
    testTokenContract.query.totalSupply(keyring.getPairs()[0].address, 0, defaultGasLimit).then((total) => {
      setTotalSupply(total.output.toNumber());
      updateBalance();
    }).then(unsub => {
      unsubscribe = unsub;
    }).catch(console.error);
    return () => unsubscribe && unsubscribe();
  }, [accountPair]);

  return (
    <Grid.Column width={8}>
      <h1>Transfer TestToken</h1>
      <Form>
        <Form.Field>
          <Label basic color='teal'>
            <Icon name='hand point right' />
            1 Unit = 1000000000000
          </Label>
        </Form.Field>
        <Form.Field>Transfer more than the existential amount for account with 0 balance</Form.Field>
        <Form.Field>
          <Input
            fluid
            label='To'
            type='text'
            placeholder='address'
            state='addressTo'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label='Amount'
            type='number'
            state='amount'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          {/* <TxButton
            accountPair={accountPair}
            label='Submit'
            type='SIGNED-TX'
            setStatus={setStatus}
            attrs={{
              palletRpc: 'balances',
              callable: 'transfer',
              inputParams: [addressTo, amount],
              paramFields: [true, true]
            }}
          /> */}
          <Button onClick={transfer}>Transfer</Button>
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function TestTokenTransfer(props) {
    const { api } = useSubstrate();
    const { accountPair } = props;
    return (api.registry && accountPair ? <Main {...props} /> : null);
}
