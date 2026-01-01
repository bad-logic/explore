import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IsomorphicStoreState {
  isomorphic: boolean;
  redux: boolean;
  express: boolean;
  react: boolean;
}

export const initialState: IsomorphicStoreState = {
  isomorphic: true,
  redux: true,
  express: true,
  react: true,
};

const isomorphicSlice = createSlice({
  name: 'isomorphic',
  initialState,
  reducers: {
    update(state, action: PayloadAction<IsomorphicStoreState>) {
      state = action.payload;
    },
  },
});

export default isomorphicSlice.reducer;
export const { update } = isomorphicSlice.actions;
