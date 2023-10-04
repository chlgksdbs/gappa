const numberToKorean = (amount) => {
  const units = ['', '만', '억', '조', '경'];
  const digits = amount.toString().split('').reverse();
  const result = [];

  for (let i = 0; i < digits.length; i += 4) {
    const chunk = digits.slice(i, i + 4).reverse().join('');
    const chunkNumber = parseInt(chunk, 10);

    if (chunkNumber !== 0) {
      const unit = units[Math.floor(i / 4)];
      result.push(numberToKoreanChunk(chunkNumber) + unit);
    }
  }

  return result.reverse().join('');
};

const numberToKoreanChunk = (chunk) => {
  const digitNames = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const unitNames = ['', '십', '백', '천'];

  return chunk
    .toString()
    .split('')
    .reverse()
    .map((digit, index) => {
      const digitName = digitNames[parseInt(digit, 10)];
      const unitName = digit === '0' ? '' : unitNames[index];
      return digitName + unitName;
    })
    .reverse()
    .join('');
};

export { numberToKorean, numberToKoreanChunk };
