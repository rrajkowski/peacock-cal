# peacock-cal

### endpoint to take params and return and email with .ics file
http://localhost:3000/v1/send
or live
https://peacock-cal.herokuapp.com/v1/send

#### Params

- `title (string)`:  Event title, Email subject
- `start (datetime)`: UTC ISO 8601
- `end (datetime)`: UTC ISO 8601
- `url (string)`: link to event
- `body (string)`: Email body
- `location (string)`: Event Address
- `attendees (array)`: Email address


http://localhost:3000/v1/ics
or live
https://peacock-cal.herokuapp.com/v1/ics

#### Params

- `title`:  Event title, Email subject
- `start`: DateTime (utc iso 8601)
- `end`: DateTime (utc iso 8601)
- `url`: link to event (location)


#### Start app

`yarn dev` => local
`yarn start` => prod


#### Publish to Heroku
`git push heroku main`

