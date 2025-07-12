import {
  useQuery as useTSQuery,
  useMutation as useTSMutation,
} from '@tanstack/react-query';

type QueryObject<P, S, E> = {
  func: (params: P) => Promise<S | E>;
  keys: string[];
  isEnabled?: boolean;
};

type MutationObject<P, S, E> = {
  func: (params: P) => Promise<S | E>;
  keys: string[];
};

const useQuery = <P, S, E>({ func, keys, isEnabled }: QueryObject<P, S, E>) => {
  const tSQuery = useTSQuery<S, E, P | {}>({
    queryFn: func as any,
    queryKey: keys,
    enabled: isEnabled,
  });

  return {
    isLoading: tSQuery.isPending,
    isSuccess: tSQuery.isSuccess,
    isError: tSQuery.isError,
    error: tSQuery.error,
    data: tSQuery.data,
    request: tSQuery.refetch,
  };
};

const useMutation = <P, S, E>({ func, keys }: MutationObject<P, S, E>) => {
  const tSMutation = useTSMutation<S, E, P | {}>({
    mutationFn: func as any,
    // mutationFn: func,
    mutationKey: keys,
  });

  return {
    isLoading: tSMutation.isPending,
    isSuccess: tSMutation.isSuccess,
    isError: tSMutation.isError,
    error: tSMutation.error,
    data: tSMutation.data,
    request: tSMutation.mutateAsync,
    reset: tSMutation.reset,
  };
};

export { useQuery, useMutation };
