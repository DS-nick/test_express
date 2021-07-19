const { Op } = require("sequelize");
const path = require("path");
const Image = require("../db").image;

exports.upload = async (req, res)=> {
 const filesToUpload = req.files.map(file=> ({
    name: file.originalname,
    type: file.mimetype,
    path: file.path,
    userId: req.userId
  }))
 const result = await  Image.bulkCreate(
    filesToUpload
  )
res.send("Files uploaded success")

}

exports.images = async (req, res)=> {
  if(req.query?.image) {
    const image = await Image.findOne({
      attributes: ['name'],
      where: {
        [Op.and]: [
          {userId: req.userId},
          {name: req.query.image}
        ]
      }
    })
    if(!image?.name) res.send('Image not found')
    res.sendFile(path.join(process.cwd(), 'uploads', 'images', image.name))
  }
  const images = await Image.findAll({
    attributes: ['id', 'name'],
    where: {
      userId: req.userId
    }
  })
  res.send({
    images: images
  })
}