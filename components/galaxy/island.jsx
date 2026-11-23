import { Component, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Galaxy from './Galaxy';

// Requested settings are kept together; this React root owns only its empty host.
export const galaxyConfig = Object.freeze({
  density: 1,
  glowIntensity: 0.3,
  flareIntensity: 1,
  starSpeed: 0.5,
  mouseRepulsion: true,
  clickWarp: true
});

class GalaxyBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function GalaxyIsland({ onReady, onError }) {
  const container = useRef(null);
  useEffect(() => {
    const canvas = container.current?.querySelector('canvas');
    const context = canvas?.getContext('webgl2');
    // The upstream effect initializes and draws before this parent effect runs.
    // Keep the existing stars if WebGL or shader initialization did not succeed.
    if (!context || context.isContextLost() || !context.getParameter(context.CURRENT_PROGRAM)) {
      onError();
      return undefined;
    }
    const onLost = () => onError();
    canvas.addEventListener('webglcontextlost', onLost);
    onReady();
    return () => canvas.removeEventListener('webglcontextlost', onLost);
  }, [onReady, onError]);

  const mobile = window.matchMedia('(max-width: 720px)').matches;
  return (
    <div ref={container} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Galaxy {...galaxyConfig} dpr={mobile ? 0.75 : 1} />
    </div>
  );
}

export function mountGalaxy(host, { onReady, onError }) {
  const root = createRoot(host, {
    identifierPrefix: 'portfolio-galaxy-',
    onUncaughtError: onError,
    onCaughtError: onError
  });
  root.render(<GalaxyBoundary onError={onError}><GalaxyIsland onReady={onReady} onError={onError} /></GalaxyBoundary>);
  return () => root.unmount();
}
