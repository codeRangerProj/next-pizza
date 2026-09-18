import React, {FC} from 'react';

interface Props {
  code: string
}

export const VerificationUserTemplate: FC<Props> = ({code}) => {
  const siteUrl = process.env.SITE_URL;

  return (
    <div>
      <p>Код подтверждения: <h2>{code}</h2></p>

      <p><a href={`${siteUrl}/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a></p>
    </div>
  );
}