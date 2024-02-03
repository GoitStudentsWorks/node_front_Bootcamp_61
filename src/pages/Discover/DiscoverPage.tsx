import { useEffect, useState } from "react";

import {
  // fetchCategoriesThunk,
  fetchQuizesThunk,
} from "../../redux/quiz/operations";
import { Quiz } from "../../redux/quiz/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const DiscoverPage = () => {
  const dispatch = useAppDispatch();
  const quizes = useAppSelector((state) => state.rootReducer.quizes.list);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredQuizes, setFilteredQuizes] = useState<Quiz[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("adults");
  const [attemptedFilter, setAttemptedFilter] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchQuizesThunk());
    // dispatch(fetchCategoriesThunk("adults"));
  }, [dispatch]);

  const handleFilter = () => {
    const filteredQuizes = quizes?.filter(
      (quiz) =>
        quiz.theme.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRating === 0 ||
          (quiz.rating >= selectedRating &&
            quiz.rating < selectedRating + 1)) &&
        quiz.ageGroup.toLowerCase() === selectedAgeGroup.toLowerCase()
    );
    setFilteredQuizes(filteredQuizes);
    setAttemptedFilter(true);
    setSelectedRating(0);
  };
  const handleRatingSelect = (minRating: number, maxRating: number) => {
    console.log(maxRating);
    setSelectedRating(minRating);
  };
  const handleAgeGroupSelect = (ageGroup: string) => {
    setSelectedAgeGroup(ageGroup);
    setSelectedRating(0);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      handleFilter();
    }
  };

  return (
    <div>
      <h1>Discover</h1>
      <label>
        Search:
        <input
          type="text"
          placeholder="find your quizz"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </label>
      <button onClick={handleFilter}>Filter</button>
      <select
        value={selectedAgeGroup}
        onChange={(e) => handleAgeGroupSelect(e.target.value)}
      >
        <option value="children">For children</option>
        <option value="adults">For adults</option>
      </select>
      <div>
        <button onClick={() => handleRatingSelect(1, 1.9)}>1</button>
        <button onClick={() => handleRatingSelect(2, 2.9)}>2</button>
        <button onClick={() => handleRatingSelect(3, 3.9)}>3</button>
        <button onClick={() => handleRatingSelect(4, 4.9)}>4</button>
        <button onClick={() => handleRatingSelect(5, 5.9)}>5</button>
      </div>

      <ul>
        {attemptedFilter && filteredQuizes.length === 0
          ? ["No quizzes found"]
          : filteredQuizes.length > 0
          ? filteredQuizes.map((quiz) => (
              <li key={quiz._id}>
                {quiz.theme}
                <p>{quiz.rating}</p>
                <p>{quiz.ageGroup}</p>
              </li>
            ))
          : quizes.map((quiz) => (
              <li key={quiz._id}>
                {quiz.theme}
                <p>{quiz.rating}</p>
                <p>{quiz.ageGroup}</p>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default DiscoverPage;