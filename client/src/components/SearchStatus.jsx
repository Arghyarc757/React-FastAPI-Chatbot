import './SearchStatus.css'

export default function SearchStatus({ phase, query, urls }) {
  if (!phase) return null

  return (
    <div className="search-status">
      {phase === 'searching' && (
        <p className="search-status-line">
          <span className="search-dot" /> Searching: {query}
        </p>
      )}
      {phase === 'reading' && (
        <>
          <p className="search-status-line">
            <span className="search-dot reading" /> Reading sources
          </p>
          {urls.length > 0 && (
            <ul className="search-urls">
              {urls.slice(0, 5).map((url, i) => (
                <li key={i}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="search-link">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {phase === 'writing' && (
        <p className="search-status-line">
          <span className="search-dot writing" /> Writing response
        </p>
      )}
    </div>
  )
} 
