import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'
import { catchAsync } from '../utils';

// export const createPhoto = catchAsync(async (req: Request, res: Response) => {
//     return res.json({
//         imagePath: req.file?.filename
//     });
// });

// export const deletePhoto = catchAsync(async (req: Request, res: Response)=> {   
//     const {url}  = req.params;
//     if (!url) {
//         return res.status(400).json({ error: 'No se proporcionó una URL válida' });
//       }
//     const filePath = path.resolve('uploads/' + url);
//     await fs.promises.unlink(filePath);
//     return res.json({ message: 'La imagen ha sido eliminada correctamente' });
// });

export const createFiles = catchAsync(async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const filePaths = files.map(file => file.filename);
    return res.json({
        filePaths: filePaths
    });
});

export const deleteFile = catchAsync(async (req: Request, res: Response)=> {   
    const {url}  = req.params;
    if (!url) {
        return res.status(400).json({ error: 'No se proporcionó una URL válida' });
      }
    const filePath = path.resolve('uploads/' + url);
    await fs.promises.unlink(filePath);
    return res.json({ message: 'El archivo ha sido eliminado correctamente' });
});