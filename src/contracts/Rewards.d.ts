/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from 'bn.js';
import { ContractOptions } from 'web3-eth-contract';
import { EventLog } from 'web3-core';
import { EventEmitter } from 'events';
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from './types';

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type BootstrapAddedToPool = ContractEventLog<{
  added: string;
  total: string;
  0: string;
  1: string;
}>;
export type BootstrapRewardsAssigned = ContractEventLog<{
  generalGuardianAmount: string;
  certifiedGuardianAmount: string;
  0: string;
  1: string;
}>;
export type BootstrapRewardsWithdrawn = ContractEventLog<{
  guardian: string;
  amount: string;
  0: string;
  1: string;
}>;
export type ContractRegistryAddressUpdated = ContractEventLog<{
  addr: string;
  0: string;
}>;
export type FeesAddedToBucket = ContractEventLog<{
  bucketId: string;
  added: string;
  total: string;
  isCertified: boolean;
  0: string;
  1: string;
  2: string;
  3: boolean;
}>;
export type FeesAssigned = ContractEventLog<{
  generalGuardianAmount: string;
  certifiedGuardianAmount: string;
  0: string;
  1: string;
}>;
export type FeesWithdrawn = ContractEventLog<{
  guardian: string;
  amount: string;
  0: string;
  1: string;
}>;
export type FeesWithdrawnFromBucket = ContractEventLog<{
  bucketId: string;
  withdrawn: string;
  total: string;
  isCertified: boolean;
  0: string;
  1: string;
  2: string;
  3: boolean;
}>;
export type FunctionalOwnershipTransferred = ContractEventLog<{
  previousFunctionalOwner: string;
  newFunctionalOwner: string;
  0: string;
  1: string;
}>;
export type Locked = ContractEventLog<{}>;
export type MaxDelegatorsStakingRewardsChanged = ContractEventLog<{
  maxDelegatorsStakingRewardsPercentMille: string;
  0: string;
}>;
export type MigrationOwnershipTransferred = ContractEventLog<{
  previousMigrationOwner: string;
  newMigrationOwner: string;
  0: string;
  1: string;
}>;
export type StakingRewardsAddedToPool = ContractEventLog<{
  added: string;
  total: string;
  0: string;
  1: string;
}>;
export type StakingRewardsAssigned = ContractEventLog<{
  assignees: string[];
  amounts: string[];
  0: string[];
  1: string[];
}>;
export type StakingRewardsDistributed = ContractEventLog<{
  distributer: string;
  fromBlock: string;
  toBlock: string;
  split: string;
  txIndex: string;
  to: string[];
  amounts: string[];
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string[];
  6: string[];
}>;
export type Unlocked = ContractEventLog<{}>;

export interface Rewards extends BaseContract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions): Rewards;
  clone(): Rewards;
  methods: {
    /**
     * Allows the pendingFunctionalOwner address to finalize the transfer.
     */
    claimFunctionalOwnership(): NonPayableTransactionObject<void>;

    /**
     * Allows the pendingMigrationOwner address to finalize the transfer.
     */
    claimMigrationOwnership(): NonPayableTransactionObject<void>;

    /**
     * Returns the address of the current functionalOwner.
     */
    functionalOwner(): NonPayableTransactionObject<string>;

    getBootstrapRewardsWallet(): NonPayableTransactionObject<string>;

    getCertificationContract(): NonPayableTransactionObject<string>;

    getCommitteeContract(): NonPayableTransactionObject<string>;

    getDelegationsContract(): NonPayableTransactionObject<string>;

    getElectionsContract(): NonPayableTransactionObject<string>;

    getGuardiansRegistrationContract(): NonPayableTransactionObject<string>;

    getProtocolContract(): NonPayableTransactionObject<string>;

    getRewardsContract(): NonPayableTransactionObject<string>;

    getStakingContract(): NonPayableTransactionObject<string>;

    getStakingRewardsWallet(): NonPayableTransactionObject<string>;

    getSubscriptionsContract(): NonPayableTransactionObject<string>;

    /**
     * Returns true if the caller is the current functionalOwner.
     */
    isFunctionalOwner(): NonPayableTransactionObject<boolean>;

    /**
     * Returns true if the caller is the current migrationOwner.
     */
    isMigrationOwner(): NonPayableTransactionObject<boolean>;

    lock(): NonPayableTransactionObject<void>;

    locked(): NonPayableTransactionObject<boolean>;

    /**
     * Returns the address of the current migrationOwner.
     */
    migrationOwner(): NonPayableTransactionObject<string>;

    /**
     * Leaves the contract without functionalOwner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current functionalOwner.     * NOTE: Renouncing functionalOwnership will leave the contract without an functionalOwner, thereby removing any functionality that is only available to the functionalOwner.
     */
    renounceFunctionalOwnership(): NonPayableTransactionObject<void>;

    /**
     * Leaves the contract without migrationOwner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current migrationOwner.     * NOTE: Renouncing migrationOwnership will leave the contract without an migrationOwner, thereby removing any functionality that is only available to the migrationOwner.
     */
    renounceMigrationOwnership(): NonPayableTransactionObject<void>;

    setContractRegistry(_contractRegistry: string): NonPayableTransactionObject<void>;

    /**
     * Allows the current functionalOwner to set the pendingOwner address.
     * @param newFunctionalOwner The address to transfer functionalOwnership to.
     */
    transferFunctionalOwnership(newFunctionalOwner: string): NonPayableTransactionObject<void>;

    /**
     * Allows the current migrationOwner to set the pendingOwner address.
     * @param newMigrationOwner The address to transfer migrationOwnership to.
     */
    transferMigrationOwnership(newMigrationOwner: string): NonPayableTransactionObject<void>;

    unlock(): NonPayableTransactionObject<void>;

    setGeneralCommitteeAnnualBootstrap(annual_amount: number | string): NonPayableTransactionObject<void>;

    setCertificationCommitteeAnnualBootstrap(annual_amount: number | string): NonPayableTransactionObject<void>;

    setMaxDelegatorsStakingRewardsPercentMille(
      maxDelegatorsStakingRewardsPercentMille: number | string,
    ): NonPayableTransactionObject<void>;

    topUpBootstrapPool(amount: number | string): NonPayableTransactionObject<void>;

    getBootstrapBalance(addr: string): NonPayableTransactionObject<string>;

    assignRewards(): NonPayableTransactionObject<void>;

    assignRewardsToCommittee(
      committee: string[],
      committeeWeights: (number | string)[],
      certification: boolean[],
    ): NonPayableTransactionObject<void>;

    withdrawBootstrapFunds(): NonPayableTransactionObject<void>;

    setAnnualStakingRewardsRate(
      annual_rate_in_percent_mille: number | string,
      annual_cap: number | string,
    ): NonPayableTransactionObject<void>;

    topUpStakingRewardsPool(amount: number | string): NonPayableTransactionObject<void>;

    getStakingRewardBalance(addr: string): NonPayableTransactionObject<string>;

    getLastRewardAssignmentTime(): NonPayableTransactionObject<string>;

    distributeOrbsTokenStakingRewards(
      totalAmount: number | string,
      fromBlock: number | string,
      toBlock: number | string,
      split: number | string,
      txIndex: number | string,
      to: string[],
      amounts: (number | string)[],
    ): NonPayableTransactionObject<void>;

    getFeeBalance(addr: string): NonPayableTransactionObject<string>;

    fillGeneralFeeBuckets(
      amount: number | string,
      monthlyRate: number | string,
      fromTimestamp: number | string,
    ): NonPayableTransactionObject<void>;

    fillCertificationFeeBuckets(
      amount: number | string,
      monthlyRate: number | string,
      fromTimestamp: number | string,
    ): NonPayableTransactionObject<void>;

    withdrawFeeFunds(): NonPayableTransactionObject<void>;

    getTotalBalances(): NonPayableTransactionObject<{
      feesTotalBalance: string;
      stakingRewardsTotalBalance: string;
      bootstrapRewardsTotalBalance: string;
      0: string;
      1: string;
      2: string;
    }>;
  };
  events: {
    BootstrapAddedToPool(cb?: Callback<BootstrapAddedToPool>): EventEmitter;
    BootstrapAddedToPool(options?: EventOptions, cb?: Callback<BootstrapAddedToPool>): EventEmitter;

    BootstrapRewardsAssigned(cb?: Callback<BootstrapRewardsAssigned>): EventEmitter;
    BootstrapRewardsAssigned(options?: EventOptions, cb?: Callback<BootstrapRewardsAssigned>): EventEmitter;

    BootstrapRewardsWithdrawn(cb?: Callback<BootstrapRewardsWithdrawn>): EventEmitter;
    BootstrapRewardsWithdrawn(options?: EventOptions, cb?: Callback<BootstrapRewardsWithdrawn>): EventEmitter;

    ContractRegistryAddressUpdated(cb?: Callback<ContractRegistryAddressUpdated>): EventEmitter;
    ContractRegistryAddressUpdated(options?: EventOptions, cb?: Callback<ContractRegistryAddressUpdated>): EventEmitter;

    FeesAddedToBucket(cb?: Callback<FeesAddedToBucket>): EventEmitter;
    FeesAddedToBucket(options?: EventOptions, cb?: Callback<FeesAddedToBucket>): EventEmitter;

    FeesAssigned(cb?: Callback<FeesAssigned>): EventEmitter;
    FeesAssigned(options?: EventOptions, cb?: Callback<FeesAssigned>): EventEmitter;

    FeesWithdrawn(cb?: Callback<FeesWithdrawn>): EventEmitter;
    FeesWithdrawn(options?: EventOptions, cb?: Callback<FeesWithdrawn>): EventEmitter;

    FeesWithdrawnFromBucket(cb?: Callback<FeesWithdrawnFromBucket>): EventEmitter;
    FeesWithdrawnFromBucket(options?: EventOptions, cb?: Callback<FeesWithdrawnFromBucket>): EventEmitter;

    FunctionalOwnershipTransferred(cb?: Callback<FunctionalOwnershipTransferred>): EventEmitter;
    FunctionalOwnershipTransferred(options?: EventOptions, cb?: Callback<FunctionalOwnershipTransferred>): EventEmitter;

    Locked(cb?: Callback<Locked>): EventEmitter;
    Locked(options?: EventOptions, cb?: Callback<Locked>): EventEmitter;

    MaxDelegatorsStakingRewardsChanged(cb?: Callback<MaxDelegatorsStakingRewardsChanged>): EventEmitter;
    MaxDelegatorsStakingRewardsChanged(
      options?: EventOptions,
      cb?: Callback<MaxDelegatorsStakingRewardsChanged>,
    ): EventEmitter;

    MigrationOwnershipTransferred(cb?: Callback<MigrationOwnershipTransferred>): EventEmitter;
    MigrationOwnershipTransferred(options?: EventOptions, cb?: Callback<MigrationOwnershipTransferred>): EventEmitter;

    StakingRewardsAddedToPool(cb?: Callback<StakingRewardsAddedToPool>): EventEmitter;
    StakingRewardsAddedToPool(options?: EventOptions, cb?: Callback<StakingRewardsAddedToPool>): EventEmitter;

    StakingRewardsAssigned(cb?: Callback<StakingRewardsAssigned>): EventEmitter;
    StakingRewardsAssigned(options?: EventOptions, cb?: Callback<StakingRewardsAssigned>): EventEmitter;

    StakingRewardsDistributed(cb?: Callback<StakingRewardsDistributed>): EventEmitter;
    StakingRewardsDistributed(options?: EventOptions, cb?: Callback<StakingRewardsDistributed>): EventEmitter;

    Unlocked(cb?: Callback<Unlocked>): EventEmitter;
    Unlocked(options?: EventOptions, cb?: Callback<Unlocked>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: 'BootstrapAddedToPool', cb: Callback<BootstrapAddedToPool>): void;
  once(event: 'BootstrapAddedToPool', options: EventOptions, cb: Callback<BootstrapAddedToPool>): void;

  once(event: 'BootstrapRewardsAssigned', cb: Callback<BootstrapRewardsAssigned>): void;
  once(event: 'BootstrapRewardsAssigned', options: EventOptions, cb: Callback<BootstrapRewardsAssigned>): void;

  once(event: 'BootstrapRewardsWithdrawn', cb: Callback<BootstrapRewardsWithdrawn>): void;
  once(event: 'BootstrapRewardsWithdrawn', options: EventOptions, cb: Callback<BootstrapRewardsWithdrawn>): void;

  once(event: 'ContractRegistryAddressUpdated', cb: Callback<ContractRegistryAddressUpdated>): void;
  once(
    event: 'ContractRegistryAddressUpdated',
    options: EventOptions,
    cb: Callback<ContractRegistryAddressUpdated>,
  ): void;

  once(event: 'FeesAddedToBucket', cb: Callback<FeesAddedToBucket>): void;
  once(event: 'FeesAddedToBucket', options: EventOptions, cb: Callback<FeesAddedToBucket>): void;

  once(event: 'FeesAssigned', cb: Callback<FeesAssigned>): void;
  once(event: 'FeesAssigned', options: EventOptions, cb: Callback<FeesAssigned>): void;

  once(event: 'FeesWithdrawn', cb: Callback<FeesWithdrawn>): void;
  once(event: 'FeesWithdrawn', options: EventOptions, cb: Callback<FeesWithdrawn>): void;

  once(event: 'FeesWithdrawnFromBucket', cb: Callback<FeesWithdrawnFromBucket>): void;
  once(event: 'FeesWithdrawnFromBucket', options: EventOptions, cb: Callback<FeesWithdrawnFromBucket>): void;

  once(event: 'FunctionalOwnershipTransferred', cb: Callback<FunctionalOwnershipTransferred>): void;
  once(
    event: 'FunctionalOwnershipTransferred',
    options: EventOptions,
    cb: Callback<FunctionalOwnershipTransferred>,
  ): void;

  once(event: 'Locked', cb: Callback<Locked>): void;
  once(event: 'Locked', options: EventOptions, cb: Callback<Locked>): void;

  once(event: 'MaxDelegatorsStakingRewardsChanged', cb: Callback<MaxDelegatorsStakingRewardsChanged>): void;
  once(
    event: 'MaxDelegatorsStakingRewardsChanged',
    options: EventOptions,
    cb: Callback<MaxDelegatorsStakingRewardsChanged>,
  ): void;

  once(event: 'MigrationOwnershipTransferred', cb: Callback<MigrationOwnershipTransferred>): void;
  once(
    event: 'MigrationOwnershipTransferred',
    options: EventOptions,
    cb: Callback<MigrationOwnershipTransferred>,
  ): void;

  once(event: 'StakingRewardsAddedToPool', cb: Callback<StakingRewardsAddedToPool>): void;
  once(event: 'StakingRewardsAddedToPool', options: EventOptions, cb: Callback<StakingRewardsAddedToPool>): void;

  once(event: 'StakingRewardsAssigned', cb: Callback<StakingRewardsAssigned>): void;
  once(event: 'StakingRewardsAssigned', options: EventOptions, cb: Callback<StakingRewardsAssigned>): void;

  once(event: 'StakingRewardsDistributed', cb: Callback<StakingRewardsDistributed>): void;
  once(event: 'StakingRewardsDistributed', options: EventOptions, cb: Callback<StakingRewardsDistributed>): void;

  once(event: 'Unlocked', cb: Callback<Unlocked>): void;
  once(event: 'Unlocked', options: EventOptions, cb: Callback<Unlocked>): void;
}
