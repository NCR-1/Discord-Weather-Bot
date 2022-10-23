import clientPromise from '../../mongodb.js';

async function postData() {
	try {
		const client = await clientPromise;
		const mongo = client.db('discordUsers');
		const collection = mongo.collection('users');

		const newUser = {
			username: '',
			location: '',
			timeOfNotification: '',
			repeatNotification: true,
		};

		collection.insertOne(newUser);
	} catch (err) {
		console.log(err);
	}
}

export default postData;
