import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';

/**
 * 404 page for unknown routes.
 */
export default function NotFound() {
  return (
    <EmptyState
      icon="🧭"
      title="Page not found"
      description="The stream you are looking for has drifted off course."
      action={
        <Link to="/">
          <Button>Back home</Button>
        </Link>
      }
    />
  );
}
