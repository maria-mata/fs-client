const baseURL = 'https://enigmatic-citadel-64393.herokuapp.com/contacts'

$(document).ready(function() {
  $.get(baseURL)
    .then(appendContacts)

  $('#add').click(function() {
    $('#new-contact').show()
  })

  $('#new-contact').submit(sendPost)

})

function appendContacts(data) {
  $('#contacts > li.collection-item').remove()
  for (var i = 0; i < data.length; i++) {
    let record = `<li class="collection-item">${data[i].first_name} ${data[i].last_name}</li>`
    let id = data[i].id
    $('#contacts').append($(record).click(function() {
      $('#contacts > li').removeClass('active')
      $(this).addClass('active')
      $.get(`${baseURL}/${id}`)
        .then(appendDetail)
    }))
  }
}

function appendDetail(data) {
  $('#detail > p').remove()
  let content = `<p>${data[0].first_name} ${data[0].last_name}</p>
                <p>${formatPhone(data[0].phone)}</p>
                <p>${data[0].email}</p>`
  $('#detail').append(content)
}

function formatPhone(string) {
  let array = string.split('')
  array.splice(0, 0, "(")
  array.splice(4, 0, ") ")
  array.splice(8, 0, "-")
  return array.join("")
}


function sendPost(event) {
  event.preventDefault()
  let post = {
    first_name: $('first_name').val(),
    last_name: $('last_name').val(),
    phone: $('phone').val(),
    email: $('email').val()
  }

  $.post(baseURL, post)
    .then(appendContacts)
};
