import OpenAI from 'openai';


export async function chatCompletion() {
  const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
  });

  await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });
}







