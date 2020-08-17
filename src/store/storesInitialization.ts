import { configure } from 'mobx';
import { IStores } from './stores';
import { IOrbsPOSDataService, IStakingService, IOrbsTokenService, IOrbsRewardsService } from 'orbs-pos-data';

// This import ensures mobx batching
import 'mobx-react-lite/batchingForReactDom';

import { CryptoWalletConnectionStore } from './CryptoWalletConnectionStore';
import { ICryptoWalletConnectionService } from '../services/cryptoWalletConnectionService/ICryptoWalletConnectionService';
import { OrbsAccountStore } from './OrbsAccountStore';
import { IAnalyticsService } from '../services/analytics/IAnalyticsService';
import { OrbsNodeStore } from './OrbsNodeStore';
import { IOrbsNodeService } from '../services/v2/orbsNodeService/IOrbsNodeService';
import { IDelegationsService } from '../services/v2/delegationsService/IDelegationsService';

/**
 * Configures the mobx library. Should get called at App's initialization.
 */
export function configureMobx() {
  configure({
    enforceActions: 'observed',
  });
}

/**
 * Builds and initializes all of the stores
 */
export function getStores(
  orbsPOSDataService: IOrbsPOSDataService,
  stakingService: IStakingService,
  orbsTokenService: IOrbsTokenService,
  cryptoWalletConnectionService: ICryptoWalletConnectionService,
  orbsRewardsService: IOrbsRewardsService,
  analyticsService: IAnalyticsService,
  orbsNodeService: IOrbsNodeService,
  delegationsService: IDelegationsService,
): IStores {
  // Create stores instances + Hydrate the stores
  const orbsNodeStore = new OrbsNodeStore(orbsNodeService);
  const cryptoWalletIntegrationStore = new CryptoWalletConnectionStore(cryptoWalletConnectionService, analyticsService);
  const orbsAccountStore = new OrbsAccountStore(
    cryptoWalletIntegrationStore,
    orbsNodeStore,
    orbsPOSDataService,
    stakingService,
    orbsTokenService,
    orbsRewardsService,
    analyticsService,
    delegationsService,
  );

  const stores: IStores = {
    cryptoWalletIntegrationStore,
    orbsAccountStore,
    orbsNodeStore,
  };

  return stores;
}
