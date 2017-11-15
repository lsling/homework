var householdMembers = [];

function elementsByName(name) {
  return document.getElementsByName(name)[0];
}

function elementsByClass(className) {
  return document.getElementsByClassName(className)[0];
}

var form = document.forms[0];
form.addEventListener("submit", function(event){
  householdList(event)
  JSON.stringify(householdMembers);
  alert('Your form was successfully submitted')
});

var addButton = elementsByClass("add");
addButton.addEventListener("click", addMember, true);

var memberAge = elementsByName("age");
var memberRelationship = elementsByName("rel");
var isSmoker = elementsByName("smoker");
var household = elementsByClass("household");

function addMember(event) {
  event.preventDefault();

  var valid = true;
  var age = parseInt(memberAge.value, 10);
  var relationship = memberRelationship.value;
  var smoker = isSmoker.checked;
  var ageInvalid = document.getElementById("ageInvalid");
  var relationshipInvalid = document.getElementById("relationshipInvalid");

  if (!Number.isInteger(age) || age < 0) {
    alert ("Age is not valid.")
    valid = false;
  } else if (ageInvalid != undefined) {
      form.removeChild(ageInvalid);
  }

  if (relationship.length == 0) {
    if (relationshipInvalid == undefined) {
      alert ("Relationship is required.")
      valid = false;
    }
  } else if (relationshipInvalid != undefined) {
      form.removeChild(relationshipInvalid);
  }

  if (valid == true) {
    var newMember = {age: age, relationship: relationship, smoker: smoker};
    householdMembers.push(newMember);
    memberAge.value = "";
    memberRelationship.selectedIndex = 0;
    isSmoker.checked = false;
    householdList();
    return true;
  } else {
    return false;
  }
}

function remove(member) {
  var removed = householdMembers.splice(member, 1);
  window.event.preventDefault();
  householdList();
  return false;
}

function householdList() {
  household.innerHTML = "";

  for (var i = 0; i < householdMembers.length; i++) {
    var member = householdMembers[i];
    var text = "Relationship: " + member.relationship +
    "<br /> Age: " + member.age +
    "<br /> Smoker?: " + member.smoker +
    "<br /> <a href=\"\" onclick=\"remove(" + member + ");\">Remove</a>";
    var item = document.createElement('it');
    item.id = "member_" + member;
    item.innerHTML = text;
    household.appendChild(item);
  }
}
