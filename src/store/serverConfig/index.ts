import { createEffect, createStore, createEvent } from 'effector';
import { FetchServerConfigDone, ServerConfig } from '@store/serverConfig/types';
import { logline, log } from '@utils/debug';

export const $serverConfig = createStore<ServerConfig | null>(null);

export const fetchServerConfig = createEvent<void>();
export const fetchServerConfigFx = createEffect<void, FetchServerConfigDone>();

// debug

//$serverConfig.watch((serverConfig) => log('$serverConfig', serverConfig));
