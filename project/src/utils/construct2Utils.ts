/**
 * Utility functions that interact with the Construct 2 runtime
 */

// Get the Construct 2 runtime
export const getC2Runtime = (): any => {
  if (typeof window.cr_getC2Runtime === 'function') {
    return window.cr_getC2Runtime();
  }
  console.error('Construct 2 runtime not found');
  return null;
};

// Hide Construct UI elements that we're replacing with our own UI
export const hideConstructUI = (): void => {
  const runtime = getC2Runtime();
  if (!runtime) return;

  try {
    // 30Text
    const text30Obj = runtime.getObjectByUID(21);
    if (text30Obj) {
      text30Obj.visible = false;
      text30Obj.y -= 2000; // Sends elem to the shadow realm
    }

    // TextLogText
    const textLogObj = runtime.getObjectByUID(12);
    if (textLogObj) {
      textLogObj.visible = false;
      textLogObj.y -= 2000;
    }

    // ChatSend
    const chatSendObj = runtime.getObjectByUID(32);
    if (chatSendObj) {
      chatSendObj.visible = false;
      chatSendObj.y -= 2000;
    }

    // ChatTextBox
    const chatTextBoxObj = runtime.getObjectByUID(31);
    if (chatTextBoxObj) {
      chatTextBoxObj.visible = false;
    }

    // O_DIALOG
    const dialogObj = runtime.getObjectByUID(68);
    if (dialogObj) {
      dialogObj.visible = false;
      dialogObj.y -= 2000;
    }
  } catch (err) {
    console.error('Error hiding Construct UI:', err);
  }
};

// Get username from Construct 2 global variables
export const getUsername = (): string => {
  const runtime = getC2Runtime();
  if (!runtime) return 'Player';

  try {
    const usernameVar = runtime.all_global_vars.find((e: any) => e.name === 'Username');
    return usernameVar ? usernameVar.data : 'Player';
  } catch (err) {
    console.error('Error getting username:', err);
    return 'Player';
  }
};

// Get message logs from Construct 2 runtime
export const getMessageLogsFromRuntime = (): { arr: any[][] } => {
  const runtime = getC2Runtime();
  if (!runtime) return { arr: [] };

  try {
    return runtime.getObjectByUID(29) || { arr: [] }; // MessageLogs array UID is 29
  } catch (err) {
    console.error('Error getting message logs:', err);
    return { arr: [] };
  }
};

// Get the 30 text (progress text) from Construct 2 runtime
export const get30TextFromRuntime = (): string => {
  const runtime = getC2Runtime();
  if (!runtime) return '';

  try {
    const text30Obj = runtime.getObjectByUID(21);
    return text30Obj && text30Obj.text ? text30Obj.text : '';
  } catch (err) {
    console.error('Error getting 30 text:', err);
    return '';
  }
};

// Send a message to the chat in Construct 2
export const sendMessageToConstruct = (content: string): void => {
  if (!content.trim()) return;
  
  try {
    const username = getUsername();
    window.c2_callFunction('addChat', [username, content]);
  } catch (err) {
    console.error('Error sending message:', err);
  }
};