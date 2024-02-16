#!/bin/bash

set -e

source ./vars.sh


hid-noded tx bank send $SOURCE_HYPERSIGN_ACC_NAME $(hid-noded keys show $ACC_NAME -a) 10000000uhid -y
sleep 5

hid-noded ssi-tools generate-did --from $ACC_NAME --keyring-backend test --did-alias $ACC_NAME --did-namespace devnet
DID_ID=$(jq -r '.id' "$HOME/.hid-node/generated-ssi-docs/$ACC_NAME.json")

hid-noded tx ssi register-did --did-alias $ACC_NAME --from $ACC_NAME --keyring-backend test --fees 4000uhid -y
sleep 6

hid-noded q ssi did $DID_ID > /dev/null

echo "$DID_ID has been registered successfully"