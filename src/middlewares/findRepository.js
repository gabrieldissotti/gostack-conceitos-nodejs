module.exports = function findRepository (repositories){
  return function (request, response, next){
  
    const { id } = request.params;
    
    const index = repositories.findIndex(item => item.id === id);

    
    if(index < 0){
      return response.status(400).json('Repository does not exit!')
    }
  
    request.repository = repositories[index]
    request.repositoryIndex = index;
  
    return next();
  }
}