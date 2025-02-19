const jwt = require('jsonwebtoken');

const autenticar = async (req, res, next) => {

  if(req.path == "/auth/register" || req.path == "/auth/login"){
    return next();
  }

  const auth = req.headers.authorization;

  if(!auth){
    return res.status(401).json({ mensagem: 'Sem autorização necessaria' });
  }
  const bearer = auth.split(' ');
  const token = bearer[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  try {
    
    const payload = jwt.verify(token, process.env.SECRET);

    req.usuario = payload;
    next();
  } catch (erro) {
    res.status(401).json({ mensagem: 'Token inválido' });
  }
};

const autorizarAdmin = async (req, res, next) => {
  const auth = req.headers.authorization;
  const bearer = auth.split(' ');
  const token = bearer[1];

  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

  try {
    const payload = jwt.verify(token, process.env.SECRET);
    if (!payload.data.admin) return res.status(403).json({ mensagem: 'Acesso negado' });

    req.usuario = payload;
    next();
  } catch (erro) {
    res.status(401).json({ mensagem: 'Token inválido' });
  }
};

module.exports = { 
  autenticar, 
  autorizarAdmin 
};