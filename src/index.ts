interface Component {
	name: string;
}

interface Entity {
	id: number;
	components: Map<string, Component>;
	addComponent(component: Component): void;
	removeComponent(componentName: string): void;
	hasComponent(componentName: string): boolean;
}

interface System {
	onEntityAdded?(entity: Entity): void;
	onEntityRemoved?(entity: Entity): void;
	dependencies: string[];
	update(entities: Entity[], dt: number): void;
}

export default class ECS {
	entities: Entity[];
	systems: System[];

	constructor() {
		this.entities = [];
		this.systems = [];
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

	queryEntities(components: string[]) {
		return this.entities.filter((entity) => components.every((component) => entity.hasComponent(component)));
	}

	notifySystemsEntityAdded(entity: Entity) {
		for (const system of this.systems) {
			if (system.onEntityAdded) {
				system.onEntityAdded(entity);
			}
		}
	}

	notifySystemsEntityRemoved(entity: Entity) {
		for (const system of this.systems) {
			if (system.onEntityRemoved) {
				system.onEntityRemoved(entity);
			}
		}
	}

	notifySystemEntitiesAdded(system: System) {
		for (const entity of this.entities) {
		}
	}
}