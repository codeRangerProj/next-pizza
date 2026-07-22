'use client'

import {Controller, useFormContext} from "react-hook-form";
import {ErrorText, MaskInput, RequiredSymbol} from "@/shared/components";

interface Props {
  name: string
  label?: string
  required?: boolean
  className?: string
  placeholder?: string
}

export const FormInputMask = ({
  name,
  label,
  required = false,
  className,
  ...props
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
            <MaskInput
              {...props}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
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