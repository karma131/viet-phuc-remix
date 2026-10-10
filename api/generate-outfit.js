import {generateOutfit} from '../server/service.js';
import {postHandler} from '../server/vercel-handler.js';

export default postHandler(generateOutfit);
