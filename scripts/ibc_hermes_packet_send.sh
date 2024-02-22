#!/bin/bash

set -e

CONTRACT_PORT="wasm.hid17de08x8pe43kmzdea08u3q7dv5t3pfpujnnkz2vw7n5hldnwt5sshhqx9f"
CHANNEL_ID="channel-17"
SOURCE_CHAIN="hidnode"

while true; do
    hermes clear packets --chain $SOURCE_CHAIN --port $CONTRACT_PORT --channel $CHANNEL_ID
    sleep 5
done