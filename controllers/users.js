import User from "../models/user";
import slugify from "slugify";


export const allUsers = async (req, res) => {
  try {
    const allUsers = await User.find().sort({ createdAt: -1 });
    res.json(allUsers);
  } catch (error) {
    console.log(error);
  }
};



export const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, phone, role, isVerified, reportsTo  } = req.body;
     console.log("Req Body ", req.body);
     console.log("user name ", name);
     console.log("user phone ", phone);
     console.log("user role ", role);
     console.log("user isVerified ", isVerified);
     console.log("Reports To ", reportsTo);
     


    // console.log ("user", req.body);
    const user = await User.findByIdAndUpdate(_id, {
      $set: {
          "name": name,
          "phone": phone,
          "role": role,
          "isVerified": isVerified,
          "reportsTo": reportsTo,

      }
  }, {
      new: true,
    });
    if (!user){
      console.log ("User update failed: ");
    }
   // return res.json(user);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const removeUser = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(slug);
    const user = await User.findOneAndDelete({ slug });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
