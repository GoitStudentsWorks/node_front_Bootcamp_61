import { RootState } from "../store";

export const formUpdateOptions = (state: RootState) => state.quizes;
export const getQuizListCategory = (state: RootState) =>
  state.quizes.listCategory.data.result;
export const getQuizCategoryTotal = (state: RootState) =>
  state.quizes.listCategory.data.total[0].total;
export const getQuizIsLoading = (state: RootState) => state.quizes.isLoading;
