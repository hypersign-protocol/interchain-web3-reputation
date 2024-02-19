#!/bin/bash

set -e

source ./vars.sh

echo "Adding Liquidity to Osmosis Pool"

osmosisd tx bank send $SOURCE_OSMOSIS_ACC_NAME $(osmosisd keys show $ACC_NAME -a --home ~/.osmosisd/validator1) 50000000stake,9849998000uosmo --home ~/.osmosisd/validator1 --node tcp://localhost:36657 --fees 6250stake --gas 2500000 -y
sleep 5

osmosisd tx concentratedliquidity create-position 1 10 69000 10000uosmo,3stake 0 0 --from $ACC_NAME --home ~/.osmosisd/validator1 --fees 6250stake --gas 2500000 --node tcp://localhost:36657 -y
sleep 6

osmosisd q concentratedliquidity user-positions $(osmosisd keys show $ACC_NAME -a --home ~/.osmosisd/validator1) --node tcp://localhost:36657
