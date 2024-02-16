import React, { Dispatch, SetStateAction } from "react";
import WriteReviewButton from "../../reviewsModal/WriteReviewButton";
import { Questions } from "../../../redux/questions/slice";
import { ResultTitle, StyledResultContainer } from "./ResultInterface.styled";

interface RenderResultInterfaceProps {
  questions: Questions[];
  AnswersArray: { answer: boolean }[];
  validAnswers: (AnswersArray: { answer: boolean }[]) => number;
  setReviews: Dispatch<SetStateAction<boolean>>;
}

const RenderResultInterface: React.FC<RenderResultInterfaceProps> = ({
  AnswersArray,
  questions,
  validAnswers,
  setReviews,
}) => {
  return (
    <StyledResultContainer>
      <ResultTitle>The results</ResultTitle>
      <div>
        <p>Correct answers</p>
        {/* //TODO: */}
        <p>{`${validAnswers(AnswersArray)}/${questions.length}`}</p>
      </div>
      <div>
        <p>Rate the quiz</p>
        <>STARS</>
      </div>
      <WriteReviewButton setReviews={() => setReviews(true)} />
    </StyledResultContainer>
  );
};

export default RenderResultInterface;
