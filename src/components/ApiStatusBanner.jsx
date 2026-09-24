import { useState } from 'react';
import { isApiKeyConfigured } from '../services/tmdb';

function ApiStatusBanner() {
  const [dismissed, setDismissed] = useState(false);
  const configured = isApiKeyConfigured();

  if (configured || dismissed) {
    return null;
  }

  return (
    <aside aria-label="TMDB Setup Notice" className="api-banner">
      <div className="container api-banner-content">
        <div className="api-banner-text">
          <span className="api-banner-badge">TMDB Demo Mode</span>
          <span>
            Connect live movies &amp; series by adding your <strong>TMDB API Key</strong> to <code>.env</code> file (<code>VITE_TMDB_API_KEY</code>).
          </span>
        </div>
        <div className="api-banner-actions">
          <a
            href="https://www.themoviedb.org/settings/api"
            target="_blank"
            rel="noopener noreferrer"
            className="api-banner-link"
          >
            Get Free API Key ↗
          </a>
          <button
            type="button"
            className="api-banner-close"
            onClick={() => setDismissed(true)}
            title="Dismiss notice"
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
}

export default ApiStatusBanner;
