import { useState, useMemo } from 'react';
import Erc20Token from '~/contracts/abi/Erc20Token.json';
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from 'wagmi';

interface TokenTransactionParams {
  tokenAddress?: string;
  contractAddress?: string;
}

const useTokenTransaction = (params?: TokenTransactionParams) => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // 获取ETH余额
  const { data: ethBalance } = useBalance({
    address: address as `0x${string}`,
    query: { enabled: !!address },
  });

  // 获取token的allowance（只有在提供了必需参数时才查询）
  const { data: tokenAllowance, refetch: refetchTokenAllowance } =
    useReadContract({
      abi: Erc20Token,
      address: params?.tokenAddress as `0x${string}`,
      functionName: 'allowance',
      args: [
        address as `0x${string}`,
        params?.contractAddress as `0x${string}`,
      ],
      query: {
        enabled: !!(address && params?.tokenAddress && params?.contractAddress),
      },
    });

  // 获取token余额（只有在提供了必需参数时才查询）
  const { data: tokenBalance, refetch: refetchTokenBalance } = useReadContract({
    abi: Erc20Token,
    address: params?.tokenAddress as `0x${string}`,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: { enabled: !!(address && params?.contractAddress) },
  });

  /**
   * 批准合约使用token
   * @param tokenAddress 代币地址
   * @param toContractAddress 合约地址
   * @param amount 数量
   * @returns
   */
  const approve = async (
    tokenAddress: string,
    toContractAddress: string,
    amount: bigint
  ) => {
    const result = await writeContractAsync({
      abi: Erc20Token,
      address: tokenAddress as `0x${string}`,
      functionName: 'approve',
      args: [toContractAddress as `0x${string}`, amount],
    });
    return result;
  };

  return {
    // 数据
    ethBalance,
    tokenAllowance: tokenAllowance as bigint | undefined,
    tokenBalance: tokenBalance as bigint | undefined,
    // 方法
    approve,
    refetchTokenAllowance,
    refetchTokenBalance,
  };
};

export default useTokenTransaction;
