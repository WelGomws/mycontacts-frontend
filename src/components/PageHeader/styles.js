import styled from 'styled-components';

export const Container = styled.header`
  margin: 0 0 24px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    img {
      margin: 0 8px 0 0;
      transform: rotate(-90deg);
    }

    span {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  h1 {
    font-size: 24px;
  }
`;
