# peacock-cal

### endpoint to take params and return and email with .ics file
http://localhost:3000/v1/send
or live
https://peacock-cal.herokuapp.com/v1/send

#### Params

- `title`:  Event title, Email subject
- `start`: DateTime (utc iso 8601)
- `end`: DateTime (utc iso 8601)
- `url`: link to event
- `attendees`: (email address array)


http://localhost:3000/v1/ics
or live
https://peacock-cal.herokuapp.com/v1/ics

#### Params

- `title`:  Event title, Email subject
- `start`: DateTime (utc iso 8601)
- `end`: DateTime (utc iso 8601)
- `url`: link to event (location)

