export function moveTowards(person: any, destinationPosition: any, speed: number) {
	let distanceX = destinationPosition.x - person.position.x;
	let distanceY = destinationPosition.y - person.position.y;

	let distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

	if (distance <= speed) {
		person.position.x = destinationPosition.x;
		person.position.y = destinationPosition.y;
	} else {
		person.position.x += (distanceX / distance) * speed;
		person.position.y += (distanceY / distance) * speed;

		distanceX = destinationPosition.x - person.position.x;
		distanceY = destinationPosition.y - person.position.y;

		distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
	}

	return distance;
}