'use client'

import {FC} from 'react';
import 'react-dadata/dist/react-dadata.css';
import dynamic from "next/dynamic";

const AddressSuggestions = dynamic(() => import('react-dadata').then((m) => m.AddressSuggestions), {
  ssr: false,
});

interface Props {
  onChange?: (value: string) => void;
  placeholder?: string;
  onBlur?: () => void;
}

export const AddressInput: FC<Props> = ({onChange, placeholder, onBlur}) => {
  return (
    <AddressSuggestions
      token="ad1a2dc701e8a7fdc23f586b0846bfcb8c8af2a9"

      onChange={(data) => {
        onChange?.(data?.value ?? '')
      }}

      inputProps={{
        placeholder,
        onBlur,
        onChange: (event) => {
          const target = event.target as HTMLInputElement
          onChange?.(target.value)
        }
      }}

    />
  )
};




