import BaseQuizList from "../basequizlist/BaseQuizList";
import {
  StyledContainer,
  StyledH2,
  StyledNavLink,
  StyledP,
  StyledSection,
} from "./Quizes.styled";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { fetchQuizesThunk } from "../../redux/quiz/operations";
import { getQuizList } from "../../redux/quiz/selectors";

//need Auth selector here
const test = false;

const Quizes = () => {
  const quizes = useAppSelector(getQuizList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const query = { pageSize: 20 };
    dispatch(fetchQuizesThunk(query));
  }, [dispatch]);

  const childrenQuizes = quizes.filter((quiz) => quiz.ageGroup === "children");
  const adultQuizes = quizes.filter((quiz) => quiz.ageGroup === "adults");
  console.log(childrenQuizes);
  console.log(adultQuizes);
  
  return (
    <StyledSection>
      <div>
        <StyledH2>For Adults</StyledH2>
        <StyledContainer>
          <StyledP>
            Dive deep into a world of intriguing quizzes tailored for adults.
            From cinema to logic, challenge your knowledge and discover where
            your expertise lies. Explore a diverse range of topics and test the
            depths of your knowledge.
          </StyledP>
          {/* If Auth, Redirect to DiscoverPage with Adult filter */}
          {/* If not Auth, Redirect to QuizListPage with Adult filter */}
          <StyledNavLink
            to={test ? "/discover?category=adult" : "/randomQuiz?adults"}
          >
            See all
          </StyledNavLink>
        </StyledContainer>
        <BaseQuizList />
      </div>
      <div>
        <StyledH2>For Children</StyledH2>
        <StyledContainer>
          <StyledP>
            Engaging and fun quizzes designed specifically for kids. Dive into a
            world of colorful questions on movies, music, and much more. Perfect
            for young curious minds! A safe space for children to learn, play,
            and grow their knowledge.
          </StyledP>
          {/* If Auth, Redirect to DiscoverPage with Children filter */}
          {/* If not Auth, Redirect to QuizListPage with Children filter */}
          <StyledNavLink
            to={test ? "/discover?category=children" : "/randomQuiz?children"}
          >
            See all
          </StyledNavLink>
        </StyledContainer>
        <BaseQuizList />
      </div>
    </StyledSection>
  );
};

export default Quizes;
