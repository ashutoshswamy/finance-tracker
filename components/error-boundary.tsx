"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center space-y-4">
            <p
              className="text-6xl font-light italic"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Something broke.
            </p>
            <p className="text-sm text-muted-foreground">
              Refresh the page or{" "}
              <button
                onClick={() => this.setState({ hasError: false })}
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                try again
              </button>
              .
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
