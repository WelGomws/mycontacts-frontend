import styled from 'styled-components';

export const Container = styled.div`
  margin: 16px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 8px 0 0;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
