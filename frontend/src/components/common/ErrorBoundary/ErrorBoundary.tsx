import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showToast?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to external service in production
    if (import.meta.env.PROD) {
      // TODO: Integrate with error logging service (Sentry, LogRocket, etc.)
      console.warn('Error logging service not configured');
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback && this.state.error && this.state.errorInfo) {
        return this.props.fallback(this.state.error, this.state.errorInfo);
      }

      // Default error UI
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>
              ⚠️
            </div>
            
            <h2 className={styles.errorTitle}>
              Something went wrong
            </h2>
            
            <p className={styles.errorDescription}>
              We're sorry, but something unexpected happened. 
              Please try refreshing the page or contact support if the problem persists.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className={styles.errorDetails}>
                <summary className={styles.errorSummary}>
                  Error Details (Development Only)
                </summary>
                
                <div className={styles.errorContent}>
                  <div className={styles.errorSection}>
                    <h4>Error Message:</h4>
                    <pre className={styles.errorMessage}>
                      {this.state.error.message}
                    </pre>
                  </div>
                  
                  <div className={styles.errorSection}>
                    <h4>Stack Trace:</h4>
                    <pre className={styles.errorStack}>
                      {this.state.error.stack}
                    </pre>
                  </div>
                  
                  {this.state.errorInfo && (
                    <div className={styles.errorSection}>
                      <h4>Component Stack:</h4>
                      <pre className={styles.errorComponentStack}>
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className={styles.errorActions}>
              <button 
                onClick={this.handleReset}
                className={styles.retryButton}
              >
                Try Again
              </button>
              
              <button 
                onClick={() => window.location.reload()}
                className={styles.refreshButton}
              >
                Refresh Page
              </button>
            </div>

            <div className={styles.errorHelp}>
              <p>
                If this problem continues, please contact our support team with 
                the error details above.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional wrapper for hooks compatibility
export const ErrorBoundaryWrapper: React.FC<{
  children: ReactNode;
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}> = (props) => {
  return <ErrorBoundary {...props} />;
};

export default ErrorBoundary;