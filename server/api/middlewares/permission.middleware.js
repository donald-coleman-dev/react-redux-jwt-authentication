const httpStatus = require("http-status");
const RoleModel = require("../models/role.model");
const APIError = require("../helpers/APIError");
const { ROLES, ERROR_MESSAGES } = require("../utils/constants");

/**
 * Check if current user has any of specified roles
 * @public
 */
exports.checkRole = roles => (req, res, next) => {
  const currentUser = req.user;

  RoleModel.findById(currentUser.role)
    .then(userRole => {
      if (roles.includes(userRole.name)) {
        return next();
      }

      return next(
        new APIError(
          ERROR_MESSAGES.USER_ROLE_NOT_ALLOWED,
          httpStatus.FORBIDDEN,
          true
        )
      );
    })
    .catch(err => next(err));
};

/**
 * Check if current user is trying to do operation on himself or is the admin
 * @public
 */
exports.checkSelfOrAdmin = (req, res, next) => {
  const currentUser = req.user;
  const { id: resourceId } = req.params;

  RoleModel.findById(currentUser.role)
    .then(userRole => {
      if (
        ROLES.ADMIN === userRole.name ||
        resourceId === currentUser._id.toString()
      ) {
        return next();
      }

      return next(
        new APIError(
          ERROR_MESSAGES.USER_NOT_ALLOWED,
          httpStatus.FORBIDDEN,
          true
        )
      );
    })
    .catch(err => next(err));
};
