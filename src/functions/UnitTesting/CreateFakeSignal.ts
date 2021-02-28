import { AnyArgs } from "@rbxts/signals-tooling";
import { RunService } from "@rbxts/services";

type SignalConnection = {
	Connected: boolean;
};

export const createFakeSignal = <T extends AnyArgs>() => {
	const handlers = new Array<T>();

	const connectFunction = function (this: unknown, handlerFunction: T) {
		handlers.push(handlerFunction);

		const isConnected = false;

		const disconnectFunction = function (this: SignalConnection) {
			let removeIndex = handlers.size() + 1;

			for (let i = 0; i < handlers.size(); i++) {
				if (handlers[i] === handlerFunction) {
					removeIndex = i;
					break;
				}
			}

			handlers.remove(removeIndex);
		};

		return {
			Connected: isConnected,
			Disconnect: disconnectFunction,
		};
	};

	const fireFunction = function (this: unknown, ...args: Parameters<T>) {
		for (let i = 0; i < handlers.size(); i++) {
			handlers[i](...args);
		}
	};

	const waitFunction = function (this: unknown) {
		let stillWaiting = true;
		let resultingArgs!: Parameters<T>;
		const handlerFunction = (...args: Parameters<T>) => {
			resultingArgs = args;
			stillWaiting = false;
		};
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		connectFunction(handlerFunction as T);

		while (stillWaiting) {
			RunService.Heartbeat.Wait();
		}

		return resultingArgs;
	};

	return {
		connect: connectFunction,
		Connect: connectFunction,
		wait: waitFunction,
		Wait: waitFunction,

		fire: fireFunction,
	};
};
