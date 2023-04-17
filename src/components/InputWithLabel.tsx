import React from 'react';
import styled from 'styled-components';

type InputWithLabelProps = {
  labelText: string;
  id: string;
  type: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputWithLabel({
  labelText,
  id,
  type,
  onChange,
  name,
  value,
  checked,
}: InputWithLabelProps) {
  return (
    <InputLabelGroup>
      <Input
        id={id}
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        checked={checked}
      />
      <Label htmlFor={id}>{labelText}</Label>
    </InputLabelGroup>
  );
}

const InputLabelGroup = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  input:checked + label {
    background-color: black;
    color: white;
  }
`;

const Label = styled.label`
  display: grid;
  place-items: center;
  border: 1px solid black;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  font-size: 200%;
  text-transform: capitalize;
`;

const Input = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`;
