// Saves options to chrome.storage.sync.
function save_options() {
  var lgtype = document.getElementById('lgtype').value;
  chrome.storage.sync.set({
    lgtype: lgtype
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    lgtype: 'fgpts'
  }, function(items) {
    document.getElementById('lgtype').value = items.lgtype;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);