const sessions = new Map();

export function addMessage(sessionId, role, content) {

    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, []);
    }

    sessions.get(sessionId).push({
        role,
        content,
    });
}

export function getSessionHistory(sessionId) {

    return sessions.get(sessionId) || [];
}