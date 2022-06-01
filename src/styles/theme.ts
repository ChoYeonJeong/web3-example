import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    pink: '#c7498c',
    dark_grey: '#404f56',

  },
  size: {
    mobile: '(max-width: 768px)',
    laptop: '(max-width: 1460px)',
    desktop: '(max-width: 1700px)',
  },
  positions: {
    flexCenterXY:
      'display: flex; justify-content: center; align-items: center;',
    flexCenterX: 'display: flex; justify-content: center;',
    flexCenterY: 'display: flex; align-items: center;',
    flexColumnY: 'display: flex; flex-direction: column; align-items: center;',
    spaceBetween: 'display: flex; justify-content: space-between;',
    spaceAround: 'display: flex; justify-content: space-around;',
  },
};