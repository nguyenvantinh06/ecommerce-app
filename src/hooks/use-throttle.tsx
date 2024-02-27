/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';

export const useThrottle = (cb: any, delay: number) => {
  const options = { leading: true, trailing: false };
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });
  return useCallback(
    throttle((...args: any) => cbRef.current(...args), delay, options),
    [delay],
  );
};
