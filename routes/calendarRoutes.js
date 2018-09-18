const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin.js");
const _ = require("lodash");
const gcal = require("google-calendar");
const refresh = require("passport-oauth2-refresh");
const q = require("q");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Task = mongoose.model("tasks");
const axios = require("axios");
const getAccessToken = require("../utils/getAccessToken");

module.exports = app => {
  app.get("/api/getTasks", (req, res) => {
    //console.log(req.user.googleId);
    Task.find({ googleId: req.user.googleId }, function(req, tasks) {
      //console.log(req);
      //console.log(tasks);
      res.send(tasks);
    });
  });

  app.get("/api/getTask/:id", (req, res) => {
    Task.findOne({ _id: req.params.id }, function(err, task) {
      res.send(task);
    });
  });

  app.post("/api/deleteTask", requireLogin, (req, res) => {
    const { taskid } = req.body;
    console.log(taskid);
    try {
      Task.find({ _id: taskid })
        .then(task => {
          Task.deleteOne({ _id: taskid }).then(task => res.send(task));
        })
        .catch(err => {
          res.send({ Reason: "Task not found", err });
        });
    } catch (err) {
      res.send({ Reason: "Something went wrong", err });
    }
  });

  app.post("/api/addTask", requireLogin, async (req, res) => {
    //console.log(req.body);
    const { title, description, start, end } = req.body;

    //create new task
    const task = new Task({
      googleId: req.user.googleId,
      title: title,
      description: description,
      start: start,
      end: end
    })
      .save()
      .then(task => res.send(task));
  });

  app.post("/api/completeTask", requireLogin, async (req, res) => {
    //console.log("TASKID: " + getId());

    var removeTask = async accessToken => {
      var google_calendar = new gcal.GoogleCalendar(accessToken);

      try {
        var calendarid = await getCalendarId(google_calendar);
      } catch (calendarid) {
        console.log("No calendar events found");
      }
      try {
        for (const item of calendarid) {
          console.log("item" + item);
          var err = await removeEntry(google_calendar, item);
        }
      } catch (err) {
        console.log("Could not remove entry " + err);
      }
      try {
        var task = await updateTask(getId());
      } catch (task) {
        console.log("Error: " + task);
      }
      res.send(task);
    };

    getAccessToken(req.user.googleId).then(async accessToken => {
      //console.log(accessToken);
      removeTask(accessToken);
    });

    function removeEntry(google_calendar, calendarid) {
      var deferred = q.defer();
      //console.log(calendarid);
      google_calendar.events.delete("primary", calendarid, function(
        err,
        event
      ) {
        if (err) {
          deferred.reject(err);
          return;
        }
        console.log("REMOVETASKDONE");
        deferred.resolve(event);
      });

      return deferred.promise;
    }

    function getId() {
      return req.body.taskid;
    }

    function getCalendarId(google_calendar) {
      var deferred = q.defer();
      google_calendar.events.list("primary", function(err, event) {
        if (err) {
          //console.log(err);
          deferred.reject(err);
        }
        var calendarid = _.chain(event.items)
          .map(item => {
            var itemsum = item.summary.split("#");
            //PREFIX check
            //console.log(itemsum[0]);

            if (itemsum[0] === "innoproj") {
              //console.log(item);
              if (item.description === getId()) {
                return item.id;
              }
            }
          })
          .compact()
          .value();

        if (calendarid.length === 0) {
          deferred.reject();
          return;
          console.log("CALENDARIDNOTFOUND");
        }
        console.log("CALENDARIDFOUND");
        deferred.resolve(calendarid);
      });
      return deferred.promise;
    }

    function updateTask(taskid) {
      console.log("UPDATETASK");
      var deferred = q.defer();
      Task.findOneAndUpdate(
        { _id: taskid },
        { end: new Date(), complete: true },
        function(err, task) {
          if (err) {
            console.log("ERROR: " + err);
            deferred.reject(err);
            return;
          }
          Task.findOne({ _id: taskid }).then(task => {
            deferred.resolve(task);
          });
        }
      );
      return deferred.promise;
    }
  });

  app.post("/api/addReminder", requireLogin, async (req, res) => {
    // Iterate through reminders array and setup reminder events in array
    var reminders = _.map(req.body, reminder => {
      //console.log(reminder);
      return {
        summary: "innoproj#" + reminder.title,
        description: reminder.taskid,
        start: { dateTime: new Date(reminder.start) },
        end: {
          dateTime: new Date(
            new Date(reminder.start).getTime() + 60 * 60 * 1000
          )
        },
        reminders: {
          useDefault: false,
          overrides: [{ method: reminder.method, minutes: reminder.minutes }]
        }
      };
    });
    // function to get the reminders array from inside other functions
    function getRemindersArray() {
      return reminders;
    }

    // promise function to resolve when reminder has been successfully added
    // to google calendar
    function addReminderToCalendar(google_calendar, item) {
      var deferred = q.defer();
      google_calendar.events.insert("primary", item, function(err, event) {
        if (err) {
          //console.log(err);
          deferred.reject(err);
        }
        //console.log(event);
        deferred.resolve(event);
      });
      return deferred.promise;
    }

    // main function to add all events from reminders array
    var setReminders = async accessToken => {
      var google_calendar = new gcal.GoogleCalendar(accessToken);
      var reminders = getRemindersArray();
      for (const item of reminders) {
        var response = await addReminderToCalendar(google_calendar, item);
      }
      res.send(response);
    };

    // get updated accesstoken if needed and launch the main function
    getAccessToken(req.user.googleId).then(accessToken => {
      //console.log(accessToken);
      setReminders(accessToken);
    });

    //console.log(getRemindersArray());
  });

  // get all events from primary calendar with innoproj# prefix
  app.get("/api/getReminders/:id", (req, res) => {
    //console.log(req.user);
    var getGoogleEvents = accessToken => {
      //instantiate google calendar instance
      var google_calendar = new gcal.GoogleCalendar(accessToken);

      google_calendar.events.list("primary", function(err, calendarList) {
        //console.log(calendarList);
        //console.log(calendarList.items);

        var list = _.chain(calendarList.items)
          .map(item => {
            var itemsum = item.summary.split("#");
            //PREFIX check
            //console.log(itemsum[0]);

            if (itemsum[0] === "innoproj") {
              //console.log(item.description);
              if (item.description === req.params.id) {
                var title = item.summary.split("#");
                return {
                  taskid: item.description,
                  title: title[1],
                  start: item.start,
                  method: item.reminders.overrides[0].method,
                  beforeminutes: item.reminders.overrides[0].minutes
                };
              }
            }
          })
          .compact()
          .value();
        //console.log(list);
        res.send(list);
      });
    };

    //retrieve current access token
    //getAccessToken imported from ../utils/
    getAccessToken(req.user.googleId).then(accessToken => {
      //console.log(accessToken);
      getGoogleEvents(accessToken);
    });
    //console.log(token);
  });
};
