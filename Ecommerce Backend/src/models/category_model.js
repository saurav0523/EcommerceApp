const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    title: { type: String, required: [true, 'title is required!'] },
    description: { type: String, default: "" },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});

categorySchema.pre('save', function(next){
    // this.id = uuid.v1();
    this.updatedOn = new Date();
    this.createdOn = new Date();

    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(this.password, salt);
    // this.password = hash;

    next();
});

categorySchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next) {
   const update =  this.getUpdate();
   delete update._id;
//    delete update.id;

   this.updatedOn = new Date();

   next();
});

const CategoryModel = model('Category', categorySchema);


module.exports = CategoryModel;