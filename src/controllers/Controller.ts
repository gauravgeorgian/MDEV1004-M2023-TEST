import { Request, Response } from 'express';
import  Building, { Building as BuildingInterface } from '../model/BuildingModel';
import logger from '../logger';

class Controller {
  /**
   * Get all favourite Buildings.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async getAllFavouriteBuildings(req: Request, res: Response): Promise<void> {
    try {
      const favouriteBuildings = await Building.find().lean();
      if (favouriteBuildings.length === 0) {
        logger.info('Favourite Buildings not found');
        res.status(404).json({ message: 'No favourite Buildings found' });
      } else {
        res.json(favouriteBuildings);
        logger.info('Favourite Buildings found');
      }
    } catch (error) {
      logger.error(`Error found in getAllFavouriteBuildings method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get a favourite Building by ID.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async getFavouriteBuildingByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const favouriteBuilding = await Building.findById(id).lean();
      if (!favouriteBuilding) {
        res.status(404).json({ message: 'Building not found' });
      } else {
        res.json(favouriteBuilding);
        logger.info('Favourite Building found');
      }
    } catch (error) {
      logger.error(`Error found in getFavouriteBuildingByID method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

   /**
   * Add a new Building.
   * 
   * @param req The request object.
   * @param res The response object.
   */
   public async addFavouriteBuilding(req: Request, res: Response): Promise<void> { // Updated method name
    const {
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
    } = req.body;
    try {
      const newFavouriteBuilding: BuildingInterface = new Building({
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
      await newFavouriteBuilding.save();
      res.status(201).json(newFavouriteBuilding);
      logger.info('Favourite building added');
    } catch (error) {
      logger.error(`Error found in addFavouriteBuilding method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Update an existing favourite Building by ID.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async updateFavouriteBuilding(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const updatedFavouriteBuilding = await Building.findByIdAndUpdate(id, updatedData, { new: true }).lean();
      if (!updatedFavouriteBuilding) {
        res.status(404).json({ message: 'Building not found' });
      } else {
        res.json(updatedFavouriteBuilding);
        logger.info('Favourite Building updated');
      }
    } catch (error) {
      logger.error(`Error found in updateFavouriteBuilding method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Delete an existing favourite Building by ID.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async deleteFavouriteBuilding(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedFavouriteBuilding = await Building.findByIdAndDelete(id).lean();
      if (!deletedFavouriteBuilding) {
        res.status(404).json({ message: 'Building not found' });
      } else {
        res.json({ message: 'Favourite Building deleted successfully' });
        logger.info('Favourite Building deleted');
      }
    } catch (error) {
      logger.error(`Error found in deleteFavouriteBuilding method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default Controller;
