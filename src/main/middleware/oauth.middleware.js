const authorization = (role) =>
  async (req, res, next) => {
    if(req.user && req.user.role == role){
      next();
    }
    else{
      res.status(403).send();
    }
    
  }

export default authorization