import { User } from "../models/User.js";
import  {Listing}  from "../models/listing.js";
import { KYC } from "../models/KYC.js";

 const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const approveListing = async (req, res) => {
    try {
      const listing = await Listing.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
      if (!listing) return res.status(404).json({ message: "Listing Not Found" });
  
      res.status(200).json({ success: true, message: "Listing Approved", listing });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };


  const removeListing = async (req, res) => {
    try {
      const listing = await Listing.findByIdAndDelete(req.params.id);
      if (!listing) return res.status(404).json({ message: "Listing Not Found" });
  
      res.status(200).json({ success: true, message: "Listing Removed" });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };


const manageKYC = async (req, res) => {
  try {
    const kyc = await KYC.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!kyc) return res.status(404).json({ message: "KYC Not Found" });

    res.status(200).json({ success: true, message: `KYC ${req.body.status}`, kyc });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {getAllUsers,approveListing,removeListing,manageKYC}