// Define a generic Event export class for the event system
export class Event {
  // You can extend this export class based on your specific event needs
}

export enum KeyEventType {
  KEY_DOWN = 'keydown',
  KEY_UP = 'keyup',
}

export interface KeyEvent extends Event {
  type: KeyEventType;
  key: string;
}

export enum MouseEventType {
  MOUSE_DOWN = 'mousedown',
  MOUSE_UP = 'mouseup',
  MOUSE_MOVE = 'mousemove',
}

export interface MouseEvent extends Event {
  type: MouseEventType;
  x: number;
  y: number;
  button?: number;
}

export interface ComponentProps {
  [key: string]: any;
}

export class Component {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class PropertyComponent extends Component {
  properties: ComponentProps;

  constructor(name: string, properties: ComponentProps) {
    super(name);
    this.properties = properties;
  }
}

export class System {
  onEntityAdded?(entity: Entity): void;
  onEntityRemoved?(entity: Entity): void;
  dependencies: string[];

  constructor(dependencies: string[] = []) {
    this.dependencies = dependencies;
  }

  update(entities: Entity[], dt: number): void {
    // Implement your system logic here
    // This method will be called during each iteration of the game loop
  }
}

export class Entity {
  id: number;
  components: Map<string, Component>;

  constructor(id: number) {
    this.id = id;
    this.components = new Map();
  }

  addComponent(component: Component) {
    this.components.set(component.name, component);
  }

  removeComponent(componentName: string) {
    this.components.delete(componentName);
  }

  hasComponent(componentName: string): boolean {
    return this.components.has(componentName);
  }

  getComponent<T extends Component>(componentName: string): T | undefined {
    return this.components.get(componentName) as T;
  }
}

export class World {
  entities: Entity[];
  systems: System[];
  events: Event[];

  constructor() {
    this.entities = [];
    this.systems = [];
    this.events = [];
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
    this.notifySystemsEntityAdded(entity);
  }

  removeEntity(entity: Entity) {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
      this.notifySystemsEntityRemoved(entity);
    }
  }

  addSystem(system: System) {
    this.systems.push(system);
    this.notifySystemEntitiesAdded(system);
  }

  removeSystem(system: System) {
    const index = this.systems.indexOf(system);
    if (index !== -1) {
      this.systems.splice(index, 1);
    }
  }

  update(dt: number) {
    for (const system of this.systems) {
      system.update(this.entities, dt);
    }
  }

  queryEntities(components: string[]): Entity[] {
    return this.entities.filter((entity) =>
      components.every((component) => entity.hasComponent(component))
    );
  }

  private notifySystemsEntityAdded(entity: Entity) {
    for (const system of this.systems) {
      if (system.onEntityAdded) {
        system.onEntityAdded(entity);
      }
    }
  }

  private notifySystemsEntityRemoved(entity: Entity) {
    for (const system of this.systems) {
      if (system.onEntityRemoved) {
        system.onEntityRemoved(entity);
      }
    }
  }

  private notifySystemEntitiesAdded(system: System) {
    for (const entity of this.entities) {
      if (system.onEntityAdded) {
        system.onEntityAdded(entity);
      }
    }
  }
}

export default class ECS {
  world: World;
  messages: Record<string, any[]>;

  constructor() {
    this.world = new World();
    this.messages = {};
  }

  run() {
    console.log('ECS is running');

    setInterval(() => {
      const dt = 1; // Example: Delta time for the frame

      this.world.update(dt);
    }, 1000 / 60); // Example: Run the game loop at 60 frames per second
  }

  sendMessage(type: string, data: any) {
    if (!this.messages[type]) {
      this.messages[type] = [];
    }

    this.messages[type].push(data);
  }

  getMessage(type: string): any[] {
    return this.messages[type] || [];
  }
}
