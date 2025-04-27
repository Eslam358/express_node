export default (func) => {
  return (req , res, next)=>{

 func(req , res, next).catch((error)=>{
    return next( error)
  })
}  } ;
