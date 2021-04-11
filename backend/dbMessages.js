import mongoose from 'mongoose';

// assigning data schema (schema is defining/showing how data is gonna be built )
const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
})

export default mongoose.model('messageContent', whatsappSchema)