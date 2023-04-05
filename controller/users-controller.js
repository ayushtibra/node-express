const uuid = require("uuid").v4;

const HttpError = require("../modals/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@test.com",
    password: "test123",
  },
];

const getAllUsers = (req, res, next) => {
  res.json({ allUsers: DUMMY_USERS });
};

const registerUser = (req, res, next) => {
  const { name, email, password } = req.body;

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({
    message: "User Registed",
    user: createdUser,
    allUsers: DUMMY_USERS,
  });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  const userExist = DUMMY_USERS.find((user) => user.email === email);

  if (!userExist || userExist.password !== password) {
    const error = new HttpError(
      "Credentials not matched or user not exist",
      422
    );
    return next(error);
  }

  res.json({ message: "Logged In" });
};

exports.getAllUsers = getAllUsers;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
