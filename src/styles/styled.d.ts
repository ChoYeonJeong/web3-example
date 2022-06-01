import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      pink: string;
      dark_grey: string;

    };
    size: {
      mobile: string;
      laptop: string;
      desktop: string;
    };
    positions: {
      flexCenterXY: string;
      flexCenterX: string;
      flexCenterY: string;
      flexColumnY: string;
      spaceBetween: string;
      spaceAround: string;
    };
  }
}