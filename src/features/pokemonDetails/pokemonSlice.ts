import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {fetchDetail, fetchRandomly, Pokemon} from './pokemonAPI';

export interface PokemonState {
  value: Pokemon | null;
  status: 'idle' | 'loading' | 'failed';
  show: 'backside' | 'frontside';
}

const initialState: PokemonState = {
  value: null,
  status: 'idle',
  show: 'frontside',
};

export const fetchPokemonDetail = createAsyncThunk(
    'pokemon/fetchData',
  async (id: number) => {
    return await fetchDetail(id);
  }
);

export const fetchPokemonRandomly = createAsyncThunk(
    'pokemon/fetchData',
    async () => {
      return await fetchRandomly();
      // The value we return becomes the `fulfilled` action payload
    }
);


export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    backside: (state) => {
      state.show = 'backside';
    },
    frontside: (state) => {
      state.show = 'frontside';
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      }).addCase(fetchPokemonDetail.rejected, (state) => {
        state.status = 'failed';
        state.value = null;
    })
  },
});

export const { backside, frontside} = pokemonSlice.actions;

export const selectPokemon = (state: RootState) => state.pokemon.value;
export const selectFrontSide = (state: RootState) => state.pokemon.show === 'frontside';

export const flipCard = (): AppThunk => (
  dispatch,
  getState
) => {
  const currentShow = getState().pokemon.show;

  if (currentShow === 'frontside'){
    dispatch(backside())
  }else{
    dispatch(frontside())
  }
};

export default pokemonSlice.reducer;