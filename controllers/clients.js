import Client from "../models/client";
import slugify from "slugify";

export const createClient = async (req, res) => {
  try {
    const addClientForm = { ...req.body.formValues };
    // console.log("req.body.formVlaues ", { addClientForm });

    // Basha - We can add server side validation here if needed.
    if (!addClientForm.clientName) {
      return res.json({
        error: "clientName is required",
      });
    }

    //check if req is already available in database
    const alreadyExist = await Client.findOne({
      slug: slugify(addClientForm.clientName.toLowerCase()),
    });
    if (alreadyExist) return res.json({ error: "Client is already available" });

    // save requirement
    setTimeout(async () => {
      try {
        const client = await new Client({
          ...addClientForm,
          slug: slugify(addClientForm.clientName),
          //createBy: client.user._id,
        }).save();

        return res.json(client);
      } catch (err) {
        //console.log(err);
        return res.json({ error: "Client is already available " + err });
      }
    }, 1000);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};


export const getClients = async (req, res) => {
  try {
    const all = await Client.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.json(all);
 
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const editClient = async (req, res) => {

  try {
    const { clientId } = req.params;
    const addClientForm = { ...req.body.formValues };
    // console.log("clientId: " + clientId);
    // console.log("req.body.formVlaues ", { addClientForm });


    // save modified client
    setTimeout(async () => {
      try {
        const client = await Client.findByIdAndUpdate(
          clientId,
          { ...addClientForm },
          {
            new: true,
          }
        );
        return res.json(client);
      } catch (err) {
        console.log(err);
        return res.json({ error: "Client Edit failed " + err });
      }
    }, 1000);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const singleClient = async (req, res) => {
  try {
    const { slug } = req.params;
    const client = await Client.findOne({ slug });
    // .populate("postedBy", "name")
    // .populate("categories", "name slug")
    // .populate("featuredImage", "url");
    res.json(client);
  } catch (err) {
    console.log(err);
  }
};

export const removeClient = async (req, res) => {

  try {
    const clientId = req.params.clientId;
    // console.log("clientId", clientId);
    const client = await Client.findOneAndDelete({ clientId });
    res.json(client);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
