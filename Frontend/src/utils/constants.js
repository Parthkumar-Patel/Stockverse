// Author: Sai Rahul Kodumuru (B00875628)
function getRandomAPIKey() {
  const keys = [
    process.env.REACT_APP_AV_API_KEY_ONE,
    process.env.REACT_APP_AV_API_KEY_TWO,
    process.env.REACT_APP_AV_API_KEY_THREE,
    process.env.REACT_APP_AV_API_KEY_FOUR,
    process.env.REACT_APP_AV_API_KEY_FIVE,
    process.env.REACT_APP_AV_API_KEY_SIX,
    process.env.REACT_APP_AV_API_KEY_SEVEN,
    process.env.REACT_APP_AV_API_KEY_EIGHT,
    process.env.REACT_APP_AV_API_KEY_NINE,
    process.env.REACT_APP_AV_API_KEY_TEN,
    process.env.REACT_APP_AV_API_KEY_ELEVEN,
    process.env.REACT_APP_AV_API_KEY_TWELVE,
  ];

  return (
    process.env.REACT_APP_AV_API_KEY_ONE ||
    keys[Math.floor(Math.random() * keys.length)]
  );
}

const CONSTANTS = Object.freeze({
  API_ENDPOINT: '',
  GLOBAL_QUOTE(symbol) {
    return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${getRandomAPIKey()}`;
  },
  SYMBOL_SEARCH(symbol) {
    return `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${getRandomAPIKey()}`;
  },
  CRYPTO_CURRENCY_DAILY(symbol, market) {
    return `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${market}&apikey=${getRandomAPIKey()}`;
  },
  EQUITY_DAILY(symbol) {
    return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${getRandomAPIKey()}`;
  },
  COMPANY_OVERVIEW(symbol) {
    return `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${getRandomAPIKey()}`;
  },
  CONSUMER_SENTIMENT() {
    return `https://www.alphavantage.co/query?function=CONSUMER_SENTIMENT&apikey=${getRandomAPIKey()}`;
  },
  LOCAL_BACKEND_URL: `http://localhost:5000/api`,
  // LOCAL_BACKEND_URL: `https://stockverse-back-end.herokuapp.com/api`,
  PRODUCTION_URL: 'https://stockverse-back-end.herokuapp.com/api/',
});

export default CONSTANTS;
