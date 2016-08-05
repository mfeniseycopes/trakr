#
# USERS
#
User.create(
  email: "jackbauer@email.com",
  password: "starwars",
  first_name: "Jack",
  last_name: "Bauer",
  location: "Santa Monica, CA",
  avatar: File.open("public/seed_images/Jack_Bauer.jpg"),
  bio: "I can’t tell you what to do. I’ve been wrestling with this one my whole life. I see fifteen people held hostage on a bus, and everything else goes out the window. I will do whatever it takes to save them – and I mean whatever it takes."
)

User.create(
  email: "tonyalmeida@email.com",
  password: "starwars",
  first_name: "Tony",
  last_name: "Almeida",
  location: "Chicago, IL",
  avatar: File.open("public/seed_images/TonyOnDay1.jpg"),
  bio: "But if I could just do this, if I could save...one life on the outside, then maybe I'd feel worthy of my wife's love again."
)

User.create(
  email: "davidpalmer@email.com",
  password: "starwars",
  first_name: "David",
  last_name: "Palmer",
  location: "Philadelphia, PA",
  avatar: File.open("public/seed_images/PalmerS5.jpg"),
  bio: "Your brother was one of the greatest men to ever occupy the office. His loss—to all of us—can't be expressed in words."
)

User.create(
  email: "ninamyers@email.com",
  password: "starwars",
  first_name: "Nina",
  last_name: "Myers",
  location: "Los Angeles, CA",
  avatar: File.open("public/seed_images/Ninamyers.jpg"),
  bio: "You're worse than a traitor, Nina. You don't even have a cause; you don't believe in anything."
)

User.create(
  email: "kimbauer@email.com",
  password: "starwars",
  first_name: "Kim",
  last_name: "Bauer",
  location: "Santa Monica, CA",
  avatar: File.open("public/seed_images/KimBauerS7.jpg"),
  bio: "You are the love of my life and I am so proud of you."
)

User.create(
  email: "sherrypalmer@email.com",
  password: "starwars",
  first_name: "Sherry",
  last_name: "Palmer",
  location: "Baltimore, MD",
  avatar: File.open("public/seed_images/Penny_JJ.jpg"),
  bio: "You're not a member of my staff. You're not a government employee. And you're not my wife."
)

User.create(
  email: "victordrazen@email.com",
  password: "starwars",
  first_name: "Victor",
  last_name: "Drazen",
  location: "Belgrade, Serbia",
  avatar: File.open("public/seed_images/Drazenday1.jpg"),
  bio: "You were a monster long before you ever heard of me."
)

#
# ACTIVITY_TYPES
#
ActivityType.create(name: "Ride")
ActivityType.create(name: "Run")
ActivityType.create(name: "Swim")
ActivityType.create(name: "Gun Battle")
ActivityType.create(name: "BJJ")
ActivityType.create(name: "Muay Thai")
