import OpenAI from 'openai';


export async function chatCompletion(): string {
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  };
  const chatCompletion_: OpenAI.Chat.ChatCompletion = await client.chat.completions.create(params);


  return chatCompletion_;
}







