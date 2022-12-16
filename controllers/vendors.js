import Vendor from "../models/vendor";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
   // console.log("req.body ", req.body);
    const { name, email, company } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!company) {
      return res.json({
        error: "Company is required",
      });
    }
    const exist = await Vendor.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is already registered as Vendor",
      });
    }

    const vendor = await new Vendor({
      name,
      email,
      company,
      slug: slugify(name),
    }).save();

     console.log("saved vendor", vendor);
    res.json(vendor);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const vendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const removeVendor = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(slug);
    const vendor = await Vendor.findOneAndDelete({ slug });
    res.json(vendor);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
