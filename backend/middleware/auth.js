import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next)=>{

const authHeader = req.headers.authorization;

if(!authHeader) return res.status(401).json("No token");

const token = authHeader.split(" ")[1];

  try {
    console.log("MIDDLEWARE SECRET:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err) {
    console.log("JWT ERROR:", err.message);
    res.status(401).json("Invalid token");
  }
  console.log("HEADER:", req.headers.authorization);
};

export default authMiddleware;