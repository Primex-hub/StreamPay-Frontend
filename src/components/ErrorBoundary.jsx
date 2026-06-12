import { Component } from 'react';
import ErrorMessage from './ErrorMessage.jsx';
import './ErrorBoundary.css';

/**
 * Catches render errors in its subtree and shows a recoverable fallback
 * instead of unmounting the whole app. Resetting clears the error so the
 * children get another chance to render.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.reset = this.reset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // No remote logging in the demo; surface it for local debugging.
    console.error('Render error caught by ErrorBoundary:', error, info);
  }

  reset() {
    this.setState({ error: null });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <ErrorMessage
            message={this.state.error.message || 'Something went wrong'}
            onRetry={this.reset}
          />
        </div>
      );
    }
    return this.props.children;
  }
}
