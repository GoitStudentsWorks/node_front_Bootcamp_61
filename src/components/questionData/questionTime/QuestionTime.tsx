import { useState, useEffect } from "react";

import {
  ArrowSvg,
  QuestionTimeElem,
  QuestionTimeList,
  RenderList,
  SelectTimeWrapper,
  TimeSpan,
  TimeWrapper,
} from "./QuestionTime.styled";

// import Svg from "../../../shared/svg/Svg";
import sprite from "../../../images/icons/sprite.svg";

type QuestionTimeProps = {
  handleTimeClick: (minutes: number, seconds: number) => void;
  selectedAnswerIndex: number;
};

const QuestionTime = ({
  handleTimeClick,
  selectedAnswerIndex,
}: QuestionTimeProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>("0:00");

  useEffect(() => {
    if (selectedAnswerIndex === -1) {
      setSelectedTime("0:00");
    }
  }, [selectedAnswerIndex]);

  const handleClick = (minutes: number, seconds: number) => {
    handleTimeClick(minutes, seconds);
    setIsOpen(false);
    setSelectedTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
  };

  return (
    <>
      <TimeWrapper>
        <SelectTimeWrapper>
          <TimeSpan>Time: </TimeSpan>
          <QuestionTimeList>
            {selectedTime}
            <ArrowSvg
              onClick={() => setIsOpen(!isOpen)}
              sprite={sprite}
              id={`icon-chevron-down`}
              width={14}
              height={14}
              style={{
                transform: isOpen ? "rotate(180deg)" : "none",
              }}
            />
          </QuestionTimeList>
        </SelectTimeWrapper>

        {isOpen && (
          <RenderList>
            {Array.from({ length: 9 }, (_, index) => {
              const minutes = Math.floor(index / 4);
              const seconds = (index % 4) * 15;
              return (
                <>
                  {index > 1 && (
                    <QuestionTimeElem
                      key={index}
                      onClick={() => handleClick(minutes, seconds)}
                    >
                      {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
                    </QuestionTimeElem>
                  )}
                </>
              );
            })}
          </RenderList>
        )}
      </TimeWrapper>
    </>
  );
};

export default QuestionTime;
