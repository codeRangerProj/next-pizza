'use client'

import {Controller, useFormContext} from "react-hook-form";
import {AddressInput, ErrorText, RequiredSymbol} from "@/shared/components";

interface Props {
  name: string
  label?: string
  required?: boolean
  className?: string
  placeholder?: string
}

export const FormInputAddress = ({
  name,
  label,
  required = false,
  className,
  placeholder,
}: Props) => {
  const {control} = useFormContext();

  return (
    <div className={className}>
      {
        label && (
          <p className='font-medium mb-2'>
            {label} {required && <RequiredSymbol/>}
          </p>
        )
      }

      <Controller
        control={control}
        name={name}
        render={({field, fieldState}) => (
          <>
            <AddressInput
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={placeholder}
            />

            {fieldState.error?.message && (
              <ErrorText text={fieldState.error.message} className='mt-2'/>
            )}
          </>
        )}

      />
    </div>

  );
};