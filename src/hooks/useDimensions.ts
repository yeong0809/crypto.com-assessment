import { useWindowDimensions as useRNWindowDimensions } from 'react-native';

const useWindowDimensions = () => {
  const rnWindowDimensions = useRNWindowDimensions();

  return {
    width: rnWindowDimensions.width,
    height: rnWindowDimensions.height,
  };
};

export default useWindowDimensions;
