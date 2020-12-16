var cat = {
  name: "Fluffy",
  activities: ["play", "eat cat food"],
  catFriends: [
    {
      name: "bar",
      activities: ["be grumpy", "eat bread omblet"],
      weight: 8,
      furcolor: "white",
    },
    {
      name: "foo",
      activities: ["sleep", "pre-sleep naps"],
      weight: 3,
    },
  ],
};

// Add height and weight to Fluffy
cat.height = 10;
cat.weight = 10;

// Fluffy name is spelled wrongly. Update it to Fluffyy
cat.name = "Fluffyy";
console.log(cat);

// List all the activities of Fluffyy’s catFriends.
for (let elm of cat.catFriends) {
  console.log(elm.activities);
}

// Print the catFriends names.
for (let elm of cat.catFriends) {
  console.log(elm.name);
}

// Print the total weight of catFriends
let totalWeight = 0;
for (let elm of cat.catFriends) {
  totalWeight += elm.weight;
}
console.log({ totalWeight });

// Print the total activities of all cats (op:6)
let totalAct = cat.activities.length;
for (let elm of cat.catFriends) {
  totalAct += elm.activities.length;
}
console.log({ totalAct });

// Add 2 more activities to bar & foo cats
for (let elm of cat.catFriends) {
  elm.activities.push("Destroy Plates");
  elm.activities.push("Watch Netflix");
}
console.log(cat);

// Update the fur color of bar
for (let elm of cat.catFriends) {
  if (elm.name === "bar") {
    elm.furcolor = "black";
  }
}
console.log(cat.catFriends);
