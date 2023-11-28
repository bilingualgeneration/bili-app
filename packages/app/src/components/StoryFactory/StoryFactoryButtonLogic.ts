import { useHistory } from 'react-router-dom';

const useStoryFactoryButton = (currentPage: number) => {
  const history = useHistory();

  const handleNext = () => {
    // Continue with the normal logic for the first two pages
    if (currentPage < 3) {
      history.push(`/story-factory/${currentPage + 1}`);
      console.log(currentPage);
    } else {
      // Redirect to the next page
      history.push('/story-factory/4');
    }
  };

  return {
    currentPage,
    handleNext,
  };
};

export default useStoryFactoryButton;