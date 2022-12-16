import Skill from "../models/skill";
import slugify from "slugify";

export const create = async (req, res) => {
  console.log (req.body);
  try {
   
    const { name }  = req.body;
    console.log ("Name: " + name);
    const skill = await new Skill({
      name,
      slug: slugify(name),
    }).save();
    // console.log("saved category", category);
    res.json(skill);
  } catch (error) {
    console.log(error);
  }
};

export const skills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    console.log(error);
  }
};

export const removeSkill = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(slug);
    const skill = await Skill.findOneAndDelete({ slug });
    res.json(skill);
  } catch (error) {
    console.log(error);
  }
};

export const updateSkill = async (req, res) => {
  console.log ("I am in updateSkill ", req.params);
  try {
    const { slug } = req.params;
    const { name } = req.body;
    console.log(slug);
    const skill = await Skill.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(skill);
  } catch (error) {
    console.log(error);
  }
};
