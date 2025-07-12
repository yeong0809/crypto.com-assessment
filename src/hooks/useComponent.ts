import { useIsFocused } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import {} from 'react-native';

const useComponent = () => {
  const isFirstRender = useRef(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      isFirstRender.current = false;
    }
  }, [isFocused]);

  return { isFirstRender: isFirstRender.current };
};

export default useComponent;
