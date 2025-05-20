import ErrorApp from "../utilities/apperror.js";

export default (...AA) => {
  
  return (req, res, next) => {
    const token = req.token_T;  
    if (!AA.includes(token.role)) {
      const error = ErrorApp.creat(`you must be ${AA.join(', ')}`, 404, "false");
      return next(error);
    }
    
      next();
  

  };};
