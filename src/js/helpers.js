// THIS FILE IS FOR FUNCTION THAT WE ARE REUSING
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async url => {
  try {
    const fetchPro = fetch(url);

    // Promsie so if the request takes too long it'll throw an error so it is a race between the fetch and the timeout
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    // Throws a new error
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
