import {IMetadata, MY_DOMAIN, SN_DOMAIN} from './definitions';
import {getPreviewText} from './utils';
import ComponentRelay from '@standardnotes/component-relay';

let currentNote;

const componentRelay = new ComponentRelay({
  targetWindow: window,
  options: {
    coallesedSaving: true,
    coallesedSavingDelay: 400,
    debug: true
  }
});

export const connectToStandardNotes = (noteReadyCallback: () => void) => {
  componentRelay.streamContextItem((note) => {
    currentNote = note;
    // Only update UI on non-metadata updates.
    if (!note.isMetadataUpdate) {
      noteReadyCallback();
    }
  });
};

const save = () => {
  componentRelay.saveItemWithPresave(currentNote, () => {
    currentNote.content.preview_plain = getPreviewText(currentNote.content.text);
  });
};

export const getNoteText = (): string => {
  return currentNote.content.text || '';
};

export const getNoteMetadata = (): IMetadata => {
  return currentNote.content.appData[MY_DOMAIN] || {};
};

export const isNoteLocked = () => {
  return currentNote.content.appData[SN_DOMAIN]['locked'];
};

export const updateNoteText = (newText: string) => {
  currentNote.content.text = newText;
  save();
};

export const updateNoteMetadata = (newMeta: Partial<IMetadata>) => {
  currentNote.content.appData[MY_DOMAIN] = {
    ...currentNote.content.appData[MY_DOMAIN],
    ...newMeta
  };
  save();
};
