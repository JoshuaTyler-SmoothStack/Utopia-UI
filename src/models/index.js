// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Airport } = initSchema(schema);

export {
  Airport
};