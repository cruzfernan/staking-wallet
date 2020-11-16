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

export type ContractAddressUpdated = ContractEventLog<{
  contractName: string;
  addr: string;
  0: string;
  1: string;
}>;
export type FunctionalOwnershipTransferred = ContractEventLog<{
  previousFunctionalOwner: string;
  newFunctionalOwner: string;
  0: string;
  1: string;
}>;
export type MigrationOwnershipTransferred = ContractEventLog<{
  previousMigrationOwner: string;
  newMigrationOwner: string;
  0: string;
  1: string;
}>;

export interface ContractRegistry extends BaseContract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions): ContractRegistry;
  clone(): ContractRegistry;
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

    /**
     * Returns true if the caller is the current functionalOwner.
     */
    isFunctionalOwner(): NonPayableTransactionObject<boolean>;

    /**
     * Returns true if the caller is the current migrationOwner.
     */
    isMigrationOwner(): NonPayableTransactionObject<boolean>;

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

    set(contractName: string, addr: string): NonPayableTransactionObject<void>;

    get(contractName: string): NonPayableTransactionObject<string>;
  };
  events: {
    ContractAddressUpdated(cb?: Callback<ContractAddressUpdated>): EventEmitter;
    ContractAddressUpdated(options?: EventOptions, cb?: Callback<ContractAddressUpdated>): EventEmitter;

    FunctionalOwnershipTransferred(cb?: Callback<FunctionalOwnershipTransferred>): EventEmitter;
    FunctionalOwnershipTransferred(options?: EventOptions, cb?: Callback<FunctionalOwnershipTransferred>): EventEmitter;

    MigrationOwnershipTransferred(cb?: Callback<MigrationOwnershipTransferred>): EventEmitter;
    MigrationOwnershipTransferred(options?: EventOptions, cb?: Callback<MigrationOwnershipTransferred>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: 'ContractAddressUpdated', cb: Callback<ContractAddressUpdated>): void;
  once(event: 'ContractAddressUpdated', options: EventOptions, cb: Callback<ContractAddressUpdated>): void;

  once(event: 'FunctionalOwnershipTransferred', cb: Callback<FunctionalOwnershipTransferred>): void;
  once(
    event: 'FunctionalOwnershipTransferred',
    options: EventOptions,
    cb: Callback<FunctionalOwnershipTransferred>,
  ): void;

  once(event: 'MigrationOwnershipTransferred', cb: Callback<MigrationOwnershipTransferred>): void;
  once(
    event: 'MigrationOwnershipTransferred',
    options: EventOptions,
    cb: Callback<MigrationOwnershipTransferred>,
  ): void;
}