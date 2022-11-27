import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    //   Avoiding already signedUp account
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    let salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result.id },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
    console.log(err);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
    console.log(err);
  }
};
