//Author : Parthkumar Patel (B00899800)
const WishlistModel = require("../models/Wishlist");

const updateWishlist = async (req, res) => {
  try {
    const WishlistId = req.params.id;
    const reqData = req.body;
    console.log(reqData);
    // no user id handling
    if (!reqData.UserId) {
      return res.status(400).json({
        Message: "Invalid User Id !!",
        Status: false,
        Data: "",
      });
    }
    const foundWishlist = await WishlistModel.find({
      _id: { $ne: WishlistId },
      UserId: reqData.UserId,
      Name: reqData.Name,
    });
    console.log(foundWishlist.length);
    if (foundWishlist.length > 0) {
      return res.status(400).json({
        Message: "Wishlist Name already Exist !!",
        Status: false,
        Data: "",
      });
    } else {
      const reqUpdateWishlist = {
        UserId: reqData.UserId,
        Name: reqData.Name,
        Investments: reqData.Investments,
      };
      const updatedWishlist = await WishlistModel.findByIdAndUpdate(
        WishlistId,
        {
          $set: reqUpdateWishlist,
        },
        { new: true }
      );
      res.status(201).json({
        Message: "Wishlist updated Successfully !!",
        Status: true,
        Data: updatedWishlist,
      });
    }
  } catch (err) {
    res.status(500).json({
      Message: "Internal Server Error !!",
      Status: false,
      DetailMessage: err,
      Data: "",
    });
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const WishlistId = req.params.id;
    const response = await WishlistModel.findByIdAndDelete(WishlistId);
    res.status(201).json({
      Message: "Wishlist deleted Successfully !!",
      Status: true,
      Data: response,
    });
  } catch (err) {
    res.status(500).json({
      Message: "Internal Server Error !!",
      Status: false,
      DetailMessage: err,
      Data: "",
    });
  }
};

const getWishlistListByUserIdorId = async (req, res) => {
  try {
    const reqUserId = req.params.id;
    const foundWishlist = await WishlistModel.find({
      $or: [{ UserId: reqUserId }, { _id: reqUserId }],
    });
    /* const foundWishlist = await WishlistModel.find({UserId:reqUserId}); */
    res.status(201).json({
      Message: "Wishlists fetched Successfully !!",
      Status: true,
      Data: foundWishlist,
    });
  } catch (err) {
    return res.status(500).json({
      Message: "Internal Server Error !!",
      Status: false,
      DetailMessage: err,
      Data: "",
    });
  }
};

const addWishlist = async (req, res) => {
  try {
    const reqData = req.body;
    console.log(reqData);
    // no user id handling
    if (!reqData.UserId) {
      return res.status(400).json({
        Message: "Invalid User Id !!",
        Status: false,
        Data: "",
      });
    }
    const foundWishlist = await WishlistModel.find({
      UserId: reqData.UserId,
      Name: reqData.Name,
    });
    console.log(foundWishlist.length);
    if (foundWishlist.length > 0) {
      return res.status(400).json({
        Message: "Wishlist Name already Exist !!",
        Status: false,
        Data: "",
      });
    } else {
      const newWishlist = {
        UserId: reqData.UserId,
        Name: reqData.Name,
        Investments: reqData.Investments,
      };
      const response = await WishlistModel.create(newWishlist);
      res.status(201).json({
        Message: "Wishlist saved Successfully !!",
        Status: true,
        Data: response,
      });
    }
  } catch (err) {
    return res.status(500).json({
      Message: "Internal Server Error !!",
      Status: false,
      DetailMessage: err,
      Data: "",
    });
  }
};

//Author : Pallavi Cherukupalli (B00887062)
const getAllWishlists = async (req, res) =>{
    try{
        const allWishlists = await WishlistModel.find({});
        res.status(200).json({
          wishlist: allWishlists,
          success: true
        });
        }catch (err) {
        res.status(500).json({
          message: err.message,
          success: false,
        });
        }
}
module.exports = {
    updateWishlist,
    deleteWishlist,
    getWishlistListByUserIdorId,
    addWishlist,
    getAllWishlists
};


 
