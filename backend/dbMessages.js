import mongoose from 'mongoose';

// assigning data schema (schema is defining/showing how data is gonna be built )
const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
})
// collection
export default mongoose.model('messagecontents', whatsappSchema) // same name as appdb.<collectionname> in cluster