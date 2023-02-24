import styled from 'styled-components';

export const Container = styled.div`
  margin: 16px 0 0;
  display: flex;
  align-items: center;

  .details {
    margin: 0 0 0 24px;

    strong {
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
      display: block;
      margin: 0 0 8px;
    }
  }
`;
