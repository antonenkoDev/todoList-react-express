import config from "config";
import { ConnectionOptions, connect } from "mongoose";

const connectDB = async () => {
	try {
		const mongoURI: string = config.get("mongoURI");
		const options: ConnectionOptions = {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		};
		await connect(mongoURI, options);
		// tslint:disable-next-line:no-console
		console.log("MongoDB Connected...");
	} catch (err) {
		// tslint:disable-next-line:no-console
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

export default connectDB;
