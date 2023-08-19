"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("../controllers/Controller"));
const Auth_1 = require("../controllers/Auth");
const JwtUtils_1 = require("../utils/JwtUtils");
const router = (0, express_1.Router)();
const controller = new Controller_1.default();
//user login
router.post('/user_login', Auth_1.login);
//user registeration
router.post('/user_register', Auth_1.register);
// Get all favourite Building
router.get('/get_building', JwtUtils_1.authenticateToken, controller.getAllFavouriteBuildings);
// Get favourite Building by ID
router.get('/get_building/:id', JwtUtils_1.authenticateToken, controller.getFavouriteBuildingByID);
// Add a new Building
router.post('/add_building', JwtUtils_1.authenticateToken, controller.addFavouriteBuilding);
// Update an existing Building by ID
router.put('/update_building/:id', JwtUtils_1.authenticateToken, controller.updateFavouriteBuilding);
// Delete an existing Building by ID
router.delete('/delete_building/:id', JwtUtils_1.authenticateToken, controller.deleteFavouriteBuilding);
exports.default = router;
