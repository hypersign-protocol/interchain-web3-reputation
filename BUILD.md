# Build Contracts

To build contracts, run the following command:

```
rm -rf artifacts && docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/optimizer:0.15.0
```