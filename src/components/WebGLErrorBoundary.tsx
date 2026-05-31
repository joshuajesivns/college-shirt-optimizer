import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-background">
          <div className="text-center max-w-sm px-6">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 className="text-white/90 font-medium text-lg mb-2">3D preview unavailable</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              WebGL is not supported in this preview environment. Open the app in a full browser tab to use the 3D shirt designer.
            </p>
            <a
              href={window.location.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 text-white/80 text-sm transition-colors border border-white/10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Open in new tab
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
