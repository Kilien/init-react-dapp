/**
 * 合约配置相关的类型定义
 */

export interface ContractConfig {
  address: string;
  abi: any;
  isTestnet: boolean;
}

export interface ContractAddresses {
  testnet: {
    USDTContract: string;
  };
  mainnet: {
    USDTContract: string;
  };
}

export interface Contracts {
  USDTContract: ContractConfig;
}

export type NetworkType = 'testnet' | 'mainnet';
