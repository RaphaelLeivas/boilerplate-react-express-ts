import { useNavigate } from 'react-router-dom';
import { PagesList } from './pagesList';

export const useNavigation = () => {
  const navigate = useNavigate();

  return (page: PagesList) => {
    navigate(page);
  };
};
