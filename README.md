#  Interchain Web3 Reputation

Interchain web3 reputation is an experimental project where we want to create web3 reputation of wallet address (s) across all Cosmos chains.

## Directories

- `airdrop` - Contracts and Frontend related to Airdrop DApp
- `activities` - It consists of example Activity contracts along with `activity` package
- `reputation-dashboard` - Contracts and Frontend related to Web3 reputation dashboard
- `osmosis` - Contracts that are meant to be deployed on the osmosis chain

## Getting started with the project


### Installation and Setup Hypersign Blockchain Node

1. Clone the `hid-node` repo and checkout the `donotmerge-1` branch

```
git clone https://github.com/hypersign-protocol/hid-node.git
cd hid-node
git checkout donotmerge-1
```

2. Install `hid-noded` binary

```
make install
```

3. Run the the following script for the initial setup

```
sh ./scripts/localnet-single-node/setup.sh
```

4. Copy the following `.toml` files which are present in the `configs/hypersign` directory of this project to your `$HOME/.hid-node/config` directory

```
cp ./configs/hypersign/app.toml $HOME/.hid-node/config
cp ./configs/hypersign/client.toml $HOME/.hid-node/config
cp ./configs/hypersign/config.toml $HOME/.hid-node/config
```

5. Start the node

```
hid-noded start
```


### Installation and Setup Osmosis Blockchain Node

1. Clone the `osmosis` repo and checkout the `donotmerge-1` branch

```
git clone https://github.com/hypersign-protocol/osmosis.git
cd osmosis
git checkout donotmerge-1
```

2. Install `osmosisd` binary

```
make install
```

3. Run the the following script for the initial setup

```
sh ./scripts/multinode-local-testnet.sh
```

4. Copy the following `.toml` files which are present in the `configs/osmosis` directory of this project to your `$HOME/.osmosisd/validator1` directory

```
cp ./configs/osmosis/app.toml $HOME/.osmosisd/validator1/config
cp ./configs/osmosis/client.toml $HOME/.osmosisd/validator1/config
cp ./configs/osmosis/config.toml $HOME/.osmosisd/validator1/config
cp ./configs/osmosis/genesis.toml $HOME/.osmosisd/validator1/config
```

5. Start the node

```
osmosisd start
```

6. Crete a Liquidity pool

```
osmosisd tx concentratedliquidity create-pool stake uosmo 10 0.0001 --from validator1 --home ~/.osmosisd/validator1 --fees 6250stake --gas 2500000 --node tcp://localhost:36657
```

### Installation and Setup Hermes IBC Relayer

1. Install hermes

```
wget https://github.com/informalsystems/hermes/releases/download/v1.8.0/hermes-v1.8.0-x86_64-apple-darwin.tar.gz 
tar -xvzf hermes-v1.8.0-x86_64-apple-darwin.tar.gz
sudo mv hermes /usr/local/bin/
```

2. Setup config file

```
mkdir $HOME/.hermes
cp ./configs/hermes/config.toml $HOME/.hermes
```

3. Setup relayer accounts

```
cd configs/hermes
hermes keys add --key-file ./wallet1.json --chain hidnode
hermes keys add --key-file ./wallet2.json --chain testing
```

4. Fund these acccounts

```
hid-noded tx bank send $(hid-noded keys show node1 -a --keyring-backend test) hid1j2e7r2ktl70e2jgy36g85prkwtr52rzdlasp04 1000000uhid --keyring-backend test --chain-id hidnode --yes
```

```
osmosisd tx bank send $(osmosisd keys show validator1 -a --keyring-backend test --home ~/.osmosisd/validator1) wasm1pgs6qw5dwaghrvkvu6fk42tfmft6vh79jdysfy 100000000stake  --keyring-backend test --chain-id testing --home ~/.osmosisd/validator1 --node tcp://localhost:36657 --fees 6250stake --gas 2500000 
```

5. Establish a connection between these two chains

```
hermes create connection --a-chain hidnode --b-chain testing
```

Once the connection is successfully established, we will proceed with upload the contracts

### Upload Smart Contracts

Record every contract's address as it may be needed at any stage.

**Hypersign Balance Activity**

1. Move inside the following folder

```
cd activities
```

2. Upload the contract:

```
hid-noded tx wasm store ./artifacts/hypersign_coin_holdings.wasm --from node1 --gas 519131000
```

3. Instantiate the contract:

```
hid-noded tx wasm instantiate 1 '{"name": "Minimum 100 $HID balance", "score": "100", "threshold_balance": "100000000", "description": "You get points if your Hypersign wallet address has more than 100 $HID"}' --label "Task_Contract_1" --no-admin --from node1
```

4. Keep a note of the contract address by running the following (as it is need while dealing with Activity Manager contract):

```
hid-noded q wasm list-contract-by-code 1
```

**Osmosis User Position Activity**

1. Upload the contract:

```
hid-noded tx wasm store ./artifacts/osmosis_lp_position.wasm --from node1 --gas 100000000
```

2. Instantiate the contract:

```
hid-noded tx wasm instantiate 2 '{"name": "Track Liquidity on Osmosis", "score": "1000", "description": "You get points if your osmosis address has provided liquidity to a pool"}' --label "Proxy_Contract_1" --no-admin --from node1 --gas 100000000
```

3. Keep a note of the contract address by running the following (as it is need while dealing with Activity Manager contract):

```
hid-noded q wasm list-contract-by-code 2
```

4. Move out of activities folder:

```
cd ..
```

**Activity Manager contract**

1. Move inside the following folder

```
cd reputation-dashboard
```

2. Upload the contract:

```
hid-noded tx wasm store ./artifacts/activity_manager_contract.wasm --from node1 --gas 519131000
```

3. Instantiate the contract:

```
hid-noded tx wasm instantiate 3 '{}' --label "Task_Manager_Contract_1" --no-admin --from node1
```

4. Keep a note of the contract address by running the following:

```
hid-noded q wasm list-contract-by-code 3
```

5. Register Hypersign Native Coin balance and Osmosis LP activity contracts with the Activity manager contracts:

```
hid-noded tx wasm execute <activity manager contract address> '{"register_activity": {"contract_address": "<hypersign balance activity contract address>"}}' --from node1 --gas 519131000
```

```
hid-noded tx wasm execute <activity manager contract address> '{"register_activity": {"contract_address": "<osmosis user position contract address>"}}' --from node1 --gas 519131000
```

**Reputation Engine contract**


1. Upload the contract:

```
hid-noded tx wasm store ./artifacts/reputation_engine_contract.wasm --from node1 --gas 519131000
```

2. Instantiate the contract:

```
hid-noded tx wasm instantiate 4 '{"activity_manager_contract_address": "<activity manager contract address>"}' --label "Engine_Contract_1" --no-admin --from node1
```

3. Keep a note of the contract address by running the following:

```
hid-noded q wasm list-contract-by-code 4
```

4. Move out of the directory:

```
cd ..
```

**Osmosis Proxy Contract**

This contract will interact through Wasm Bindings written on Osmosis chain to let us know if a user has provided any liquidity position or not

1. Move inside the following folder

```
cd osmosis
```

2. Upload the contract:

```
osmosisd tx wasm store ./artifacts/osmosis_proxy_contract.wasm --from validator1 --fees 6250stake --gas 2500000 --home ~/.osmosisd/validator1
```

3. Instantiate the contract:

```
osmosisd tx wasm instantiate 1 '{}' --label "Proxy_Contract_1" --no-admin --from validator1 --home ~/.osmosisd/validator1 --fees 6250stake --gas 2500000 --node tcp://localhost:36657
```

4. Keep a note of the contract address by running the following:

```
osmosisd q wasm list-contract-by-code 1 --node tcp://localhost:36657
```

5. Move out of the directory:

```
cd ..
```

### Create IBC Channel and Start Hermes

We need to create a channel which will connect both Osmosis LP Activity Contract and Osmosis Proxy Contract.

1. Run the following command to create a channel:

```
hermes create channel \
  --a-chain hidnode \
  --a-connection connection-0 \
  --a-port wasm.<osmosis lp activity contract address> \
  --b-port wasm.<osmosis proxy contract address> \
  --order ORDER_UNORDERED \
  --channel-version 'zk-1'
```

2. Start hermes

```
hermes start
```

### Run the UI

1. Move into the following directory

```
cd reputation-dashboard/frontend
```

2. Install dependencies

```
npm i
```

3. Create a `.env` file

```
cp .sample.env .env
```

Substitute the actual contract addresses for Activity Manager contract and Reputation Engine contract in `.env`

4. Set the channel-id in line 232 of `src/index.js` to `channel-0` (Usually this would be provided through UI only)

5. Run the UI

```
npm run dev
```

Before proceeding with the UI, refer the below section

### Helper scripts

Scripts present in the `scripts` directory will aid us in progressing with the demo:

1. Get a 12 word mnemonic from this website: `https://iancoleman.io/bip39/`

2. Populate `MNEMONIC` variable in `./scripts/vars.sh` with the mnemonic and set your desired account name in `ACC_NAME` variable

3. Run `create_user.sh`. You will now have two accounts which will be involved in the demo of both activities. Create an account in Keplr wallet with the same mnemonic as well

```
cd scripts
```

```
sh ./create_user.sh
```

4. Run `create_user_did.sh` to create a DID (Make sure to have `jq` installed: `sudo apt-get install jq`):

```
sh ./create_user_did.sh
```

4. Run `create_user_position.sh` to add liquidity to the pool on Osmosis

```
sh ./create_user_position.sh
```

5. Run the following script which try to clear IBC packages every 5 seconds:

```
sh ./ibc_hermes_packet_send.sh
```



