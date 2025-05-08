declare global {
  interface Window {
    $: JQueryStatic;
    jQuery: JQueryStatic;
    cr_getC2Runtime: () => any;
    c2_callFunction: (name: string, params: any[]) => any;
  }
  
  // C2 Runtime object structure (simplified)
  interface C2Runtime {
    getObjectByUID: (uid: number) => C2Object;
    all_global_vars: Array<{name: string, data: any}>;
  }
  
  interface C2Object {
    uid: number;
    visible: boolean;
    text?: string;
    y?: number;
    arr?: any[];
  }
}

export {};