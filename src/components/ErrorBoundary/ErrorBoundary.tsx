import React, { ErrorInfo } from 'react';
import {
  IErrorBoundaryProps,
  IErrorBoundaryState,
} from '../../model/ErrorBoundary';
import ErrorBoundaryFallback from '../../pages/ErrorBoundaryFallback/ErrorBoundaryFallback';

class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  public constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error: ', error, errorInfo.componentStack);
    this.setState({ hasError: true });
  }

  private handleReloadClick = (): void => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return <ErrorBoundaryFallback onReloadClick={this.handleReloadClick} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
