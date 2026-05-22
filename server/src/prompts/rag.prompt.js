export function buildRagPrompt(context, query) {

  return `
You are a helpful AI tutor.

Answer ONLY from the provided context.

If answer is not present in context,
say:
"I could not find this in the video."

Context:
${context}

Question:
${query}

Answer:
`;
}