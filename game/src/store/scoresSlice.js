/** @format */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PROTECTED_GET, GET, POST, PROTECTED_POST } from "../utils/fetch";

// fetches
export const getAllScores = createAsyncThunk("getAllScores", async () => {
 const res = await GET(`/get_all_scores`);
 return res;
});

export const getTopScores = createAsyncThunk("getTopScores", async (query) => {
 const res = await GET(`/get_top_scores?${query}`);
 return res;
});

export const createScore = createAsyncThunk("createScore", async (newScore) => {
 const res = await PROTECTED_POST(`/auth/create_score`, newScore);
 return res;
});

export const deleteAllScores = createAsyncThunk(
 "deleteAllScores",
 async (authLevel) => {
  const res = await PROTECTED_GET(`/auth/delete_all_scores`);
  return res;
 }
);

export const getRank = createAsyncThunk("getRank", async (score) => {
 const res = await PROTECTED_GET(`/auth/get_rank?score=${score}`);
 return res;
});

const initialState = {
 data: { scores: [] },
 yourRank: null,
 status: "idle",
 error: null,
};

export const scoresSlice = createSlice({
 name: "scores",
 initialState,
 reducers: {
  resetYourRank: (state, action) => {
   //  state.yourRank = yourRankModel;
  },
 },
 extraReducers(builder) {
  builder
   // GET DATA
   // get all data
   .addCase(getAllScores.pending, (state, action) => {
    state.status = "loading";
   })
   .addCase(getAllScores.fulfilled, (state, action) => {
    const { success, message, data } = action.payload;
    if (success) {
     state.status = "succeeded";
     state.data = data;
    } else {
     state.status = "failed";
     state.error = message;
    }
   })
   .addCase(getAllScores.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
   })

   // get paginated data
   .addCase(getTopScores.pending, (state, action) => {
    state.status = "loading";
   })
   .addCase(getTopScores.fulfilled, (state, action) => {
    const { success, message, data } = action.payload;
    if (success) {
     state.status = "succeeded";
     state.data = data;
    } else {
     state.status = "failed";
     state.error = message;
    }
   })
   .addCase(getTopScores.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
   })

   // ADD DATA
   .addCase(createScore.pending, (state, action) => {
    state.status = "loading";
   })
   .addCase(createScore.fulfilled, (state, action) => {
    const { success, message, data } = action.payload;
    console.log(data);
    if (success) {
     state.status = "succeeded";
     // state.data = {
     //   ...state.data,
     //   scores: data.scores,
     // };
     // if (data.yourRank) {
     //   state.yourRank = data.yourRank;
     // } else {
     //   state.yourRank = yourRankModel;
     // }
    } else {
     state.status = "failed";
     state.error = message;
    }
   })
   .addCase(createScore.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
   })

   .addCase(getRank.pending, (state, action) => {
    state.status = "loading";
   })
   .addCase(getRank.fulfilled, (state, action) => {
    const { success, message, data } = action.payload;
    if (success) {
     state.status = "succeeded";
     state.yourRank = data;
    }
   })
   .addCase(getRank.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
   })

   // DELETE ALL DATA
   .addCase(deleteAllScores.pending, (state, action) => {
    state.status = "loading";
   })
   .addCase(deleteAllScores.fulfilled, (state, action) => {
    const { success, message, data } = action.payload;
    if (success) {
     state.status = "succeeded";
     state.data = state.data.filter((d) => d.id !== data);
     //   state.certainData = null;
    } else {
     state.status = "failed";
     state.error = message;
    }
   })
   .addCase(deleteAllScores.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
   });
 },
});

export const { resetYourRank } = scoresSlice.actions;

// export states
export const status = (state) => state.scores.status;
export const error = (state) => state.scores.error;

// export data
export const data = (state) => state.scores.data;
export const yourRank = (state) => state.scores.yourRank;

export const singleData = (state, id) =>
 state.scores.data.find((d) => d.id === id);
// export const certainData = (state) =>
//   state.users.certainData;

export default scoresSlice.reducer;
