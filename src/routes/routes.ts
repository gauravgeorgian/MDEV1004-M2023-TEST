import { Router } from 'express';
import Controller from '../controllers/Controller';
import { register, login } from '../controllers/Auth';
import { authenticateToken } from '../utils/JwtUtils';

const router = Router();
const controller = new Controller();
//user login
router.post('/user_login', login);
//user registeration
router.post('/user_register', register);

// Get all favourite Building
router.get('/get_building',authenticateToken, controller.getAllFavouriteBuildings);

// Get favourite Building by ID
router.get('/get_building/:id',authenticateToken, controller.getFavouriteBuildingByID);

// Add a new Building
router.post('/add_building',authenticateToken, controller.addFavouriteBuilding);

// Update an existing Building by ID
router.put('/update_building/:id',authenticateToken, controller.updateFavouriteBuilding);

// Delete an existing Building by ID
router.delete('/delete_building/:id',authenticateToken, controller.deleteFavouriteBuilding);

export default router;
