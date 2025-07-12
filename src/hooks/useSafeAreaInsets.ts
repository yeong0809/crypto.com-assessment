import { useSafeAreaInsets as useRNSafeAreaInsets } from 'react-native-safe-area-context';

const useSafeAreaInsets = () => {
  const rNSafeAreaInsets = useRNSafeAreaInsets();

  return rNSafeAreaInsets;
};

export default useSafeAreaInsets;
