import axios from 'axios';
import links from './links';
import ObjectHelper from './objectHelpers';

function getLocation(location) {
  return links.baseApi + location;
}

function status(response) {
   console.log(response)
  if (response.status === 204) {
    return Promise.resolve(null);
  }
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject({
      statusText: response.statusText,
      status: response.status,
      responseJson: response.data,
    });
  }
}

function errorCall(res, errorCallback) {
  console.log("res", JSON.stringify(res));
  if (res.response != undefined) {
    errorCallback({
      error: res.response.data?.errors,
      status: res.response.status,
    });
  } else {
    errorCallback({
      error: { Message: 'Facing some issue, please try after sometime' },
      status: 408,
    });
  }
}

const instance = axios.create();
instance.defaults.timeout = 50000;

let Api = {
  doGet(location, body, successCallback, errorCallback, token) {
    let url = getLocation(location) + ObjectHelper.getQueryString(body);
    let headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    console.log(url, body, 'get api >>>>>>>>>>');
    instance
      .get(url, {
        headers,
      })
      .then(status)
      .then(successCallback)
      .catch(res => errorCall(res, errorCallback));
  },
  doGetIt(location, successCallback, errorCallback, token) {
    let url = getLocation(location);
    let headers = {'Authorization': `Token ${token}`};
    instance
      .get(url, {
        headers,
      })
      .then(status)
      .then(successCallback)
      .catch(res => errorCall(res, errorCallback));
  },
  doPost(location, body, successCallback, errorCallback, token) {
    let url = getLocation(location);
    let headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    console.log(url, body, token, 'post api <<<<<<<<<');
    instance
      .post(url, JSON.stringify(body), {
        headers,
        withCredentials: true,
      })
      .then(status)
      .then(successCallback)
      .catch(res => errorCall(res, errorCallback));
  },
  doPatch(location, body, successCallback, errorCallback, token) {
    let url = getLocation(location);
    let headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    console.log(url, body, token, 'post api <<<<<<<<<');
    instance
      .patch(url, JSON.stringify(body), {
        headers,
        withCredentials: true,
      })
      .then(status)
      .then(successCallback)
      .catch(res => errorCall(res, errorCallback));
  },
  doDel(location, body, successCallback, errorCallback, token) {
    let url = getLocation(location);
    let headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    console.log(url, body, token, 'Here is the token');
    instance
      .delete(url, {
        headers,
        withCredentials: true,
      })
      .then(status)
      .then(successCallback)
      .catch(res => errorCall(res, errorCallback));
  },

  doPut(location, body, successCallback, errorCallback, token) {
    let url = getLocation(location);

    let headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    console.log(url, body, token);

    instance
      .put(url, JSON.stringify(body), {
        headers,
        withCredentials: true,
      })
      .then(status)
      .then(successCallback)
      .catch(res => errorCall(res, errorCallback));
  },
};
export default Api;
