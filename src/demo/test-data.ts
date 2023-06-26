import {IMetadata} from '../definitions';

export interface TestData {
  title: string;
  text: string;
  meta?: IMetadata;
}

const EMPTY = {
  title: 'Empty',
  text: ''
};
const SMALL = {
  title: 'Small',
  text: 'This is the note content for the small example',
  meta: {
    rows: 3
  }
};

const LARGE = {
  title: 'Large',
  text: 'This is the note content for the large example',
  meta: {
    rows: 10
  }
};

export const TEST_DATA: TestData[] = [SMALL, LARGE, EMPTY];
