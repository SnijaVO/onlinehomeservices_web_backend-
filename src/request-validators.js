import Joi from "joi";

export const validateAddShop = (body) => {
  const shopSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    locationName: Joi.string().required(),
    location: Joi.number().required(),
    address: Joi.string().required(),
  });
  return shopSchema.validate(body);
};

export const validateShopLogin = (body) => {
  const shopSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  });
  return shopSchema.validate(body);
};
