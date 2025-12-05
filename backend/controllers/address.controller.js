import Address from "../models/address.model.js";

export const addAddress = async (req, res) => {
    try {
        const { address, city, state,mobilenumber, pincode } = req.body;

        // Validate fields
        if (!address || !city || !state || !pincode || !mobilenumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new address document
        const newAddress = new Address({
            user: req.user._id,  // From auth middleware
            address,
            city,
            state,
            mobilenumber,
            pincode
        });

        await newAddress.save();

        res.status(201).json({
            message: "Address added successfully",
            address: newAddress
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getAddress = async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.user._id });
        res.status(200).json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};