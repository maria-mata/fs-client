$(document).ready(function() {
  const baseURL = 'https://enigmatic-citadel-64393.herokuapp.com/contacts'

  $.get(baseURL)
    .then(appendContacts)

})


function appendContacts(array) {
  for (var i = 0; i < array.length; i++) {
    let record = `<li class="collection-item">${array[i].first_name} ${array[i].last_name}</li>`
    $('#contacts').append(record)
  }
}
