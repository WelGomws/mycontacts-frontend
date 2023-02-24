import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin: 16px 0 0;
  }

  small {
    color: ${({ theme }) => theme.colors.danger.main};
    font-size: 12px;
    margin: 8px 0 0;
    display: block;
  }

  .form-item {
    position: relative;

    .loader {
      position: absolute;
      top: 16px;
      right: 16px;
    }
  }
`;
