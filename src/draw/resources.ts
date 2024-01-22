class Resources {
	toLoad: {[key: string]: string};
	images: {[key: string]: {image: HTMLImageElement, isLoaded: boolean}};

	constructor() {
		this.toLoad = {
			sky: 'assets/sky.png',
			ground: 'assets/ground.png',
			hero: 'assets/hero.png',
			shadows: 'assets/shadows.png',
			tree: 'assets/tree.png',
			spritesheet: 'assets/spritesheet.png',
		};
		this.images = {};

		// load every single image
		Object.keys(this.toLoad).forEach((key) => {
			const img = new Image();
			img.src = this.toLoad[key];
			this.images[key] = {image: img, isLoaded: false};
			img.onload = () => {
				this.images[key].isLoaded = true;
			};
		});
	}
}

const resources = new Resources();
export default resources;
