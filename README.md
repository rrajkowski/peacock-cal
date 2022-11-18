# peacock-cal

### endpoint to take params and return and email with .ics file
Local:
http://localhost:3000/v1/ics
Prod:
https://peacock-cal.herokuapp.com/v1/ics

#### Params

- `title (string)`:  Event title, Email subject
- `description (string)`:  Event description
- `start (datetime)`: UTC ISO 8601
- `end (datetime)`: UTC ISO 8601
- `alarm (number)`: Defaults to 15, in minutes
- `url (string)`: Link to event
- `location (string)`: Event address
- `attendees (array)`: Email address


http://localhost:3000/v1/send
or live
https://peacock-cal.herokuapp.com/v1/send

#### Params

- `tbd`: tbd


#### Start app

`yarn dev` => local
`yarn start` => prod


#### Publish to Heroku
`git push heroku main`

