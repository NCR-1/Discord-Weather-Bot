import clientPromise from '../../mongodb.js';

// Connect to the database and retrive all users
async function getData(userTag) {
	try {
		const client = await clientPromise;
		const mongo = client.db('discordUsers');
		const collection = mongo.collection('users');
		const data = await collection.find({ username: userTag }).toArray();

		return data;
	} catch (err) {
		console.log(err);
	}
}

export default getData;
