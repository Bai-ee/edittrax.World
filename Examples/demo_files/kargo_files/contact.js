function contactClickOut() {
  var demoContact = 'https://kargo.com/contact-us';
  var btoContact = 'https://kargo.com/book-a-meeting-bto';
  var isBto = window.location.host.indexOf('bto') !== -1 ||
    window.location.search.indexOf('subdomain=bto') !== -1;
  var contactUrl = isBto ? btoContact : demoContact;
  window.open(contactUrl);
}