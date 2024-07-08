import styled from "styled-components";
import { flexCenter } from "styles/globalStyle";

interface NumberBoxProps {
  children?: React.ReactNode;
  $disabled: boolean;
  inputValue?: string;
  setInputValue?: (value: string) => void;
  placeholder?: string;
}

const Box = styled.div<{ $disabled: boolean }>`
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

export default function NumberBox(props: NumberBoxProps) {
  const { children, $disabled, inputValue, setInputValue, placeholder } = props;

  return (
    // $disabled가 false일 때는 children이 표시되고, $disabled가 true일 때는 Input 요소가 표시
    // Onboarding 페이지에서 NumberBox 재사용하기 위함
    <Box $disabled={$disabled}>
      {$disabled ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue?.(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        children
      )}
    </Box>
  );
}