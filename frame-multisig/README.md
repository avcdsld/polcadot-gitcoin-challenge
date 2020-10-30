## FRAME Multisig

### Proof that the UI component works
This UI component for multisig is very simple and simply initiates a multisig transfer. The co-signer will then need to send further transactions.

![](./proof_multisig_work/1_create_multisig_transfer.png)

![](./proof_multisig_work/2_event.png)


### Proof that the embedded Multisig pallet works

Create multisig wallet
![](./proof_multisig_work/1_create_multisig_wallet.png)

Deposit to the multisig wallet
![](./proof_multisig_work/2_multisig_wallet_balance.png)

Create multigis transfer
![](./proof_multisig_work/3_make_multisig_transfer.png)

Alice signs
![](./proof_multisig_work/4_alice_sign_submit.png)

Bob signs
![](./proof_multisig_work/5_bob_sign.png)
![](./proof_multisig_work/6_bob_sign_submit.png)

My account (`Avcdsld`) signs
![](./proof_multisig_work/7_avcdsld_sign.png)
![](./proof_multisig_work/8_avcdsld_sign_submit.png)

Multisig transfer is succeeded
![](./proof_multisig_work/9_multisig_transfer_completed.png)

Event
![](./proof_multisig_work/10_event.png)
