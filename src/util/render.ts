import mermaid from 'mermaid';

export const renderDiagram = async (code) => {
  try {
    return await mermaid.render('sn-output', code);
  } catch (e) {
    throw e;
  }
};
