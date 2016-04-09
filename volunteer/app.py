from eventbrite import Eventbrite
from firebase import firebase


eventbrite = Eventbrite('7C3O54QSC636WO5OJVJK')

def test():
    user = eventbrite.get_user()
    name = user['name']
    print(name)

def create_event():
    first_event = {"event.name.html":"my_first_event","event.start.utc":"2017-01-31T13:00:00z",
            "event.start.timezone":"America/Los_Angeles","event.end.utc":"2017-01-31T14:00:00z",
            "event.end.timezone":"America/Los_Angeles","event.currency":"USD"
    }
    event = eventbrite.post_event(first_event)
    print(event)

create_event()
