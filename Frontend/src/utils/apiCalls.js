// Author: Sai Rahul Kodumuru (B00875628)
import CONSTANTS from "./constants";

// InstrumentDashboard

const getInstrumentDailyData = async (symbol, type = "Equity") => {
  try {
    const url = CONSTANTS.EQUITY_DAILY(symbol);

    const response = await fetch(url);
    const data = await response.json();
    return { status: true, data };
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

const getCompanyOverview = async (symbol) => {
  try {
    const url = CONSTANTS.COMPANY_OVERVIEW(symbol);
    const response = await fetch(url);
    const data = await response.json();
    if (Object.keys(data).length > 1) {
      return { status: true, data };
    } else {
      throw new Error("No Keys Found");
    }
  } catch (e) {
    return { status: false, message: e.message };
  }
};

const getConsumerSentiment = async () => {
  try {
    const response = await fetch(CONSTANTS.CONSUMER_SENTIMENT());
    const data = await response.json();
    return { status: true, data: data["data"][0]["value"] };
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

// Portfolio Backend
const validateInstrumentSymbol = async (symbol) => {
  try {
    // handle USA
    let redefinedSymbol = symbol;
    const country = symbol.split(".")[1];
    if (country === "USA") redefinedSymbol = symbol.replace(".USA", "");

    const url = CONSTANTS.SYMBOL_SEARCH(redefinedSymbol);

    const response = await fetch(url);
    const data = await response.json();

    const matchedItem = await data["bestMatches"].find(
      (stock) =>
        stock["1. symbol"] === redefinedSymbol &&
        stock["9. matchScore"].startsWith("1")
    );
    if (matchedItem) {
      matchedItem.instrumentRegion = matchedItem["4. region"];
      matchedItem.currency = matchedItem["8. currency"];
      return { status: true, matchedItem };
    } else {
      throw new Error("No Match Found");
    }
  } catch (e) {
    return { status: false, message: e.message };
  }
};

const validateInstrumentCrypto = async (symbol) => {
  try {
    console.log("Firing the Crypto API");
    const [cryptoCoin, country] = symbol.split(".");

    const url = CONSTANTS.CRYPTO_CURRENCY_DAILY(cryptoCoin, country);

    const response = await fetch(url);
    const data = await response.json();
    const matchedItem = await data["Meta Data"];

    if (matchedItem) {
      matchedItem.instrumentRegion = matchedItem["5. Market Name"];
      matchedItem.currency = matchedItem["4. Market Code"];
      return { status: true, matchedItem };
    } else {
      throw new Error("No Match Found for the given crypto");
    }
  } catch (e) {
    return { status: false, message: e.message };
  }
};

const addPortfolioRecord = async (portfolioData, userId) => {
  try {
    const url = `${CONSTANTS.LOCAL_BACKEND_URL}/portfolio/add/${userId}`;

    const newPortfolioData = { ...portfolioData };

    delete newPortfolioData.error;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPortfolioData),
    });

    const data = await response.json();
    return { status: true, data };
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

const editPortfolioRecord = async (portfolioData, userId, recordId) => {
  try {
    const url = `${CONSTANTS.LOCAL_BACKEND_URL}/portfolio/${userId}/${recordId}`;

    const newPortfolioData = { ...portfolioData };

    delete newPortfolioData.error;
    delete newPortfolioData.currency;
    delete newPortfolioData.createdAt;
    delete newPortfolioData.updatedAt;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPortfolioData),
    });

    const data = await response.json();
    return { status: true, data };
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

const getPortfolioData = async (userId) => {
  try {
    const url = `${CONSTANTS.LOCAL_BACKEND_URL}/portfolios/${userId}`;

    const response = await fetch(url);
    const data = await response.json();
    return { status: true, data };
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

const getPortfolioDateMap = async (userId) => {
  try {
    const url = `${CONSTANTS.LOCAL_BACKEND_URL}/portfolio-date-map/${userId}`;

    const response = await fetch(url);
    const data = await response.json();
    return { status: true, data };
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

const getPortfolioDataById = async (userId, recordId) => {
  try {
    const url = `${CONSTANTS.LOCAL_BACKEND_URL}/portfolio/${userId}/${recordId}`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      return { status: true, data: data.data };
    } else {
      throw new Error("No Match Found");
    }
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

const deletePortfolioRecord = async (userId, recordId) => {
  try {
    const url = `${CONSTANTS.LOCAL_BACKEND_URL}/portfolio/${userId}/${recordId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return { status: true, data };
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

// Payment Backend
const getPayments = async (userId) => {
  try {
    const url = `${CONSTANTS.LOCAL_BACKEND_URL}/paymentList/${userId}`;

    const response = await fetch(url);
    const data = await response.json();
    return data?.list || {};
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

const getPaymentById = async (userId, transactionId) => {
  try {
    const url = `${CONSTANTS.LOCAL_BACKEND_URL}/paymentList/users/${userId}/transactions/${transactionId}`;

    const response = await fetch(url);
    const data = await response.json();
    return data?.transaction || {};
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

const makePayment = async (userId, token) => {
  try {
    const url = `${CONSTANTS.LOCAL_BACKEND_URL}/makePayment/${userId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });
    const data = await response.json();
    return { status: true, data: data?.list?.payments };
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};
const isAuthenticated = () => {
  const user = localStorage.getItem("token");
  if (!user) {
    return false;
  } else {
    return JSON.parse(user);
  }
};

const updateUserSubscription = () => {
  let user = localStorage.getItem("token");
  user = JSON.parse(user);
  user = { ...user, isPremium: true };
  localStorage.setItem("token", JSON.stringify(user));
  return user;
};

//send promotion
const sendPromotionsEmail = async (data) => {
  try {
    const url = `${CONSTANTS.LOCAL_BACKEND_URL}/sendPromotions`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

export {
  getInstrumentDailyData,
  getCompanyOverview,
  getConsumerSentiment,
  validateInstrumentSymbol,
  validateInstrumentCrypto,
  addPortfolioRecord,
  getPortfolioData,
  getPortfolioDataById,
  deletePortfolioRecord,
  editPortfolioRecord,
  getPayments,
  getPaymentById,
  makePayment,
  getPortfolioDateMap,
  isAuthenticated,
  updateUserSubscription,
  sendPromotionsEmail,
};
