import { ChangeEvent } from 'react'

export interface InputField {
  value: string;
  name: string;
  placeholder: string;
  required: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}