import Contact from '../Contact';
import AsyncPage from '../AsyncPage';

const NotFoundPage = () => {
  return (
    <AsyncPage source="404">
      <Contact />
    </AsyncPage>
  );
};

export default NotFoundPage;
