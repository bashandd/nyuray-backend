import Req from "../models/req";
import slugify from "slugify";
import Profiles from "../models/profile";

export const createReq = async (req, res) => {
  try {
    const addRequirementForm = { ...req.body.formValues };

    // Basha - We can add server side validation here if needed.
    if (!addRequirementForm.reqName) {
      return res.json({
        error: "reqName is required",
      });
    }

    //check if req is already available in database
    const alreadyExist = await Req.findOne({
      slug: slugify(addRequirementForm.reqName.toLowerCase()),
    });
    if (alreadyExist)
      return res.json({ error: "Requirement is already available" });

    // save requirement
    setTimeout(async () => {
      try {
        const requirement = await new Req({
          ...addRequirementForm,
          slug: slugify(addRequirementForm.reqName),
          createBy: req.user._id,
        }).save();

        return res.json(requirement);
      } catch (err) {
        return res.json({ error: "Requirement is already available " + err });
      }
    }, 1000);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const getReqs = async (req, res) => {
  try {
    const all = await Req.find()
      .populate("createdBy", "name")

      .sort({ createdAt: -1 });
    res.json(all);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const editReq = async (req, res) => {
  try {
    const { reqID } = req.params;
    const addRequirementForm = { ...req.body.formValues };

    // save modified requirement
    setTimeout(async () => {
      try {
        const requirement = await Req.findByIdAndUpdate(
          reqID,
          { ...addRequirementForm },
          {
            new: true,
          }
        );
        return res.json(requirement);
      } catch (err) {
        console.log(err);
        return res.json({ error: "Requirement Edit failed " + err });
      }
    }, 1000);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const singleReq = async (req, res) => {
  try {
    const { slug } = req.params;
    const requirement = await Req.findOne({ slug });

    res.json(requirement);
  } catch (err) {
    console.log(err);
  }
};

export const removeReq = async (req, res) => {
  try {
    const reqID = req.params.reqID;

    const requirement = await Req.findOneAndDelete({ reqID });
    res.json(requirement);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// Post candidates for a Req
export const postCandidateForReq = async (req, res) => {
  try {
    const { reqID } = req.params;
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const profiles = async (req, res) => {
  try {
    const profile = await Profiles.find()
      .populate("postedBy", "_id")
      .sort({ createdAt: -1 });
    res.json(profile);
  } catch (err) {
    console.log(err);
  }
};

export const assignReq = async (req, res) => {
  try {
    const { reqID } = req.params;

    const assignedUserName = req.body[0];
    const assignedUserEmail = req.body[1];

    const updatedReq = await Req.findByIdAndUpdate(
      reqID,
      {
        $set: {
          assignedUserName: assignedUserName,
          assignedUserEmail: assignedUserEmail,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedReq) {
      console.log("User update failed: ");
    }

    res.json(updatedReq);
  } catch (error) {
    console.log(error);
  }
};

export const handleFileUpload = async (req, res) => {
  // console.log("I am in handleFileUpload", req.file)

  return res.send("Single file");
};
