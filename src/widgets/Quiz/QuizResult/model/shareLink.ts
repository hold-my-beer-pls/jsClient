export const shareLink = async (ids: string) => {
  let response = '';
  try {
    await navigator.share({
      title: 'Пройти тест по JS',
      url: `https://t.me/DUKjsBot/app?startapp=get-${ids}`,
    });
    response = 'Вы успешно поделились тестом!';
  } catch (err) {
    await navigator.clipboard.writeText(`https://t.me/DUKjsBot/app?startapp=get-${ids}`);
    response = 'Ссылка на тест скопирована!';
  }

  return response;
};
