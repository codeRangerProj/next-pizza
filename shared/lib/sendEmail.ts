import { render } from '@react-email/render';
import { ReactNode } from 'react';

export const sendEmail = async (
  to: string,
  subject: string,
  template: ReactNode,
) => {
  const html = await render(template);

  const response = await fetch(
    'https://api.elasticemail.com/v4/emails/transactional',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ElasticEmail-ApiKey': process.env.ELASTIC_EMAIL_API_KEY!,
      },
      body: JSON.stringify({
        Recipients: {
          To: [to],
        },
        Content: {
          Body: [
            {
              ContentType: 'HTML',
              Content: html,
            },
          ],
          From: process.env.ELASTIC_EMAIL_FROM!,
          Subject: subject,
        },
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Elastic Email error: ${error}`);
  }

  return await response.json();
};