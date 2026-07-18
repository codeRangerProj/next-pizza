'use client'

import {FC} from 'react';
import {AddressSuggestions} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: FC<Props> = ({onChange}) => {
  return (
    <AddressSuggestions
      token="ad1a2dc701e8a7fdc23f586b0846bfcb8c8af2a9"
      onChange={(data) => onChange?.(data?.value)}
    />
  )
};




