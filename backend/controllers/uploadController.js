import multer from 'multer';
import path from 'path';
import fs from 'fs';


const uploadDir = process.env.UPLOAD_DIR || 'uploads';
// ensure upload dir exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});

const uploadImage =  (req, res, next) => {  
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const url = `${req.protocol}://${req.get('host')}/${uploadDir}/${req.file.filename}`;
  return res.status(200).json({success:true, imageUrl: url });  
};

export {storage, uploadImage};
