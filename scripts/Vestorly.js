/**
 * This is a class that helps us do the queries to Vestorly's API.
 * @author Alvin Lin (alvin.lin@stuypulse.com)
 */

function bind(object, method) {
  return function() {
    return method.apply(object, arguments);
  };
}

function Vestorly() {}

Vestorly.USERNAME = encodeURIComponent('hackathon04@gmail.com');

Vestorly.PASSWORD = encodeURIComponent('T4ZXmdYv');

Vestorly.SESSION_KEY = null;

Vestorly.CREDENTIALS = {
  username: Vestorly.USERNAME,
  password: Vestorly.PASSWORD
};

Vestorly.BASE_URL = 'https://staging.vestorly.com/api/v2';

Vestorly.getSessionKey = function(callback) {
  $.post(Vestorly.BASE_URL +
         '/sessions?username=hackathon04%40gmail.com&password=T4ZXmdYv',
         {},
         function(response, status) {
    Vestorly.SESSION_KEY = response['vestorly-auth'];
    callback();
  });
};

Vestorly.getArticle = function(number, query, callback) {
  if (!Vestorly.SESSION_KEY) {
    throw new Error('Session key was non initialized!');
  }
  $.get(Vestorly.BASE_URL + '/articles',
        {
          vestorly_auth: Vestorly.SESSION_KEY,
          limit: number,
          text_query: query,

        },
        function(response, status) {
    callback(response);
  });
};

Vestorly.getAllArticle = function(number, query, callback) {
  if (!Vestorly.SESSION_KEY) {
    throw new Error('Session key was non initialized!');
  }
  $.get(Vestorly.BASE_URL + '/articles',
        {
          vestorly_auth: Vestorly.SESSION_KEY,
          limit: number,
          text_query: query,
          sort_direction:"asc",
          sort_by:"created_at"
          
        },
        function(response, status) {
    callback(response);
  });
};



