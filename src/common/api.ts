import { HttpClientBuilder, HttpClientRetryStrategy } from 'httpclient.js';
import env from '../config/env.json';

const retry = HttpClientRetryStrategy.create().attempt(3).interval(1000).useExponentialStrategy();
export const api = HttpClientBuilder.create(env.baseUrl).useRetryStrategy(retry);
