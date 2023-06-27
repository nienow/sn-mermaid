import {IMetadata} from '../definitions';
import {EXAMPLES} from '../util/examples';

export interface TestData {
  title: string;
  text: string;
  meta?: IMetadata;
}

const EMPTY = {
  title: 'Empty',
  text: ''
};
const FLOW = {
  title: 'Flowchart',
  text: EXAMPLES.Flow
};

const SEQ = {
  title: 'Sequence',
  text: EXAMPLES.Sequence
};

const CLASS = {
  title: 'Class',
  text: EXAMPLES.Class
};

const STATE = {
  title: 'State',
  text: EXAMPLES.State
};

const Gantt = {
  title: 'Gantt',
  text: EXAMPLES.Gantt
};

const ER = {
  title: 'ER',
  text: EXAMPLES.ER
};

const PIE = {
  title: 'Pie',
  text: EXAMPLES.Pie
};

const GIT = {
  title: 'Git',
  text: EXAMPLES.Git
};

const Mindmap = {
  title: 'Mindmap',
  text: EXAMPLES.Mindmap
};

const QuadrantChart = {
  title: 'Quadrant',
  text: EXAMPLES.QuadrantChart
};

export const TEST_DATA: TestData[] = [FLOW, SEQ, CLASS, STATE, Gantt, PIE, ER, GIT, Mindmap, QuadrantChart, EMPTY];
