import sample from 'lodash/sample';
import { factory } from 'factory-girl';
import { Data } from 'models';

const infaredValues = ['00', '01', '10', '11'];

factory.define('data', Data, {
  magnetic: factory.chance('bool'),
  infared: sample(infaredValues),
});

const DataFactory = {
  create: (attrs = {}) => factory.create('data', attrs),
  createMany: (count = 2, attrs = {}) =>
    factory.createMany('data', count, attrs),
  attrs: (attrs = {}) => factory.attrs('data', attrs),
};

export default DataFactory;
