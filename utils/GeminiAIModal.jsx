// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// Add GEMINI_API_KEY to your environment

import { GoogleGenAI } from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const tools = [
    {
      googleSearch: {},
    },
  ];

  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-2.5-flash';

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Job position, Job Description, Years of experience. Give me 5 interview questions and answers related to the job description and role as a JSON array of objects with 'question' and 'answer' fields. Only return the JSON array`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `...`, // Truncated for readability
        },
        {
          text: `\`\`\`json
[ { "question": "Tell me about yourself.", "answer": "..." }, ... ]
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `Job position:- Full Stack Developer, Job Description: React, Nodejs, postgreSQL Years of experience:5. Give me 5 interview questions and answers related to the job description and role as a JSON array of objects with 'question' and 'answer' fields. Only return the JSON array`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `...`, // Truncated for readability
        },
        {
          text: `\`\`\`json
[ { "question": "...", "answer": "..." }, ... ]
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main().catch(console.error);
