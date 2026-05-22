export function buildRagPrompt(context, query, historyText) {

  return `
You are a helpful AI tutor.

Answer ONLY from the provided context.

If answer is not present in context,
say:
"I could not find this in the video."

Context:
${context}
Chat History:
${historyText}

Question:
${query}

Answer:
`;
}