import styled from 'styled-components';

export const ListHeader = styled.header`
  margin: 24px 0 0;
  margin: 0 0 8px;

  button {
    border: none;
    display: flex;
    align-items: center;
    background: transparent;

    img {
      transform: ${({ orderBy }) => orderBy === 'asc' && 'rotate(180deg)'};
      transition: transform 0.2s ease-in;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.primary.main};
    margin: 0 8px 0 0;
    font-weight: bold;
  }
`;

export const Card = styled.div`
  background: #fff;
  box-shadow: 0px 4px 10px 0px #0000000a;
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin: 16px 0 0;
  }

  .info {
    .contact-name {
      display: flex;
      align-items: center;

      small {
        background: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 4px;
        border-radius: 4px;
        margin: 0 0 0 8px;
      }
    }

    span {
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      border: none;
      background: transparent;
      margin: 0 0 0 8px;
    }
  }
`;
