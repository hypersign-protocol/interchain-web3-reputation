#!/bin/bash

set -e

CONTRACT_PORT="wasm.hid1uccyxxcdy4tq3h2jrdjsztpp8a3h8rry8cfjes7w64l0y53jfteqpp9dmm"
CHANNEL_ID="channel-43"
SOURCE_CHAIN="hidnode"

while true; do
    hermes clear packets --chain $SOURCE_CHAIN --port $CONTRACT_PORT --channel $CHANNEL_ID
    sleep 5
done