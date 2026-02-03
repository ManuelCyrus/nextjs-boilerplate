import React from 'react';
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface InputFormProps {
  name: string; 
  register: UseFormRegister<FieldValues>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  defaultValue?: string;
  placeholder?: string;
}

export const InputForm = ({
  name,
  register,
  inputProps,
  defaultValue,
  placeholder,
}: InputFormProps) => {
  return (
      <Input
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...inputProps}     
        {...register(name)}  
      />
  );
};
