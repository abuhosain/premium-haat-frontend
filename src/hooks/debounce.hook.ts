import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, dealy = 500) => {
  const [debounceValue, setDebounceValue] = useState<T>();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, dealy);

    return () => {
      clearTimeout(timer);
    };
  }, [value, dealy]);

  return debounceValue;
};

export default useDebounce;
