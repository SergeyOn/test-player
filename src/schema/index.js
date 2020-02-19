import {
  normalize,
  schema
} from 'normalizr';

const tracksSchema = new schema.Entity(
  'tracks', {}, {
    processStrategy: (entity) => ({
      ...entity,
      active: false
    })
  }
);

const tracksListSchema = [tracksSchema];

export const normalizeTracks = data => normalize(data, tracksListSchema);