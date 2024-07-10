import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { flexCenter } from "@styles/globalStyle";

interface YellowBoxProps {
  children?: React.ReactNode;
  $disabled: boolean;
  inputValue?: string;
  setInputValue?: (value: string) => void;
  placeholder?: string;
}

export default function YellowBox(props: YellowBoxProps) {
  const { children, $disabled, inputValue, setInputValue, placeholder } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputwidth, setInputwidth] = useState("auto");

  useEffect(() => {
    if (inputRef.current && placeholder) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        context.font = getComputedStyle(inputRef.current).font;
        const textWidth = context.measureText(placeholder).width;
        setInputwidth(`${textWidth}px`);
      }
    }
  }, [placeholder]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.length <= 8) {
      setInputValue?.(value);
    }
  }

  return (
    <Box $disabled={$disabled}>
      {$disabled ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          ref={inputRef}
          style={{ width: inputwidth }}
        />
      ) : (
        children
      )}
    </Box>
  );
}

const Box = styled.div<{ $disabled: boolean }>`
  width: auto;
  ${flexCenter}

  padding: 0.5rem 1rem;
  border-radius: 5px;

  ${({ theme }) => theme.fonts.Body_4};

  background-color: ${({ theme }) => theme.colors.yellow_50};
  color: ${({ theme }) => theme.colors.yellow_600};

  ${({ $disabled }) =>
    $disabled &&
    `
    cursor: not-allowed;
  `}

  input {
    height: 2.4rem;
    padding: 0;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.yellow_600}; /* 입력된 텍스트 색상 */
    ${({ theme }) => theme.fonts.Body_4};

    text-align: center;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.yellow_300}; /* placeholder 텍스트 색상 */
    }
  }
`;
