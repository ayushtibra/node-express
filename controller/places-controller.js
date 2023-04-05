const uuid = require("uuid").v4;

const HttpError = require("../modals/http-error");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  const placeID = req.params.pid;
  const place = DUMMY_PLACES.find((place) => place.id === placeID);

  if (!place) {
    // const error = new Error("Place not found");
    // error.code = 401;
    // // throw error;
    // // or
    // return next(error);

    const error = new HttpError("Place not found for provided pid", 401);
    // throw error
    return next(error);
  }

  res.json({ place: place });
};

const getPlaceByUserId = (req, res, next) => {
  const userID = req.params.uid;
  const place = DUMMY_PLACES.filter((place) => place.creator === userID);

  if (!place || place.length === 0) {
    // const error = new Error("Place not found");
    // error.code = 401;
    // // throw error;
    // // or
    // return next(error);

    const error = new HttpError("Place not found for provided uid", 401);
    // throw error
    return next(error);
  }

  res.json({ place: place });
};

const createPlace = (req, res, next) => {
  const { title, description, address, creator, coordinates } = req.body;

  const createdPlace = {
    id: uuid(),
    title,
    description,
    address,
    location: coordinates,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ createdPlace: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeID = req.params.pid;
  const updatedPlace = {
    ...DUMMY_PLACES.find((place) => place.id === placeID),
  };

  if (!updatedPlace.title) {
    return next(new HttpError("Provided id not present", 404));
  }

  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeID);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeID = req.params.pid;

  if (!DUMMY_PLACES.find((place) => place.id === placeID)) {
    return next(new HttpError("Provided id not present", 404));
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeID);
  res.json({ allPlace: DUMMY_PLACES, message: "Place deleted" });
};

const getAllPlaces = (req, res, next) => {
  res.json({ allPlace: DUMMY_PLACES });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.getAllPlaces = getAllPlaces;
