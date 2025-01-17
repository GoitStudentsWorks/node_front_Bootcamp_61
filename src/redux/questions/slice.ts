import { createSlice, PayloadAction, isAnyOf } from "@reduxjs/toolkit";
import {
  addedQuestionByQuizThunk,
  deleteQuestionByIdThunk,
  deleteQuizQuestionImgByIdThunk,
  fetchQuestionsByQuizThunk,
  updateQuestionByQuizThunk,
} from "./operations";

export type Answers = {
  descr?: string;
  _id?: string;
};

export type Questions = {
  _id: string;
  quiz?: string;
  time?: string;
  imageUrl?: string;
  type: "full-text" | "true-or-false";
  descr?: string;
  answers: Answers[];
  validAnswer?: string;
};

type QuestionsState = {
  list: Questions[];
  selectedIndex: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: QuestionsState = {
  list: [],
  selectedIndex: 0,
  isLoading: false,
  error: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getSelectedIndex: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
    updateQuestionData: (state, { payload }) => {
      
      state.list[state.selectedIndex].descr = payload.descr;
      state.list[state.selectedIndex].time = payload.time;
      state.list[state.selectedIndex].answers = payload.answers.map(
        (answer: object, index: number) => {
          const selectedQuestion = state.list[state.selectedIndex];
          return {
            ...selectedQuestion.answers[index],
            ...answer,
          };
        }
      );
      state.list[state.selectedIndex].validAnswer =
        state.list[state.selectedIndex].answers[payload.validAnswer]._id;
      state.list[state.selectedIndex].imageUrl = payload.imageUrl;
    },
    defaultStateQuestions: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsByQuizThunk.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.isLoading = false;
      })
      .addCase(addedQuestionByQuizThunk.fulfilled, (state, { payload }) => {
        state.list = [...state.list, ...payload];
        state.isLoading = false;
      })
      .addCase(deleteQuestionByIdThunk.fulfilled, (state, { payload }) => {
        state.list = state.list.filter((question) => question._id !== payload);
        state.isLoading = false;
      })
      .addCase(updateQuestionByQuizThunk.fulfilled, (state, { payload }) => {
        const updatedQuestionIndex = state.list.findIndex(
          (question) => question._id === payload._id
        );
        if (updatedQuestionIndex) {
          state.list[updatedQuestionIndex] = {
            ...state.list[updatedQuestionIndex],
            ...payload,
          };
        }
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          fetchQuestionsByQuizThunk.pending,
          deleteQuizQuestionImgByIdThunk.pending,
          addedQuestionByQuizThunk.pending,
          deleteQuestionByIdThunk.pending,
          updateQuestionByQuizThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchQuestionsByQuizThunk.rejected,
          deleteQuizQuestionImgByIdThunk.rejected,
          addedQuestionByQuizThunk.rejected,
          deleteQuestionByIdThunk.rejected,
          updateQuestionByQuizThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload === "string" ? action.payload : null;
        }
      );
  },
});

export const { getSelectedIndex, defaultStateQuestions, updateQuestionData } =
  questionsSlice.actions;

export const questionsReducer = questionsSlice.reducer;
