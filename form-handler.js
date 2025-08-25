// Gửi dữ liệu tới Google Apps Script Web App
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx3jeNPzjxEivda0v2xX2CIwGSTTklSYFJAVUNjmCcBe8Q4572DkwXJfrSr2U4S7nCU/exec';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = form.querySelector('input[placeholder="Họ và tên"]').value;
    const phone = form.querySelector(
      'input[placeholder="Số điện thoại"]'
    ).value;
    const notes = form.querySelector('textarea').value;
    if (!name || !phone) {
      alert('Vui lòng điền đầy đủ họ tên và số điện thoại!');
      return;
    }

    try {
      const dataPost = {
        name: name,
        phone: phone,
        notes: notes,
      };
      console.log('dataPost', dataPost);
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // tránh lỗi CORS
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPost),
      });
      alert('Gửi thông tin thành công!');
      form.reset();
    } catch (error) {
      alert('Có lỗi xảy ra khi gửi thông tin.');
    }
  });
});
