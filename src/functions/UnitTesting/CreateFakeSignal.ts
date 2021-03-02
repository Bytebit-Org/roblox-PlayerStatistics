import { AnyArgs } from "@rbxts/signals-tooling";
import { RunService } from "@rbxts/services";

type SignalConnection = {
<<<<<<< HEAD
	Connected: boolean;
=======
	readonly Connected: boolean;
	Disconnect(): void;
>>>>>>> 500ee1497247cc90d8105f5ec617b146e142272e
};

export const createFakeSignal = <T extends AnyArgs>() => {
	const handlers = new Array<T>();
<<<<<<< HEAD

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
=======
	const connections = new Array<SignalConnection>();

	const connectFunction = function (handlerFunction: T) {
		handlers.push(handlerFunction);

		const signalConnection = {
			Connected: true,
			Disconnect: function (this: SignalConnection) {
				if (!signalConnection.Connected) {
					return;
				}

				let removeIndex = handlers.size() + 1;

				for (let i = 0; i < handlers.size(); i++) {
					if (handlers[i] === handlerFunction) {
						removeIndex = i;
						break;
					}
				}
				handlers.unorderedRemove(removeIndex);

				for (let i = 0; i < connections.size(); i++) {
					if (connections[i] === signalConnection) {
						removeIndex = i;
						break;
					}
				}
				connections.unorderedRemove(removeIndex);

				signalConnection.Connected = false;
			},
		};

		connections.push(signalConnection);

		return signalConnection;
	};

	const destroyFunction = function () {
		const tempConnections = [...connections];
		for (let i = 0; i < tempConnections.size(); i++) {
			tempConnections[i].Disconnect();
		}
	};

	const fireFunction = function (...args: Parameters<T>) {
		const tempHandlers = [...handlers];
		for (let i = 0; i < tempHandlers.size(); i++) {
			tempHandlers[i](...args);
		}
	};

	const waitFunction = function () {
>>>>>>> 500ee1497247cc90d8105f5ec617b146e142272e
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
<<<<<<< HEAD
		connect: connectFunction,
		Connect: connectFunction,
		wait: waitFunction,
		Wait: waitFunction,

		fire: fireFunction,
=======
		connect: function (this: unknown, ...args: Parameters<typeof connectFunction>) {
			return connectFunction(...args);
		},
		Connect: function (this: unknown, ...args: Parameters<typeof connectFunction>) {
			return connectFunction(...args);
		},

		destroy: destroyFunction,
		Destroy: destroyFunction,

		wait: function (this: unknown, ...args: Parameters<typeof waitFunction>) {
			return waitFunction(...args);
		},
		Wait: function (this: unknown, ...args: Parameters<typeof waitFunction>) {
			return waitFunction(...args);
		},

		fire: function (this: unknown, ...args: Parameters<typeof fireFunction>) {
			return fireFunction(...args);
		},
>>>>>>> 500ee1497247cc90d8105f5ec617b146e142272e
	};
};
