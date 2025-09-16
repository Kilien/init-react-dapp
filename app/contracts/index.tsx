import Erc20TokenAbi from './abi/Erc20Token.json';
import type { ContractAddresses, Contracts, NetworkType } from './types';

// 检查是否是测试环境
const isTestnet = import.meta.env.VITE_IS_TESTNET === 'true';

// 获取当前网络类型
const currentNetwork: NetworkType = isTestnet ? 'testnet' : 'mainnet';

// 合约地址配置
const CONTRACT_ADDRESSES: ContractAddresses = {
  // 测试网地址
  testnet: {
    USDTContract: '0x0000000000000000000000000000000000000000',
  },
  // 主网地址
  mainnet: {
    USDTContract: '0x0000000000000000000000000000000000000000',
  },
};

const contracts: Contracts = {
  USDTContract: {
    address: isTestnet
      ? CONTRACT_ADDRESSES.testnet.USDTContract
      : CONTRACT_ADDRESSES.mainnet.USDTContract,
    abi: Erc20TokenAbi,
    isTestnet,
  },
};

// 导出配置和环境信息
export { isTestnet, CONTRACT_ADDRESSES, currentNetwork };
export default contracts;
