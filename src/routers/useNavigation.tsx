import {
  NavigationProp,
  ParamListBase,
  StackActions,
  useNavigation as useRNNavigation,
  useRoute as useRNRoute,
  DrawerActions,
} from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { navigationRef } from '@/routers/index';

const useNavigation = () => {
  const navigation = useRNNavigation<
    NavigationProp<ParamListBase> &
      DrawerNavigationProp<ParamListBase> &
      NativeStackNavigationProp<ParamListBase>
  >();
  const route = useRNRoute();

  const reset = (routes: { name: string; params?: object }[] = []) => {
    navigation.dispatch((state) => {
      return navigationRef.reset({
        ...state,
        routes: routes.map((routeObj) => {
          return {
            key: routeObj.name,
            name: routeObj.name,
            params: routeObj.params,
          };
        }),
        index: routes.length - 1,
      }) as any;
    });
  };

  const navigate = (name: string, params?: object | undefined) => {
    navigation.dispatch(() => {
      return StackActions.push(name, params);
    });
  };

  const replace = (name: string, params?: object) => {
    navigation.dispatch(() => {
      return StackActions.replace(name, params);
    });
  };

  const goBack = (name?: string, params?: object) => {
    if (name === undefined) {
      navigation.pop();
      return;
    }

    const state = navigation.getState();
    const prevRoute = state.routes[state.routes.length - 2];

    navigation.popTo(name || prevRoute.name, params);
  };

  const toggleDrawer = () => {
    navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
  };

  return {
    navigate,
    replace,
    goBack,
    canGoBack: navigationRef.canGoBack,
    getState: navigation.getState,
    getCurrentRoute: navigationRef.getCurrentRoute,
    toggleDrawer,
    reset,
    params: route.params as any,
  };
};

export default useNavigation;
