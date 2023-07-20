import multer from 'multer'
import path from 'path'
//import { v4 as uuidv4 } from 'uuid';

// Settings
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (_req, file, cb) => {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${date.getMinutes()}`;
        const filename = `${file.originalname}_${formattedDate}${path.extname(file.originalname)}`;
        cb(null, filename);
        //cb(null, uuidv4() + path.extname(file.originalname))
    }
});
export default multer({storage});