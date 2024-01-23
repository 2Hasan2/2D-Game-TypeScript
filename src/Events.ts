class Events {
  callbacks = [];
  nextId = 0;

  // emit event
  emit(eventName: string, value: any) {
    this.eventCallbacks.forEach((stored: { eventName: string; callback: (value: any) => void }) => {
      if (stored.eventName === eventName) {
        stored.callback(value);
      }
    });
  }

  // subscribe to something happening
  eventCallbacks: { id: number; eventName: string; caller: any; callback: (value: any) => void }[] = [];
  
  on(eventName: string, caller: any, callback: (value: any) => void) {
    this.nextId += 1;
    this.eventCallbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    });
    return this.nextId;
  }

  // remove the subscription
  off(id: number) {
    this.callbacks = this.callbacks.filter((stored: { id: number }) => stored.id !== id);
  }

  unsubscribe(caller: any) {
    this.callbacks = this.callbacks.filter(
      (stored: { caller: any }) => stored.caller !== caller
    );
  }
}

export const events = new Events();