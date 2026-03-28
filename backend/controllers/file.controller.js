import cloudinary from "../config/cloudinary.js";
import File from "../models/file.model.js";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "video/mp4", "audio/mpeg", "application/pdf"];

export const uploadFile = async (req,res)=>{

   try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    
    if (!ALLOWED_TYPES.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type! Allowed: PNG, JPG, JPEG, MP4, MP3, PDF" });
    }

    
    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(400).json({ error: "File too large! Maximum size is 5MB" });
    }


  const result = await cloudinary.uploader.upload(req.file.path);

  const file = await File.create({
    title: req.body.title,
    url: result.secure_url,
    type: result.resource_type,
    tags: req.body.tags ? req.body.tags.split(",") : [],
    size: result.bytes,
    user: req.user.id
  });

    res.status(201).json({
      success: true,
      message: "File uploaded successfully 🚀",
      file
    });

  
   } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload file" });
  }
};



export const searchFiles = async (req, res) => {
  const query = req.query.q;

  const files = await File.find({
    user: req.user.id,
    $or: [
      { title: { $regex: query, $options: "i" } },
      { tags: { $elemMatch: { $regex: query, $options: "i" } } } // 🔥 FIX
    ]
  }).sort({ views: -1, createdAt: -1 });

  res.json(files);
};


export const incrementViews = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }, 
      { returnDocument: 'after' }
    );

    res.json(file);
  } catch (err) {
    res.status(500).json("Error updating views");
  }
};