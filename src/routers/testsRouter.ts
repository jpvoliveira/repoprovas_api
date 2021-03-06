import {Router} from 'express';
import * as testsController from '../controllers/testsController.js'

const testsRouter = Router()

testsRouter.post('/add', testsController.addTest)
testsRouter.get('/findtestcategory', testsController.findTestCategory)
testsRouter.get('/findtestteacher', testsController.findTestTeacher)
testsRouter.post('/addview', testsController.addView)

export default testsRouter;