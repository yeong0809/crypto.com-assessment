import { CONFIG, CONSTANT } from '@/commons/index';
import { reactQuery, httpRequest, MOCK } from '@/endpoints/index';

type Parameters = {
  username: string;
  password: string;
};

const useLogin = ({
  username: outerUsername,
  password: outerPassword,
}: Parameters) => {
  const callAPI = async ({
    username: innerUsername,
    password: innerPassword,
  }: Parameters) => {
    try {
      const result: typeof MOCK.login = await httpRequest.post({
        url: `${CONFIG.PRODUCTION_DOMAIN_URL}login`,
        body: {
          username: innerUsername || outerUsername,
          password: innerPassword || outerPassword,
        },
        headers: {},
      });

      return result;
    } catch (error) {
      throw error as typeof MOCK.error;
    }
  };

  const query = reactQuery.useMutation<
    Parameters,
    typeof MOCK.login,
    typeof MOCK.error
  >({
    func: callAPI,
    keys: [CONSTANT.LOGIN],
  });

  return query;
};

export { useLogin };
