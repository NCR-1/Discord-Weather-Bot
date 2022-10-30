import clientPromise from '../../mongodb.js';

// Connect to the database and remove data that matches parameters
async function deleteData(username, location, timeOfNotification) {
	try {
		const client = await clientPromise;
		const mongo = client.db('discordUsers');
		const collection = mongo.collection('users');
		await collection.deleteOne({
			username: username,
			location: location,
			timeOfNotification: timeOfNotification,
		});
	} catch (err) {
		console.log(err);
	}
}

export default deleteData;
