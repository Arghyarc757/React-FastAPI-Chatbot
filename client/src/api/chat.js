// In dev, use /api so Vite proxy forwards to backend. Set VITE_API_URL for production.
const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

/**
 * Stream chat response from backend via SSE.
 * @param {string} message - User message
 * @param {string|null} checkpointId - Conversation thread ID (null for new chat)
 * @param {object} callbacks - { onCheckpoint, onContent, onSearchStart, onSearchResults, onEnd, onError }
 */
export async function streamChat(message, checkpointId, callbacks = {}) {
  const params = new URLSearchParams();
  if (checkpointId) params.set('checkpoint_id', checkpointId);
  const url = `${API_BASE}/chat_stream/${encodeURIComponent(message)}${params.toString() ? `?${params}` : ''}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'text/event-stream' },
  });

  if (!res.ok) {
    callbacks.onError?.(new Error(`HTTP ${res.status}`));
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            switch (data.type) {
              case 'checkpoint':
                callbacks.onCheckpoint?.(data.checkpoint_id);
                break;
              case 'content':
                callbacks.onContent?.(data.content ?? '');
                break;
              case 'search_start':
                callbacks.onSearchStart?.(data.query ?? '');
                break;
              case 'search_results':
                callbacks.onSearchResults?.(data.urls ?? []);
                break;
              case 'end':
                callbacks.onEnd?.();
                break;
              default:
                break;
            }
          } catch (_) {
            // ignore parse errors for malformed chunks
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
