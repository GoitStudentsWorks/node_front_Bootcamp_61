import styled from "styled-components";

export const QuestFormWrapper = styled.div`
  margin-bottom: 20px;
`;

export const QuestionFormWrapper = styled.div`
  border-radius: 20px;
  max-width: 335px;
  height: 590px;
  background: rgba(255, 255, 255, 0.02);
  @media screen and (min-width: 768px) {
    max-width: 440px;
  }
  @media screen and (min-width: 1280px) {
    max-width: 744px;
  }
`;

export const QuestionFormStyles = styled.form`
  padding: 40px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const QuestionImageWrapper = styled.div<{ imageurl: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-image: url(${(props) => props.imageurl});
  background-size: cover;
  margin-bottom: 8px;
`;

export const QuestionImage = styled.img`
  display: none;
`;

export const QuestionTextarea = styled.input`
  border: 1px solid rgba(244, 244, 244, 0.6);
  border-radius: 30px;
  padding: 14px 18px;
  width: 100%;
  height: 44px;
  background-color: transparent;
  resize: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.14286;
  letter-spacing: -0.01em;
  color: #f4f4f4;
  margin-bottom: 16px;
`;

export const QuestionFormInputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  stroke: #171717;
`;
export const QuestionFormInputForUpdate = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
`;

export const SubmitQuizButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
`;
export const SubmitQuizButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  border-radius: 30px;
  border: none;
  padding: 16px 24px;
  background: transparent;
  border: 1px solid rgba(244, 244, 244, 0.6);
  font-weight: 600;
  font-size: 14px;
  line-height: 1.14286;
  letter-spacing: -0.01em;
  color: #f4f4f4;
  color: #f4f4f4;
  font-family: "Montserrat", Inter, system-ui, Avenir, Helvetica, Arial,
    sans-serif;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;

  &:hover,
  &:focus {
    background-color: #205bf1;
    border: none;
  }

  transition-property: background;

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 1;
    letter-spacing: -0.04em;
    padding: 14px 28px;
    width: 150px;
  }
`;

export const SubmitQBtnNumWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const FixPositoinWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const SubmitQuizNumSpan = styled.span`
  color: #f4f4f4;
`;
