// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

//const needle = require("needle");
//import { strict as assert } from "assert";
import dotenv from "dotenv";
import axios from "axios";
import { stripHtml } from "string-strip-html";
import { tall } from "tall";

//const axios = require("axios").default;
//const str_html = require("string-strip-html");
//
//const TwitterApi = require("twitter-api-v2").TwitterApi;
import { TwitterApi } from "twitter-api-v2";

dotenv.config();
// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

/* const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getRequest() {
  // Edit query parameters below
  // specify a search query, and any additional fields that are required
  // by default, only the Tweet ID and text fields are returned
  const params = {
    query: "from:CityPowerJhb is:verified Outage at",
    "tweet.fields": "author_id",
  };

  const res = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

(async () => {
  try {
    // Make request
    const response = await getRequest();
    console.log(response);
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})(); */

const rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules";
const streamURL = "https://api.twitter.com/2/tweets/search/stream";

// this sets up two rules - the value is the search terms to match on, and the tag is an identifier that
// will be applied to the Tweets return to show which rule they matched
// with a standard project with Basic Access, you can add up to 25 concurrent rules to your stream, and
// each rule can be up to 512 characters long

// Edit rules as desired below
const rules = [
  {
    value: "from:CityPowerJhb Outage at",
    tag: "dog pictures",
  },
];
/*
async function getAllRules() {
  const response = await needle("get", rulesURL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body);
  }

  return response.body;
}

async function deleteAllRules(rules) {
  if (!Array.isArray(rules.data)) {
    return null;
  }

  const ids = rules.data.map((rule) => rule.id);

  const data = {
    delete: {
      ids: ids,
    },
  };

  const response = await needle("post", rulesURL, data, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body);
  }

  return response.body;
}

async function setRules() {
  const data = {
    add: rules,
  };

  const response = await needle("post", rulesURL, data, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (response.statusCode !== 201) {
    throw new Error(response.body);
  }

  return response.body;
}

function streamConnect() {
  const stream = needle.get(streamURL, {
    headers: {
      "User-Agent": "v2FilterStreamJS",
      Authorization: `Bearer ${token}`,
    },
    timeout: 20000,
  });

  stream
    .on("data", (data) => {
      try {
        const json = JSON.parse(data);
        console.log(json);
      } catch (e) {
        // Keep alive signal received. Do nothing.
      }
    })
    .on("error", (error) => {
      if (error.code === "ETIMEDOUT") {
        stream.emit("timeout");
      }
    });

  return stream;
}

(async () => {
  let currentRules;

  try {
    // Gets the complete list of rules currently applied to the stream
    currentRules = await getAllRules();

    // Delete all rules. Comment the line below if you want to keep your existing rules.
    await deleteAllRules(currentRules);

    // Add rules to the stream. Comment the line below if you don't want to add new rules.
    await setRules();
  } catch (e) {
    console.error(e);
    process.exit(-1);
  }

  // Listen to the stream.
  // This reconnection logic will attempt to reconnect when a disconnection is detected.
  // To avoid rate limits, this logic implements exponential backoff, so the wait time
  // will increase if the client cannot reconnect to the stream.

  const filteredStream = streamConnect();
  let timeout = 0;
  console.log("bearer token", token);
  filteredStream.on("timeout", () => {
    // Reconnect on error
    console.warn("A connection error occurred. Reconnecting…");
    setTimeout(() => {
      timeout++;
      streamConnect();
    }, 2 ** timeout);
    streamConnect();
  });
})();*/

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'

async function time_line() {
  //const TwitterApi = require("twitter-api-v2");

  const client = new TwitterApi(token);

  /*
  //Get the user ID for CityPower
  const foundUsers = await client.v1.searchUsers("CityPowerJhb");

  // use an async for-of to iterate over the multiple result pages!
  for await (const user of foundUsers) {
    console.log(
      "User matching search:",
      user.screen_name,
      user.id,
      user.verified
    );
  }*/
  /*
 //Based on the userId get the tweets in a paginated form....
  const jackTimeline = await client.v2.userTimeline("337882328", {
    expansions: [
      "attachments.media_keys",
      "attachments.poll_ids",
      "referenced_tweets.id",
    ],
    "media.fields": ["url"],
  });
  // jackTimeline.includes contains a TwitterV2IncludesHelper instance
  for await (const tweet of jackTimeline) {
    const medias = jackTimeline.includes.medias(tweet);
    const poll = jackTimeline.includes.poll(tweet);

    if (medias.length) {
      console.log(
        "This tweet contains medias! URLs:",
        medias.map((m) => m.url)
      );
    }
    if (poll) {
      console.log(
        "This tweet contains a poll! Options:",
        poll.options.map((opt) => opt.label)
      );
    }
  } */

  //tweets follow a specific pattern,
  //Planned Outage at Oranje Str 6.6kV SWS updated at 20:21. https://1.fsk.pw/5mxx
  //Planned Outage at Oranje Str 6.6kV SWS restored at 20:22. https://1.fsk.pw/5mxx
  //Planned Outage at Oranje Str 6.6kV SWS. Start time 19:23. Planned Finish 19:26. https://1.fsk.pw/5mxx
  //Technicians are onsite attending to an outage at Moffat 88/11kV SS. Start time 18:00. https://1.fsk.pw/myf3
  const tweetsOfJack = await client.v2.userTimeline("337882328", {
    exclude: "replies",
    start_time: new Date(2022, 1, 22, 20, 0, 0, 0).toISOString(),
    "tweet.fields": "entities",
  });

  for await (const tweet of tweetsOfJack) {
    var tweet_res = tweet.text;
    if (tweet_res.search("Outage") === 0) {
      //then find the location

      //console.log("Outage pos: ", tweet_res.search("Outage"));
      if (tweet_res.search("at")) {
        const at_pos = tweet_res.search("at");
        //console.log("at position", at_pos);
        const pow_pos = tweet_res.search(/(\d{1,}\W?\d{2,}?\s?)\s?\w*/);
        //console.log("power position", pow_pos);
        //const pow_pos_ = tweet_res.search("6.6kV");
        //const pow_pos_f = pow_pos ? pow_pos : pow_pos_;
        const loc = tweet_res.substring(at_pos + 3, pow_pos - 1);
        console.log("Locations: ", loc);
        //console.log("Entities: ", tweet.entities);
        tweet.entities.urls.forEach(async (data) => {
          console.log("How many times is this running?  ");
          if (data.unwound_url) {
            console.log("Unwound URL: ", data.unwound_url);
            axios
              .get(data.unwound_url)
              .then(function (response) {
                // handle success
                console.log("Stripped HTML ", stripHtml(response.data).result);
                //from here we want the Reference number, and the Status...
                //Reference number will be used for the Firebase entry and Status will be restored time...
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
              .then(function () {
                // always executed
              });
          } else {
            console.log("Error in unwound URL: None present ");
            //fall back to tweet to see if anything there exists

            try {
              tall(data.url, { timeout: 200 })
                .then((unshortenedUrl) =>
                  console.log("Tall url", unshortenedUrl)
                )
                .catch((err) => console.error("AAAW 👻", err));
            } catch (err) {
              console.error("AAAW 👻", err);
            }
          }
        });
      }
    } else {
      console.log("No tweets found...");
    }
  }
}

time_line();
