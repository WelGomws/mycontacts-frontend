import styled from 'styled-components';

export const Container = styled.div`
  margin: 16px 0 0;
  display: flex;
  align-items: flex-start;

  span {
    margin: 0 0 0 24px;
    color: ${({ theme }) => theme.colors.gray[200]};
    word-break: break-word;
  }
`;
