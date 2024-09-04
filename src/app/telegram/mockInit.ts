import { mockTelegramEnv, parseInitData } from '@telegram-apps/sdk-react';

export const mockInit = () => {
  const initDataRaw = new URLSearchParams([
    [
      'user',
      JSON.stringify({
        id: 650864803,
        first_name: 'R',
        last_name: 'zheka',
        username: 'hold',
        language_code: 'ru',
        is_premium: true,
        allows_write_to_pm: true,
      }),
    ],
    ['hash', '2cb2634a884cb0ef70170256510a33ec328a64becb125e5fb1e286cf72f1d26e'],
    ['auth_date', '1716922846'],
    ['start_param', 'debug'],
    ['queryId', 'AAGjaMsmAAAAAKNoyyZFplZA'],
  ]).toString();

  mockTelegramEnv({
    themeParams: {
      accentTextColor: '#6ab2f2',
      bgColor: '#17212b',
      buttonColor: '#5288c1',
      buttonTextColor: '#ffffff',
      destructiveTextColor: '#ec3942',
      headerBgColor: '#17212b',
      hintColor: '#708499',
      linkColor: '#6ab3f3',
      secondaryBgColor: '#232e3c',
      sectionBgColor: '#17212b',
      sectionHeaderTextColor: '#6ab3f3',
      subtitleTextColor: '#708499',
      textColor: '#f5f5f5',
    },
    initData: parseInitData(initDataRaw),
    initDataRaw,
    version: '7.2',
    platform: 'tdesktop',
  });
};
