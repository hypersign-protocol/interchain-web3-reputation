#!/bin/bash

set -e

source ./vars.sh

# Create Hypersign account
echo "$MNEMONIC" | hid-noded keys add $ACC_NAME --recover

# Create Osmosis account
echo "$MNEMONIC" | osmosisd keys add $ACC_NAME --recover --home ~/.osmosisd/validator1

# Create Osmosis account
echo "$MNEMONIC" | starsd keys add $ACC_NAME --recover --keyring-backend test
