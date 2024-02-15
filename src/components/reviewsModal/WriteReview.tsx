import React, { useState } from "react";
import {
  StyledSection,
  StyledTitle,
  StyledWriteReviewButton,
  StyledWriteReviewForm,
  StyledWriteReviewInput,
  StyledWriteReviewWrapper,
} from "./WriteReview.styled";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { reviewsPostThunk } from "../../redux/reviews/operations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { schemaWriteReview } from "../../helpers/schemas";

interface WriteReviewFormData {
  name: string;
  rating: string;
  review: string;
}

const WriteReview: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [review, setReview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<WriteReviewFormData>({
    resolver: yupResolver(schemaWriteReview),
  });

  const handleWriteReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reviewValue = e.target.value;
    setReview(reviewValue);
    setValue("review", reviewValue);
  };

  const submit: SubmitHandler<WriteReviewFormData> = (data) => {
    dispatch(reviewsPostThunk(data)).unwrap();
    reset();
    navigate("/thanYou");
  };

  return (
    <StyledSection>
      <StyledWriteReviewWrapper>
        <StyledTitle>Write a review</StyledTitle>
        <StyledWriteReviewForm onSubmit={handleSubmit(submit)}>
          <StyledWriteReviewInput
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors?.name && <div>{errors.name.message}</div>}
          <StyledWriteReviewInput
            type="text"
            placeholder="Rate the quiz"
            {...register("rating")}
          />
          {errors?.rating && <div>{errors.rating.message}</div>}
          <StyledWriteReviewInput
            type="text"
            placeholder="What is your opinion on the quiz"
            {...register("review")}
          />
          {errors?.review && <div>{errors.review.message}</div>}
        </StyledWriteReviewForm>
        <StyledWriteReviewButton onClick={handleSubmit(submit)}>
          Send
        </StyledWriteReviewButton>
      </StyledWriteReviewWrapper>
    </StyledSection>
  );
};

export default WriteReview;
