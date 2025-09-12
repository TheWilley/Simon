import { useEffect, useState } from 'react';

function useSequenceFromUrl(maxLength = 20): number[] {
  const [sequence, setSequence] = useState<number[]>([]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const seqParam = params.get('sequence');

    if (!seqParam) return;

    const seqArray = seqParam
      .split(',')
      .map((numStr) => Number(numStr))
      .filter((num) => !isNaN(num) && num >= 0 && num <= 3);

    if (seqArray.length > maxLength) {
      setSequence(seqArray.slice(0, maxLength));
    } else {
      setSequence(seqArray);
    }
  }, [maxLength]);

  return sequence;
}

export default useSequenceFromUrl;
