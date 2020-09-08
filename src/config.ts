import { IOrbsPosContractsAddresses } from 'orbs-pos-data';

/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

type TSupportedNets = 'local' | 'ropsten' | 'mainnet';
// @ts-ignore
const ethereumNetwork: TSupportedNets = process.env.ETHEREUM_NETWORK;

export const IS_DEV = process.env.NODE_ENV !== 'production';
const SHOULD_OVERRIDE_ADDRESS = IS_DEV || ethereumNetwork === 'ropsten';

////////////// CONFIG VARIABLES ///////////////
interface IConfig {
  urlBase: string;
  contractsAddressesOverride: Partial<{
    stakingContract: string;
    erc20Contract: string;
    guardiansContract: string;
    orbsRewardsDistributionContract: string;
    delegationsContract: string;
    committeeContract: string;
  }>;
  ETHEREUM_PROVIDER_WS: string;
  earliestBlockForDelegationOverride: number;
  gaTrackerId: string;
  analyticsActive: boolean;
}

const config: IConfig = {
  urlBase: process.env.PUBLIC_BASE_PATH,
  contractsAddressesOverride: SHOULD_OVERRIDE_ADDRESS ? {} : null,
  ETHEREUM_PROVIDER_WS: 'wss://mainnet.infura.io/ws/v3/3fe9b03bd8374639809addf2164f7287',
  earliestBlockForDelegationOverride: null,
  gaTrackerId: 'UA-163134097-1',
  analyticsActive: !IS_DEV,
};

// Webpack will remove this section on production build //
if (process.env.NODE_ENV !== 'production') {
  if (ethereumNetwork === 'local') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const addresses = require('./local/addresses.json');
    // const OrbsGuardiansContractJSON = require('../ganache-env/build/contracts/OrbsGuardians.json');
    // const OrbsTokenContractJSON = require('../ganache-env/build/contracts/OrbsToken.json');
    // const StakingContractJSON = require('../ganache-env/build/contracts/StakingContract.json');
    // const VotingContractJSON = require('../ganache-env/build/contracts/OrbsVoting.json');
    // const RewardsDistributionContractJSON = require('../ganache-env/build/contracts/OrbsRewardsDistribution.json');

    config.ETHEREUM_PROVIDER_WS = 'ws://localhost:8545';

    config.contractsAddressesOverride.stakingContract = addresses.staking;
    config.contractsAddressesOverride.erc20Contract = addresses.erc20;
    config.contractsAddressesOverride.guardiansContract = addresses.guardians;
    // config.contractsAddressesOverride.votingContract = VotingContractJSON.networks['5777'].address;
    config.contractsAddressesOverride.orbsRewardsDistributionContract = addresses.rewards;
    config.contractsAddressesOverride.delegationsContract = addresses.delegations;
    config.contractsAddressesOverride.committeeContract = addresses.commitee;

    config.earliestBlockForDelegationOverride = 0; // Local env starts from 0.
  }
}

// TODO : ORL : Adjusts these addresses for v2.
if (ethereumNetwork === 'ropsten') {
  config.contractsAddressesOverride.stakingContract = '0x88287444f10709f9531D11e08DCd692deccd1d63';
  config.contractsAddressesOverride.erc20Contract = '0xeD0Aa9A4F9e5ae9092994f4B86F6AAa89944939b';
  config.contractsAddressesOverride.guardiansContract = '0x636315bcD912B1DbFe38E6b75f5B6AEE4Cd63B30';
  // config.contractsAddressesOverride.votingContract = '0xF90a738CA659Fe99E357cB7F47Aaa5cB9b5724a2';
  // TODO : ORL : Add Ropsten address
  config.contractsAddressesOverride.orbsRewardsDistributionContract = '';

  config.earliestBlockForDelegationOverride = 0; // Local env starts from 0.
}

export default config;
