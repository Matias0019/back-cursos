import express, { Router } from 'express';
import { uploadFileController } from '../../modules/uploadFiles';
import upload from '../../modules/uploadFiles/multer'
import { auth } from '../../modules/auth';

const router: Router = express.Router();

// router
//   .route('/')
//   .post(auth('manageUploadFile'), upload.single('archivo'), uploadFileController.createFiles)

router
.route('/')
.post(auth('manageUploadFile'), upload.array('files', 10), uploadFileController.createFiles);

router
  .route('/:url')
  .delete(auth('manageUploadFile'), uploadFileController.deleteFile);

export default router;