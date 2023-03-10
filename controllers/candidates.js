import Candidate from "../models/candidate";
import User from "../models/user";
import slugify from "slugify";
import Profiles from "../models/profile";

export const createCandidate = async (req, res) => {
  try {
    const addCandidateForm = { ...req.body.formValues };

    // Basha - We can add server side validation here if needed.
    if (!addCandidateForm.contactNumber) {
      return res.json({
        error: "Candidate Contact Number is required",
      });
    }

    //check if candidate is already available in database
    const alreadyExist = await Candidate.findOne({
      contactNumber: addCandidateForm.contactNumber,
    });
    if (alreadyExist)
      return res.json({ error: "Candidate Profile is already available" });

    // save Candidate Profile
    setTimeout(async () => {
      try {
        // get the user who is uploading the profile
        const _createdBy = await getNameByUserId(req.user._id);
      //  const _resumePath = await getResumePath();
        const candidate = await new Candidate({
          ...addCandidateForm,
          slug: slugify(
            addCandidateForm.candidateName + addCandidateForm.contactNumber
          ),
          createdBy: _createdBy,
        }).save();

        return res.json(candidate);
      } catch (err) {
        return res.json({ error: "Candidate Profile creation failed " + err });
      }
    }, 1000);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const getCandidatesForAJobCode = async (req, res) => {
  const { jobCode } = req.params;
  try {
    const all = await Candidate.find({ jobCode: jobCode })
      // .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(all);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const getAllCandidatesFromDB = async (req, res) => {
  // const { jobCode } = req.params;
  try {
    const all = await Candidate.find({})
      .sort({ createdAt: -1 });

    res.json(all);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const getMatchingCandidates = async (req, res) => {
  console.log ("In getMatchingCandidates");
   const { skills } = req.params;
   console.log ("Skills, ", skills);
  try {
    const all = await Candidate.find({ primarySkills: skills })
      .sort({ createdAt: -1 });

    res.json(all);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const removeCandidateFromJob = async (req, res) => {
  try {
    const candidateID = req.params.candidateID;
    const jobCode = req.body[0];

    const candidate = await Candidate.findOneAndUpdate(
      { _id: candidateID },
      { jobCode: 0 },
      {
        new: true,
      }
    );

    res.json(candidate);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getNameByUserId = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user.name;
  } catch (error) {
    console.log(error);
  }
};
