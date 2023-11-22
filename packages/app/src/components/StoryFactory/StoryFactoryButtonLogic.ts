// StoryFactoryButtonLogic.ts
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const useStoryFactoryButton = (isNewUser: boolean, currentPage: number) => {
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const history = useHistory();

  const handleNext = () => {
    // Logic to determine when to switch to the next page
    if (currentPage < 3) {
      // Continue with the normal logic
      setRedirectTo(null);
    } else {
      // Redirect to other pages if the user is not new
      if (!isNewUser) {
        setRedirectTo(`/story-factory/${currentPage + 1}`);
      }
    }
  };

  const redirect = () => {
    if (redirectTo) {
      history.push(redirectTo);
    }
  };

  return {
    isNewUser,
    currentPage,
    handleNext,
    redirect,
  };
};

export default useStoryFactoryButton;