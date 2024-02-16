#!/bin/bash

set -e

CONTRACT_PORT="wasm.hid1d8m875429a9ap2w3yx4z9lrghzv67t5vpunvx9p38hxyzfmsqtmqaagwvl"
CHANNEL_ID="channel-14"
SOURCE_CHAIN="hidnode"

while true; do
    hermes clear packets --chain $SOURCE_CHAIN --port $CONTRACT_PORT --channel $CHANNEL_ID
    sleep 10
done