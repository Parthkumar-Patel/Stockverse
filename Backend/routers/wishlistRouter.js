//Author : Parthkumar Patel (B00899800)
const express = require("express");
const wishlistRouter = express.Router();
const wishlistController = require('../controllers/wishlistController');
wishlistRouter.get('/allWishlists', wishlistController.getAllWishlists)
wishlistRouter.get('/:id',  wishlistController.getWishlistListByUserIdorId);
wishlistRouter.post('/', wishlistController.addWishlist);
wishlistRouter.put('/:id',  wishlistController.updateWishlist);
wishlistRouter.delete('/:id', wishlistController.deleteWishlist);

module.exports = wishlistRouter;
