import type { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';
type FontSize = ResolvableTo<
  KeyValuePair<
    string,
    | string
    | [fontSize: string, lineHeight: string]
    | [
        fontSize: string,
        configuration: Partial<{
          lineHeight: string;
          letterSpacing: string;
          fontWeight: string | number;
        }>,
      ]
  >
>;

const normal = (lineHeight: string) => ({
  lineHeight: lineHeight,
  fontWeight: '400',
});

const medium = (lineHeight: string) => ({
  lineHeight: lineHeight,
  fontWeight: '500',
});

const fontSizeDesktop: FontSize = {
  'desktop-1': ['28px', normal('33px')],
  'desktop-2': ['20px', normal('28px')],
  'desktop-3': ['18px', normal('26px')],
  'desktop-4': ['16px', normal('24px')],
  'desktop-5': ['14px', normal('22px')],
  'desktop-6': ['13px', normal('20px')],
  'desktop-7': ['12px', normal('18px')],
  'desktop-h1': ['24px', medium('32px')],
  'desktop-h2': ['20px', medium('26px')],
  'desktop-h3': ['18px', medium('26px')],
  'desktop-h4': ['16px', medium('24px')],
  'desktop-h5': ['14px', medium('22px')],
  'desktop-h6': ['13px', medium('20px')],
  'desktop-h7': ['12px', medium('18px')],
};

const fontSizeTablet: FontSize = {
  'tablet-1': ['20px', normal('28px')],
  'tablet-2': ['20px', normal('28px')],
  'tablet-3': ['18px', normal('26px')],
  'tablet-4': ['16px', normal('24px')],
  'tablet-5': ['14px', normal('22px')],
  'tablet-6': ['13px', normal('20px')],
  'tablet-7': ['12px', normal('18px')],
  'tablet-h1': ['24px', medium('32px')],
  'tablet-h2': ['20px', medium('26px')],
  'tablet-h3': ['18px', medium('26px')],
  'tablet-h4': ['16px', medium('24px')],
  'tablet-h5': ['14px', medium('22px')],
  'tablet-h6': ['13px', medium('20px')],
  'tablet-h7': ['12px', medium('18px')],
};
const fontSizeMobile: FontSize = {
  'mobile-1': ['20px', normal('28px')],
  'mobile-2': ['20px', normal('28px')],
  'mobile-3': ['18px', normal('26px')],
  'mobile-4': ['16px', normal('24px')],
  'mobile-5': ['14px', normal('22px')],
  'mobile-6': ['13px', normal('20px')],
  'mobile-7': ['12px', normal('18px')],
  'mobile-h1': ['24px', medium('32px')],
  'mobile-h2': ['20px', medium('26px')],
  'mobile-h3': ['18px', medium('26px')],
  'mobile-h4': ['16px', medium('24px')],
  'mobile-h5': ['14px', medium('22px')],
  'mobile-h6': ['13px', medium('20px')],
  'mobile-h7': ['12px', medium('18px')],
};

export const fontSize = { ...fontSizeDesktop, ...fontSizeTablet, ...fontSizeMobile };
