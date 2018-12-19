import axios from 'axios';
import { apiUrl } from 'config';
import { DsService } from 'service';

const axiosApiInstance = axios.create({
  baseURL: apiUrl,
});

export default function clientMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, dsPromise, types, onSuccess, onFailure, ...rest } = action;

    if (!promise) {
      if (!dsPromise) {
        return next(action);
      }
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    next({
      ...rest,
      type: REQUEST,
    });

    let actionPromise;
    if (promise) {
      actionPromise = promise(axiosApiInstance);
    } else {
      actionPromise = dsPromise(DsService);
    }
    actionPromise
      .then(payload => {
        if (onSuccess instanceof Function) {
          onSuccess(payload, rest);
        }
        let nextData;
        if (payload && payload.data) {
          nextData = { ...rest, ...payload, type: SUCCESS };
        } else {
          nextData = { ...rest, data: payload, type: SUCCESS };
        }
        next(nextData);
      })
      .catch(error => {
        console.log(error);
        if (onFailure instanceof Function) {
          onFailure(error, rest);
        }

        next({
          ...rest,
          error,
          type: FAILURE,
        });
      });

    return actionPromise;
  };
}
