import { style } from '@vanilla-extract/css';

const button = style({
  padding: '0',
  margin: '0',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

const input = style({
  padding: '0',
  margin: '0',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});
const reset = {
  button,
  input,
};

export { reset };
