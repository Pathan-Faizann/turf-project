import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  // Extract token from HTTP-Only cookie
  const token = req.cookies.admin_token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized. No admin token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ensure the token belongs to an admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. You are not an admin." });
    }

    // Attach admin context
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Admin token is invalid or expired." });
  }
};
