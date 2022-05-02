// Author : Sai Rahul Kodumuru (B00875628)
const express = require('express');

const {
  addToPortfolio,
  getAllPortfoliosByUserId,
  getPortfolioDateMap,
  deletePortfolioRecord,
  updatePortfolioRecord,
  getPortfolioRecord,
} = require('../controllers/portfolioController');
const { getUserById } = require('../controllers/userController');

const portfolioRouter = express.Router();

portfolioRouter.param('userId', getUserById);

portfolioRouter.get('/portfolios/:userId', getAllPortfoliosByUserId);
portfolioRouter.post('/portfolio/add/:userId', addToPortfolio);
portfolioRouter.get('/portfolio/:userId/:recordId', getPortfolioRecord);
portfolioRouter.put('/portfolio/:userId/:recordId', updatePortfolioRecord);
portfolioRouter.delete('/portfolio/:userId/:recordId', deletePortfolioRecord);
portfolioRouter.get('/portfolio-date-map/:userId', getPortfolioDateMap);

module.exports = portfolioRouter;
