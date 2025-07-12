import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const light = {
  primary: `rgba(45, 23, 112, 1)`,
  onPrimary: `rgba(255, 255, 255, 1)`,
  secondary: `rgba(72, 42, 164, 1)`,
  onSecondary: `rgba(255, 255, 255, 1)`,
  tertiary: `rgba(133, 97, 245, 1)`,
  onTertiary: `rgba(255, 255, 255, 1)`,
  quaternary: `rgba(200, 191, 228, 1)`,
  onQuaternary: `rgba(30, 30, 30, 1)`,

  error: `rgba(255, 0, 0, 1)`,
  onError: `rgba(255, 255, 255, 1)`,
  success: `rgba(102, 192, 126, 1)`,
  onSuccess: `rgba(255, 255, 255, 1)`,
  warn: `rgba(255, 204, 0, 1)`,
  onWarn: `rgba(255, 255, 255, 1)`,

  background: `rgba(220, 220, 220, 1)`,
  onBackground: `rgba(255, 255, 255, 1)`,
  text: `rgba(0, 0, 0, 1)`,
  hint: `rgba(100, 100, 100, 1)`,
  disabled: `rgba(120, 120, 120, 1)`,
  onDisabled: `rgba(255, 255, 255, 1)`,

  modalBackground: `rgba(255, 255, 255, 1)`,

  overlayWhite: `rgba(255, 255, 255, 0.4)`,
  overlay: `rgba(0, 0, 0, 0.5)`,
  onOverlay: `rgba(255, 255, 255, 1)`,
  masked: `rgba(0, 0, 0, 0.2)`,

  highlight: `rgba(0, 255, 178, 1)`,
  onHighlight: `rgba(0, 0, 0, 1)`,
};

type StateObject = {
  mode: `light` | `dark`;
  colors: typeof light;
};

type StateFunction = {
  update: (value: Partial<StateObject>) => void;
};

const initialState: StateObject = {
  mode: `light`,
  colors: light,
};

const useStore = create(
  immer<StateObject & StateFunction>((set) => {
    return {
      ...initialState,
      update: (state) => {
        return set(() => {
          return state;
        });
      },
    };
  })
);

export default useStore;
