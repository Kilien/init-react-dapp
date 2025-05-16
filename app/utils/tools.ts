/**
 * 格式化数字
 * @param numStr 数字字符串
 * @param decimal 小数位数
 * @returns
 */
export const formatNumber = (
  numStr: string | undefined,
  decimal: number = 4,
): string => {
  if (!numStr) return '0';

  const num = parseFloat(numStr);

  // 处理非数字情况
  if (isNaN(num)) return '0';

  // 处理0
  if (num === 0) return '0';

  // 处理极小数值
  // const minValue = 1 / Math.pow(10, decimal);
  // if (num > 0 && num < minValue && decimal !== 2) {
  //   return `<${minValue}`;
  // }

  if (Math.abs(num) < 1) {
    const str = num.toFixed(20);
    const match = str.match(/^-?0\.0*[1-9]/);

    if (match) {
      const leadingZeros = match[0].length - 3; // 减去 "0." 和第一个非零数字

      if (leadingZeros > 0) {
        // 小数点后有前导零 (0.0..., 0.00...), 使用 0.0{x}YZ 格式
        const firstNonZeroIndex = str.indexOf(match[0].slice(-1));
        const twoDigits = str.substr(firstNonZeroIndex, 2);
        return `0.0{${leadingZeros}}${twoDigits}`;
      } else {
        // 小数点后没有前导零 (0.x...), 保留两位小数
        return parseFloat(num.toFixed(2)).toString();
      }
    } else {
      // 备选逻辑：如果正则没匹配上，也保留两位小数
      return parseFloat(num.toFixed(2)).toString();
    }
  }

  // 大于等于1百万，显示为m
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(decimal)}m`;
  }

  // 大于1000，小于1百万，使用千分位
  if (num >= 1000) {
    // 先处理小数位数
    const fixedNum = parseFloat(num.toFixed(decimal));
    return fixedNum.toLocaleString();
  }

  // 小于1000，处理小数位数后返回，去除末尾的0
  return parseFloat(num.toFixed(decimal)).toString();
};

/**
 * 格式化百分比
 * @param value
 * @param decimals
 * @returns
 */
export const formatToPercent = (
  value: string | number,
  decimals: number = 2,
) => {
  const num = Number(value);
  if (isNaN(num)) return '0%';

  // 先转换为固定小数位
  const formatted = (num * 100).toFixed(decimals);

  // 如果小数部分全是0，则去掉小数部分
  return formatted.includes('.') &&
    parseFloat(formatted) === Math.floor(parseFloat(formatted))
    ? `${Math.floor(parseFloat(formatted))}%`
    : `${formatted}%`;
};

/**
 * 打开独立窗口
 * @param url
 * @param name
 * @param customWidth
 * @param customHeight
 */
export const openOutsideWindow = (
  url: string,
  name: string,
  customWidth?: number,
  customHeight?: number,
) => {
  if (typeof window === 'undefined') return false;

  // 设置宽高的默认值
  if (!customWidth) {
    customWidth = window.screen.width / 1.5;
  }
  if (!customHeight) {
    customHeight = window.screen.height / 1.5;
  }
  //window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
  const iTop = (window.screen.height - 30 - customHeight) / 2; //获得窗口的垂直位置;
  const iLeft = (window.screen.width - 10 - customWidth) / 2; //获得窗口的水平位置;

  window.open(
    url,
    name,
    'height=' +
      customHeight +
      ',,innerHeight=' +
      customHeight +
      ',width=' +
      customWidth +
      ',innerWidth=' +
      customWidth +
      ',top=' +
      iTop +
      ',left=' +
      iLeft +
      ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no',
  );
};
