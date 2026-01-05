const multer = require('multer');

const storage = multer.diskStorage({
    filename:(req,file,cb) =>{
        const uniqueName = Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null, uniqueName+file.originalname);
    },
    destination:(req,file,cb) =>{
        cb(null,'public/assets')
    }
})

const upload = multer({storage:storage})

module.exports = upload;