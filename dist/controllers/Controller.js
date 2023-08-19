"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingModel_1 = __importDefault(require("../model/BuildingModel"));
const logger_1 = __importDefault(require("../logger"));
class Controller {
    /**
     * Get all favourite Buildings.
     *
     * @param req The request object.
     * @param res The response object.
     */
    getAllFavouriteBuildings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const favouriteBuildings = yield BuildingModel_1.default.find().lean();
                if (favouriteBuildings.length === 0) {
                    logger_1.default.info('Favourite Buildings not found');
                    res.status(404).json({ message: 'No favourite Buildings found' });
                }
                else {
                    res.json(favouriteBuildings);
                    logger_1.default.info('Favourite Buildings found');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in getAllFavouriteBuildings method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Get a favourite Building by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    getFavouriteBuildingByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const favouriteBuilding = yield BuildingModel_1.default.findById(id).lean();
                if (!favouriteBuilding) {
                    res.status(404).json({ message: 'Building not found' });
                }
                else {
                    res.json(favouriteBuilding);
                    logger_1.default.info('Favourite Building found');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in getFavouriteBuildingByID method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
    * Add a new Building.
    *
    * @param req The request object.
    * @param res The response object.
    */
    addFavouriteBuilding(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, type, dateBuilt, city, country, description, architects, cost, website, imageURL, } = req.body;
            try {
                const newFavouriteBuilding = new BuildingModel_1.default({
                    name,
                    type,
                    dateBuilt,
                    city,
                    country,
                    description,
                    architects,
                    cost,
                    website,
                    imageURL,
                });
                yield newFavouriteBuilding.save();
                res.status(201).json(newFavouriteBuilding);
                logger_1.default.info('Favourite building added');
            }
            catch (error) {
                logger_1.default.error(`Error found in addFavouriteBuilding method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Update an existing favourite Building by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    updateFavouriteBuilding(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updatedData = req.body;
            try {
                const updatedFavouriteBuilding = yield BuildingModel_1.default.findByIdAndUpdate(id, updatedData, { new: true }).lean();
                if (!updatedFavouriteBuilding) {
                    res.status(404).json({ message: 'Building not found' });
                }
                else {
                    res.json(updatedFavouriteBuilding);
                    logger_1.default.info('Favourite Building updated');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in updateFavouriteBuilding method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Delete an existing favourite Building by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    deleteFavouriteBuilding(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedFavouriteBuilding = yield BuildingModel_1.default.findByIdAndDelete(id).lean();
                if (!deletedFavouriteBuilding) {
                    res.status(404).json({ message: 'Building not found' });
                }
                else {
                    res.json({ message: 'Favourite Building deleted successfully' });
                    logger_1.default.info('Favourite Building deleted');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in deleteFavouriteBuilding method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = Controller;
