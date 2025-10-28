import { style } from '@vanilla-extract/css';
import { vars } from '../../lib/vanilla-extract';

export const base = style([
  {
    width: '100%',
    height: '112px',
    borderBottom: `1px solid ${vars.color.gray10}`,
    flexShrink: 0,
  },
]);

export const label = style([
  {
    borderRadius: '4px',
    backgroundColor: vars.color.gray10,
  },
]);

export const dropdown = style([
  {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: '8px',
    minWidth: '200px',
    backgroundColor: vars.color.gray0,
    border: `1px solid ${vars.color.gray10}`,
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    overflow: 'hidden',
  },
]);

export const dropdownItem = style([
  {
    padding: '12px 16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${vars.color.gray5}`,
    transition: 'background-color 0.2s ease',
    ':last-child': {
      borderBottom: 'none',
    },
  },
]);
