import express from 'express';
import { fetchAllStaticData, fetchBodyShape, fetchEthnicity, fetchEyeColor, fetchHairColor, fetchHobbies } from '../controllers/staticdatacontroller.js';

const router = express.Router();

router.get('/fetchData', fetchAllStaticData);
router.get('/bodyshape', fetchBodyShape);
router.get('/ethnicity', fetchEthnicity);
router.get('/eyecolor', fetchEyeColor);
router.get('/haircolor', fetchHairColor);
router.get('/hobbies', fetchHobbies);

export default router;