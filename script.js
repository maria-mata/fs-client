const baseURL = 'https://enigmatic-citadel-64393.herokuapp.com/contacts'
var putOrEditId = ''

$(document).ready(function() {
  $('.card').hide()

  $.get(baseURL)
    .then(appendContacts)

  $('.modal').modal();

  $('#new-contact').submit(sendPost)
  $('#edit-contact').submit(sendPut)
  $('#delete-contact').click(sendDelete)

});

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
  $('.card').show()
  $('#detail > p').remove()
  let content = `<p>${data[0].first_name} ${data[0].last_name}</p>
                <p>${formatPhone(data[0].phone)}</p>
                <p>${data[0].email}</p>`
  $('#detail').append(content)
  editModal(data[0].first_name, data[0].last_name, data[0].phone, data[0].email)
  putOrEditId = data[0].id
}

function editModal(first, last, phone, email) {
  $('#edit-first').val(first)
  $('#edit-last').val(last)
  $('#edit-phone').val(phone)
  $('#edit-email').val(email)
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
    first_name: $('#first_name').val(),
    last_name: $('#last_name').val(),
    phone: $('#phone').val(),
    email: $('#email').val()
  }
  $.post(baseURL, post)
    .then(data => {
      $.get(baseURL).then(appendContacts)
    })
  $('#first_name').val('')
  $('#last_name').val('')
  $('#phone').val('')
  $('#email').val('')
}


function sendPut(event) {
  event.preventDefault()
  $.ajax({
    url: `${baseURL}/${putOrEditId}`,
    method: 'PUT',
    data: {
      first_name: $('#edit-first').val(),
      last_name: $('#edit-last').val(),
      phone: $('#edit-phone').val(),
      email: $('#edit-email').val()
    },
    success: data => {
      $.get(baseURL).then(appendContacts)
    }
  })
  $('#edit-first').val('')
  $('#edit-last').val('')
  $('#edit-phone').val('')
  $('#edit-email').val('')
  $('.card').hide()
}

function sendDelete(event) {
  event.preventDefault()
  $.ajax({
    url: `${baseURL}/${putOrEditId}`,
    method: 'DELETE',
    success: data => {
      $.get(baseURL).then(appendContacts)
    }
  })
  $('.card').hide()
}
