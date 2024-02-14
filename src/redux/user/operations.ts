import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { quizApi } from "../auth/operations";

interface UserInfo {
  name: string;
  email: string;
  _id: string;
  avatarURL: string;
  favorite: string[];
  passedQuizes?: number;
  averageSuccess?: string;
}

interface UserBody {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

interface IResponse {
  code: number;
  data: { user: UserInfo };
  status: string;
}

export const getUserThunk = createAsyncThunk<UserInfo, void>(
  "getUserInfo",
  async (_, thunkApi) => {
    try {
      const { data }: AxiosResponse<IResponse> = await quizApi.get("user/info");
      console.log(data.data.user);
      return data.data.user;
    } catch (error) {
      if (error instanceof Error && typeof error.message === "string") {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("An unknown error occurred");
    }
  }
);

export const editUserThunk = createAsyncThunk<UserBody, UserBody>(
  "editUserInfo",
  async (body, thunkApi) => {
    try {
      const { data } = await quizApi.patch("user/update", body);
      return data;
    } catch (error) {
      if (error instanceof Error && typeof error.message === "string") {
        thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("An unknown error occurred");
    }
  }
);

export const editPhotoThunk = createAsyncThunk<UserBody, File>(
  "editUserPhoto",
  async (file, thunkApi) => {
    try {
      const formData = new FormData();
      formData.append("userAvatar", file);
      const { data } = await quizApi.patch("user/update/avatarURL", formData);
      return data.data.avatarURL;
    } catch (error) {
      if (error instanceof Error && typeof error.message === "string") {
        thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateFavoriteThunk = createAsyncThunk<void, { favorite: string }>(
  "updateFavorite",
  async (body, thunkApi) => {
    try {
      const addFavorite = await quizApi.patch("/user/favorite", body);
      return addFavorite.data;
    } catch (error) {
      if (error instanceof Error && typeof error.message === "string") {
        return thunkApi.rejectWithValue(error.message);
      } else {
        return thunkApi.rejectWithValue("An unknown error occurred");
      }
    }
  }
);
