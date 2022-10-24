import config from "config";
import { ConnectOptions, connect } from "mongoose";

const connectDB = async () => {
	try {
		const mongoURI: string = config.get("mongoURI");
		const options: ConnectOptions = {
			autoIndex: true,
			autoCreate: true,
		};
		await connect(mongoURI, options);
		console.log("MongoDB Connected...");
	} catch (error) {
		let message;
		if (error instanceof Error) message = error.message;
		else message = String(error);

		console.error(message);
		// Exit process with failure
		process.exit(1);
	}
};

export default connectDB;
