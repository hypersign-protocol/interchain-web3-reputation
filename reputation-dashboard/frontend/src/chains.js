const osmosisTestnet = {
  chainId: "osmo-test-4",
  chainName: "osmosis",
  rpc: "https://rpc-test.osmosis.zone:443",
  rest: "https://lcd-test.osmosis.zone",
  stakeCurrency: {
    coinDenom: "OSMO",
    coinMinimalDenom: "uosmo",
    coinDecimals: 6,
    coinGeckoId: "osmosis",
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "osmo",
    bech32PrefixAccPub: "osmopub",
    bech32PrefixValAddr: "osmoosmovaloper",
    bech32PrefixValPub: "osmovaloperpub",
    bech32PrefixConsAddr: "osmovalcons",
    bech32PrefixConsPub: "osmovalconspub",
  },
  currencies: [
    {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
    },
  ],
  coinType: 118,
  gasPriceStep: {
    low: 0.01,
    average: 0.025,
    high: 0.04,
  },
  features: ["ibc-transfer", "ibc-go", "cosmwasm"],
  txExplorer: {
    name: "Mintscan",
    txUrl: "https://testnet.mintscan.io/osmosis-testnet/txs/{txHash}",
  },
};

const osmosisLocalnet = {
  chainId: "testing",
  chainName: "osmosis-localnet",
  rpc: "http://localhost:26657",
  rest: "http://localhost:1317",
  stakeCurrency: {
    coinDenom: "OSMO",
    coinMinimalDenom: "uosmo",
    coinDecimals: 6,
    coinGeckoId: "osmosis",
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "osmo",
    bech32PrefixAccPub: "osmopub",
    bech32PrefixValAddr: "osmoosmovaloper",
    bech32PrefixValPub: "osmovaloperpub",
    bech32PrefixConsAddr: "osmovalcons",
    bech32PrefixConsPub: "osmovalconspub",
  },
  currencies: [
    {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
    },
  ],
  coinType: 118,
  gasPriceStep: {
    low: 0.01,
    average: 0.025,
    high: 0.04,
  },
  features: ["ibc-transfer", "ibc-go", "cosmwasm"],
  txExplorer: {
    name: "Local",
    txUrl: "http://localhost:26657/tx?hash={txHash}",
  },
};

const hypersignLocalnet = {
  chainId: "hidnode",
  chainName: "hypersign-localnet",
  rpc: "http://localhost:26657",
  rest: "http://localhost:1317",
  stakeCurrency: {
    coinDenom: "HID",
    coinMinimalDenom: "uhid",
    coinDecimals: 6,
    coinGeckoId: "hypersign-identity-token",
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "hid",
    bech32PrefixAccPub: "hidpub",
    bech32PrefixValAddr: "hidvaloper",
    bech32PrefixValPub: "hidvaloperpub",
    bech32PrefixConsAddr: "hidvalcons",
    bech32PrefixConsPub: "hidvalconspub",
  },
  currencies: [
    {
      coinDenom: "HID",
      coinMinimalDenom: "uhid",
      coinDecimals: 6,
      coinGeckoId: "hypersign-identity-token",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "HID",
      coinMinimalDenom: "uhid",
      coinDecimals: 6,
      coinGeckoId: "hypersign-identity-token",
    },
  ],
  coinType: 118,
  gasPriceStep: {
    low: 0.01,
    average: 0.025,
    high: 0.04,
  },
  features: ["ibc-transfer", "ibc-go", "cosmwasm"],
  txExplorer: {
    name: "Local",
    txUrl: "http://localhost:26657/tx?hash={txHash}",
  },
};

export const supportedChains = {
  osmosisTestnet,
  osmosisLocalnet,
  hypersignLocalnet,
};
