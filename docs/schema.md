# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
first_name      | string    | not null
last_name       | string    | not null
avatar          | attachment|
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
location        | string    |
bio             | text      |

## activities
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (users), indexed
type_id         | integer   | not null, foreign key (activity_types), indexed
title           | string    | not null
description     | text      |
date            | date      | not null
gpx             | attachment| not null
distance        | float     |
duration        | integer   |

## activitiy_types
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null, indexed, unique

## follows
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
follower_id     | integer   | not null, foreign key (users), indexed
followee_id     | integer   | not null, foreign key (users), indexed

## props
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
activity_id     | integer   | not null, foreign key (activities), indexed
prop_giver_id   | integer   | not null, foreign key (users), indexed

## comments
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
activity_id     | integer   | not null, foreign key (activities), indexed
commenter_id    | integer   | not null, foreign key (users), indexed
body            | text      |
