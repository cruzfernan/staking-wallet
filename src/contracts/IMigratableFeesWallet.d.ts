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

export interface IMigratableFeesWallet extends BaseContract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions): IMigratableFeesWallet;
  clone(): IMigratableFeesWallet;
  methods: {
    /**
     * receives a bucket start time and an amount
     */
    acceptBucketMigration(bucketStartTime: number | string, amount: number | string): NonPayableTransactionObject<void>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
